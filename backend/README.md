# Championship Vortex - Backend Setup

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Setup Instructions

### 1. Start MongoDB
```bash
# Mac (using Homebrew)
brew services start mongodb-community

# Or manually
mongod --dbpath=/path/to/your/data/directory
```

### 2. Start Backend Server
```bash
cd backend
npm start
```
Backend will run on http://localhost:5000

### 3. Start Frontend (in another terminal)
```bash
npm run dev
```
Frontend will run on http://localhost:8080

## API Endpoints

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/sport/:sport` - Get teams by sport
- `POST /api/teams` - Add new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Matches
- `GET /api/matches` - Get all matches
- `POST /api/matches` - Add new match
- `PUT /api/matches/:id/score` - Update match score (auto-calculates team stats)
- `DELETE /api/matches/:id` - Delete match

## Admin Features

### Manage Teams Tab
- Add new teams with name, sport, and logo
- View all teams with their stats (Wins, Losses, Draws, Points)
- Delete teams

### Add Fixtures Tab
- Create new match fixtures
- Enter Team IDs, date/time, venue, and sport

### Update Results Tab
- Update match scores using Match ID
- Automatically calculates and updates team stats:
  - Win = 3 points
  - Draw = 1 point each team
  - Loss = 0 points

## How It Works

1. **Add Teams**: First add teams in the "Manage Teams" tab
2. **Copy Team IDs**: Note the Team IDs from the teams list
3. **Add Fixtures**: Use those IDs to create matches in "Add Fixtures" tab
4. **Update Scores**: After matches complete, update scores in "Update Results" tab
5. **Stats Auto-Update**: Team wins/losses/draws/points update automatically
