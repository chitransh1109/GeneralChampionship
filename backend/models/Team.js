import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  logo: { type: String, default: '' },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
