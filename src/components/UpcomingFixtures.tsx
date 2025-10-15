import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

interface Match {
  _id: string;
  sport: string;
  date: string;
  team1: { 
    name: string;
    logo?: string;
  };
  team2: { 
    name: string;
    logo?: string;
  };
  venue: string;
  status: string;
}

const UpcomingFixtures = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingMatches();
  }, []);

  const fetchUpcomingMatches = async () => {
    try {
      const res = await fetch(`${API_URL}/matches`);
      const data = await res.json();
      // Filter for upcoming matches (scheduled status) and sort by date
      const upcomingMatches = data
        .filter((m: Match) => m.status === 'scheduled')
        .sort((a: Match, b: Match) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 12); // Get only the next 12 matches
      setMatches(upcomingMatches);
    } catch (err) {
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
            Upcoming Fixtures
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Don't miss our exciting upcoming games. Get your tickets now and be part of the championship experience!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {loading ? (
            <div className="col-span-full text-center py-8 md:py-12">
              <p className="text-sm md:text-base text-muted-foreground">Loading upcoming fixtures...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="col-span-full text-center py-8 md:py-12">
              <p className="text-sm md:text-base text-muted-foreground">No upcoming fixtures scheduled yet. Check back soon!</p>
            </div>
          ) : (
            matches.map((match) => (
              <div
                key={match._id}
                className="bg-gradient-to-br from-card to-card/50 rounded-xl shadow-lg p-4 md:p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-border/50 animate-list-fade-in"
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full text-xs md:text-sm font-bold shadow-md">
                    {match.sport}
                  </span>
                  <div className="flex flex-col items-end gap-0.5 md:gap-1 text-muted-foreground text-xs md:text-sm">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-medium text-xs md:text-sm">{formatDate(match.date)}</span>
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold text-primary">{formatTime(match.date)}</span>
                  </div>
                </div>

                <div className="text-center mb-3 md:mb-4 py-2 md:py-4">
                  <div className="flex items-center justify-between gap-2 md:gap-4">
                    {/* Team 1 */}
                    <div className="flex-1 flex flex-col items-center gap-1 md:gap-2">
                      {match.team1?.logo ? (
                        <img 
                          src={match.team1.logo} 
                          alt={match.team1.name} 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-primary/20 shadow-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 md:border-4 border-primary/20 flex items-center justify-center">
                          <span className="text-lg md:text-2xl font-bold text-primary">{match.team1?.name?.charAt(0) || 'T'}</span>
                        </div>
                      )}
                      <span className="text-xs md:text-base font-bold text-foreground text-center line-clamp-1">{match.team1?.name || 'Team 1'}</span>
                    </div>

                    {/* VS */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl md:text-3xl font-black text-primary">VS</span>
                    </div>

                    {/* Team 2 */}
                    <div className="flex-1 flex flex-col items-center gap-1 md:gap-2">
                      {match.team2?.logo ? (
                        <img 
                          src={match.team2.logo} 
                          alt={match.team2.name} 
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-primary/20 shadow-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 md:border-4 border-primary/20 flex items-center justify-center">
                          <span className="text-lg md:text-2xl font-bold text-primary">{match.team2?.name?.charAt(0) || 'T'}</span>
                        </div>
                      )}
                      <span className="text-xs md:text-base font-bold text-foreground text-center line-clamp-1">{match.team2?.name || 'Team 2'}</span>
                    </div>
                  </div>
                </div>

                {match.venue && (
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-muted-foreground bg-muted/30 rounded-lg py-1.5 md:py-2 px-2 md:px-3">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-medium truncate">{match.venue}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <Link to="/fixtures">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] hover:opacity-90 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg group">
              View All Fixtures
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingFixtures;
