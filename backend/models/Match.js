import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  team1Score: { type: Number, default: 0 },
  team2Score: { type: Number, default: 0 },
  date: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'completed'], default: 'scheduled' },
  venue: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Match', matchSchema);
