import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

interface Match {
  _id: string;
  sport: string;
  date: string;
  team1: { name: string };
  team2: { name: string };
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
            Upcoming Fixtures
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't miss our exciting upcoming games. Get your tickets now and be part of the championship experience!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading upcoming fixtures...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No upcoming fixtures scheduled yet. Check back soon!</p>
            </div>
          ) : (
            matches.map((match) => (
              <div
                key={match._id}
                className="bg-card rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 animate-list-fade-in"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                    {match.sport}
                  </span>
                  <div className="flex flex-col items-end gap-1 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(match.date)}</span>
                    </div>
                    <span className="text-xs">{formatTime(match.date)}</span>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-lg font-bold">{match.team1?.name || 'Team 1'}</span>
                    <span className="text-2xl font-bold text-muted-foreground">vs</span>
                    <span className="text-lg font-bold">{match.team2?.name || 'Team 2'}</span>
                  </div>
                </div>

                {match.venue && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{match.venue}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] hover:opacity-90">
                    Get Tickets
                  </Button>
                  <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    More Info
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <Link to="/fixtures">
            <Button className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] hover:opacity-90 px-8 py-6 text-lg group">
              View All Fixtures
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingFixtures;
