import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = 'http://localhost:5001/api';

const SportDetail = () => {
  const { sport } = useParams();
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [sport]);

  const fetchData = async () => {
    try {
      const [matchRes, teamRes] = await Promise.all([
        fetch(`${API_URL}/matches`),
        fetch(`${API_URL}/teams/sport/${sport}`)
      ]);
      const matchData = await matchRes.json();
      const teamData = await teamRes.json();
      setMatches(matchData.filter((m: any) => m.sport.toLowerCase() === sport?.toLowerCase()));
      setTeams(teamData);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const sportName = sport?.charAt(0).toUpperCase() + sport?.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] via-[hsl(var(--gradient-primary-mid))] to-[hsl(var(--gradient-primary-end))] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{sportName} Championship</h1>
          <p className="text-xl opacity-90">Teams, fixtures, and results</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Teams */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Teams</h2>
              {teams.length === 0 ? (
                <p className="text-muted-foreground">No teams found for this sport.</p>
              ) : (
                <div className="space-y-4">
                  {teams.map((team) => (
                    <div key={team._id} className="bg-card rounded-xl shadow-md p-6">
                      <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                      <div className="flex gap-6 text-sm">
                        <div><span className="text-muted-foreground">Wins:</span> <span className="font-semibold">{team.wins}</span></div>
                        <div><span className="text-muted-foreground">Losses:</span> <span className="font-semibold">{team.losses}</span></div>
                        <div><span className="text-muted-foreground">Draws:</span> <span className="font-semibold">{team.draws}</span></div>
                        <div><span className="text-muted-foreground">Points:</span> <span className="font-semibold text-primary">{team.points}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Matches */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Fixtures & Results</h2>
              {matches.length === 0 ? (
                <p className="text-muted-foreground">No matches scheduled for this sport.</p>
              ) : (
                <div className="space-y-4">
                  {matches.map((match) => (
                    <div key={match._id} className="bg-card rounded-xl shadow-md p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{match.team1?.name} vs {match.team2?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date(match.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {match.venue && <p className="text-sm text-muted-foreground">📍 {match.venue}</p>}
                        </div>
                        {match.status === 'completed' ? (
                          <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded">
                            <p className="text-lg font-bold text-green-900 dark:text-green-50">{match.team1Score} - {match.team2Score}</p>
                          </div>
                        ) : (
                          <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">
                            <p className="text-sm font-semibold text-blue-800 dark:text-blue-100">Upcoming</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SportDetail;
