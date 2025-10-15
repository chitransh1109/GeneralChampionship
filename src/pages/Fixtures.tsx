import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_URL } from "@/lib/api";

const Fixtures = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [sportFilter, setSportFilter] = useState<string>("all");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API_URL}/matches`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };


  const sports = [...new Set(matches.map(m => m.sport))];
  const filteredMatches = sportFilter === "all" ? matches : matches.filter(m => m.sport === sportFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] via-[hsl(var(--gradient-primary-mid))] to-[hsl(var(--gradient-primary-end))] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Championship Fixtures</h1>
          <p className="text-xl opacity-90">View all upcoming matches and championship schedules</p>
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

          <div className="grid gap-6">
            {filteredMatches.length === 0 ? (
              <div className="bg-card rounded-xl p-8 text-center">
                <p className="text-muted-foreground">No fixtures available. Add matches from the admin panel.</p>
              </div>
            ) : (
              filteredMatches.map((match) => (
                <div key={match._id} className="bg-card rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-primary font-semibold mb-2">{match.sport}</p>
                      <h3 className="text-2xl font-bold mb-2">
                        {match.team1?.name || 'Team 1'} vs {match.team2?.name || 'Team 2'}
                      </h3>
                      <p className="text-muted-foreground">
                        {new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(match.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {match.venue && <p className="text-muted-foreground">📍 {match.venue}</p>}
                    </div>
                    <div className="text-right">
                      {match.status === 'completed' ? (
                        <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                          <p className="text-sm font-semibold text-green-800 dark:text-green-100">Final Score</p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-50">{match.team1Score} - {match.team2Score}</p>
                        </div>
                      ) : (
                        <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                          <p className="text-sm font-semibold text-blue-800 dark:text-blue-100">Scheduled</p>
                        </div>
                      )}
                    </div>
                  </div>
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

export default Fixtures;
