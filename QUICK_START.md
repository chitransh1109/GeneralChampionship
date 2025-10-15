# Quick Start Guide

## 🚀 Start the Application

### Terminal 1 - Backend Server
```bash
cd /Users/chitranshyadav/Downloads/championship-vortex-main/backend
PORT=5001 MONGODB_URI=mongodb://localhost:27017/championship node server.js
```

### Terminal 2 - Frontend Server  
```bash
cd /Users/chitranshyadav/Downloads/championship-vortex-main
npm run dev
```

## 📝 How to Use

### 1. Add Teams (Admin Page)
- Visit: http://localhost:8080/admin
- Click "Manage Teams" tab
- Fill in: Team Name, Sport (e.g., Basketball, Football)
- Click "Add Team"

### 2. Add Match Fixtures
- Click "Add Fixtures" tab
- Select Sport from dropdown (only shows sports with teams)
- Select Team 1 and Team 2 from dropdowns
- Enter Date & Time (e.g., 2025-11-11 at 12:30)
- Enter Venue (optional)
- Click "Add Match"

### 3. View Matches on Website
- **All Fixtures**: http://localhost:8080/fixtures
- **By Sport**: http://localhost:8080/sports/basketball (or football, cricket, etc.)
- **Sports Page**: http://localhost:8080/sports (click any sport card)

### 4. Update Match Results
- Go to Admin → "Update Results" tab
- Select match from dropdown (only scheduled matches shown)
- Enter scores for both teams
- Click "Update Score"
- Team stats (wins/losses/draws/points) auto-calculate!

## 📊 Features

✅ Add/Delete teams  
✅ Add match fixtures with dropdown team selection  
✅ View all fixtures on /fixtures page  
✅ Filter fixtures by sport  
✅ View sport-specific pages (e.g., /sports/basketball)  
✅ Update match scores from dropdown  
✅ Auto-calculate team statistics (W/L/D/Points)  
✅ All data stored in MongoDB database  

## 🎯 Example Workflow

1. Add Basketball teams: "Lakers", "Warriors"
2. Add a match: Lakers vs Warriors on 11/11/2025 at 12:30
3. Visit http://localhost:8080/fixtures to see the match
4. Visit http://localhost:8080/sports/basketball to see Basketball matches & teams
5. After match ends, update score: Lakers 95 - Warriors 88
6. Team stats update automatically!
