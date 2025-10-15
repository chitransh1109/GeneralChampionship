
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = 'http://localhost:5001/api';

const Results = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [sportFilter, setSportFilter] = useState<string>("all");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API_URL}/matches`);
      const data = await res.json();
      setMatches(data.filter((m: any) => m.status === 'completed'));
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };

  const sports = [...new Set(matches.map(m => m.sport))];
  const filteredMatches = sportFilter === "all" ? matches : matches.filter(m => m.sport === sportFilter);

  // Helper to group matches by sport and sort by date (latest first)
  const getGroupedMatches = () => {
    const grouped: Record<string, any[]> = {};
    sports.forEach(sport => {
      const sportMatches = filteredMatches
        .filter(m => m.sport === sport)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // descending: latest first
      grouped[sport] = sportMatches;
    });
    return grouped;
  };
  const groupedMatches = getGroupedMatches();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
            Championship Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Latest scores and championship results from all events.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 mb-8 flex-wrap">
            <button onClick={() => setSportFilter("all")} className={`px-4 py-2 rounded-lg ${sportFilter === "all" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
              All Sports
            </button>
            {sports.map(sport => (
              <button key={sport} onClick={() => setSportFilter(sport)} className={`px-4 py-2 rounded-lg ${sportFilter === sport ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                {sport}
              </button>
            ))}
          </div>

          <div className="grid gap-8">
            {sports.length === 0 || filteredMatches.length === 0 ? (
              <div className="bg-card rounded-xl p-8 text-center">
                <p className="text-muted-foreground">No results available yet.</p>
              </div>
            ) : (
              sports.map(sport => (
                <div key={sport} className="bg-card rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4 text-primary">{sport}</h2>
                  {groupedMatches[sport].length === 0 ? (
                    <p className="text-muted-foreground">No results for this sport.</p>
                  ) : (
                    <>
                      {/* Latest match */}
                      <div className="border-b pb-4 mb-4">
                        <h3 className="text-lg font-bold text-green-700 mb-2">Latest Match</h3>
                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-1">
                              {groupedMatches[sport][0].team1?.name || 'Team 1'} vs {groupedMatches[sport][0].team2?.name || 'Team 2'}
                            </h4>
                            <p className="text-muted-foreground">
                              {new Date(groupedMatches[sport][0].date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(groupedMatches[sport][0].date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {groupedMatches[sport][0].venue && <p className="text-muted-foreground">📍 {groupedMatches[sport][0].venue}</p>}
                          </div>
                          <div className="text-right">
                            <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                              <p className="text-sm font-semibold text-green-800 dark:text-green-100">Final Score</p>
                              <p className="text-2xl font-bold text-green-900 dark:text-green-50">{groupedMatches[sport][0].team1Score} - {groupedMatches[sport][0].team2Score}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Other matches */}
                      {groupedMatches[sport].length > 1 && (
                        <div className="space-y-4">
                          {groupedMatches[sport].slice(1).map(match => (
                            <div key={match._id} className="border-b pb-2">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div className="flex-1">
                                  <h4 className="text-lg font-bold mb-1">
                                    {match.team1?.name || 'Team 1'} vs {match.team2?.name || 'Team 2'}
                                  </h4>
                                  <p className="text-muted-foreground">
                                    {new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(match.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                  {match.venue && <p className="text-muted-foreground">📍 {match.venue}</p>}
                                </div>
                                <div className="text-right">
                                  <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                                    <p className="text-sm font-semibold text-green-800 dark:text-green-100">Final Score</p>
                                    <p className="text-2xl font-bold text-green-900 dark:text-green-50">{match.team1Score} - {match.team2Score}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Results;
