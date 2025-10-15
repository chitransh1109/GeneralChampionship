import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Fixture {
  id: number;
  sport: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
}

const mockFixtures: Fixture[] = [
  {
    id: 1,
    sport: "Football",
    date: "2025-11-05",
    homeTeam: "Eagles",
    awayTeam: "Warriors",
    venue: "Championship Stadium",
  },
  {
    id: 2,
    sport: "Basketball",
    date: "2025-11-08",
    homeTeam: "Tigers",
    awayTeam: "Lions",
    venue: "Arena Center",
  },
  {
    id: 3,
    sport: "Cricket",
    date: "2025-11-10",
    homeTeam: "Knights",
    awayTeam: "Dragons",
    venue: "Cricket Grounds",
  },
  {
    id: 4,
    sport: "Volleyball",
    date: "2025-11-12",
    homeTeam: "Sharks",
    awayTeam: "Dolphins",
    venue: "Sports Complex",
  },
  {
    id: 5,
    sport: "Swimming",
    date: "2025-11-15",
    homeTeam: "Wave Riders",
    awayTeam: "Aqua Stars",
    venue: "Olympic Pool",
  },
  {
    id: 6,
    sport: "Athletics",
    date: "2025-11-18",
    homeTeam: "Sprinters",
    awayTeam: "Marathoners",
    venue: "Track Stadium",
  },
  {
    id: 7,
    sport: "Basketball",
    date: "2025-11-20",
    homeTeam: "Panthers",
    awayTeam: "Wolves",
    venue: "Arena Center",
  },
  {
    id: 8,
    sport: "Football",
    date: "2025-11-22",
    homeTeam: "Falcons",
    awayTeam: "Hawks",
    venue: "Championship Stadium",
  },
  {
    id: 9,
    sport: "Tennis",
    date: "2025-11-25",
    homeTeam: "Aces",
    awayTeam: "Servers",
    venue: "Tennis Court Complex",
  },
  {
    id: 10,
    sport: "Boxing",
    date: "2025-11-28",
    homeTeam: "Fighters",
    awayTeam: "Champions",
    venue: "Fight Arena",
  },
  {
    id: 11,
    sport: "Chess",
    date: "2025-12-01",
    homeTeam: "Grandmasters",
    awayTeam: "Strategy Kings",
    venue: "Tournament Hall",
  },
  {
    id: 12,
    sport: "Badminton",
    date: "2025-12-05",
    homeTeam: "Shuttlers",
    awayTeam: "Net Masters",
    venue: "Indoor Arena",
  },
];

const UpcomingFixtures = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
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
          {mockFixtures.slice(0, 12).map((fixture) => (
            <div
              key={fixture.id}
              className="bg-card rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 animate-list-fade-in"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  {fixture.sport}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(fixture.date)}</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-lg font-bold">{fixture.homeTeam}</span>
                  <span className="text-2xl font-bold text-muted-foreground">vs</span>
                  <span className="text-lg font-bold">{fixture.awayTeam}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{fixture.venue}</span>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] hover:opacity-90">
                  Get Tickets
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  More Info
                </Button>
              </div>
            </div>
          ))}
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
