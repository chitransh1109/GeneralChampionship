import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1, wins: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get teams by sport
router.get('/sport/:sport', async (req, res) => {
  try {
    const teams = await Team.find({ sport: req.params.sport }).sort({ points: -1, wins: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add team
router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete team
router.delete('/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
