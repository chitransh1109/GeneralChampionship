import express from 'express';
import mongoose from 'mongoose';
import Match from '../models/Match.js';
import Team from '../models/Team.js';

const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('team1 team2').sort({ date: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add match
router.post('/', async (req, res) => {
  try {
    const { sport, team1, team2, date, venue } = req.body;

    if (!sport || !team1 || !team2 || !date) {
      return res.status(400).json({ error: 'sport, team1, team2, and date are required' });
    }

    // Helper to resolve either ObjectId or team name into a Team _id
    const resolveTeamId = async (value) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      let existing = await Team.findOne({ name: value, sport });
      if (!existing) {
        // Auto-create team if it doesn't exist for this sport
        existing = await Team.create({ name: value, sport });
      }
      return existing._id;
    };

    const [team1Id, team2Id] = await Promise.all([
      resolveTeamId(team1),
      resolveTeamId(team2),
    ]);

    if (team1Id.toString() === team2Id.toString()) {
      return res.status(400).json({ error: 'Team 1 and Team 2 must be different' });
    }

    const match = new Match({ sport, team1: team1Id, team2: team2Id, date, venue });
    await match.save();
    const populated = await match.populate('team1 team2');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update match score
router.put('/:id/score', async (req, res) => {
  try {
    const { team1Score, team2Score } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { team1Score, team2Score, status: 'completed' },
      { new: true }
    ).populate('team1 team2');

    // Update team stats
    const team1 = await Team.findById(match.team1._id);
    const team2 = await Team.findById(match.team2._id);

    if (team1Score > team2Score) {
      team1.wins++; team1.points += 3;
      team2.losses++;
    } else if (team2Score > team1Score) {
      team2.wins++; team2.points += 3;
      team1.losses++;
    } else {
      team1.draws++; team1.points += 1;
      team2.draws++; team2.points += 1;
    }

    await team1.save();
    await team2.save();

    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update match details (sport, teams, date, venue)
router.put('/:id', async (req, res) => {
  try {
    const { sport, team1, team2, date, venue } = req.body;

    let match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const updated = {};
    if (sport) updated.sport = sport;
    if (typeof date !== 'undefined') updated.date = date;
    if (typeof venue !== 'undefined') updated.venue = venue;

    // Helper to resolve either ObjectId or team name into a Team _id
    const resolveTeamId = async (value, sportForTeam) => {
      if (!value) return undefined;
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      let existing = await Team.findOne({ name: value, sport: sportForTeam });
      if (!existing) {
        existing = await Team.create({ name: value, sport: sportForTeam });
      }
      return existing._id;
    };

    const sportForTeams = sport || match.sport;
    if (typeof team1 !== 'undefined') {
      updated.team1 = await resolveTeamId(team1, sportForTeams);
    }
    if (typeof team2 !== 'undefined') {
      updated.team2 = await resolveTeamId(team2, sportForTeams);
    }

    // Validate teams not the same if both provided
    if (updated.team1 && updated.team2 && updated.team1.toString() === updated.team2.toString()) {
      return res.status(400).json({ error: 'Team 1 and Team 2 must be different' });
    }

    match = await Match.findByIdAndUpdate(req.params.id, updated, { new: true }).populate('team1 team2');
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete match
router.delete('/:id', async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
