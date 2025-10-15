// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const API_ENDPOINTS = {
  teams: `${API_URL}/teams`,
  matches: `${API_URL}/matches`,
  health: `${API_URL}/health`,
};
