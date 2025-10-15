import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SportsCard from "@/components/SportsCard";
import cricketImg from "@/assets/sports/cricket.png";
import footballImg from "@/assets/sports/football.png";
import basketballImg from "@/assets/sports/basketball.png";
import volleyballImg from "@/assets/sports/volleyball.png";
import swimmingImg from "@/assets/sports/swimming.png";
import chessImg from "@/assets/sports/chess.png";
import boxingImg from "@/assets/sports/boxing.png";
import athleticsImg from "@/assets/sports/athletics.png";
import badmintonImg from "@/assets/sports/badminton.png";

const sports = [
  {
    name: "Cricket",
    description: "International cricket championship with exciting matches and skilled players.",
    image: cricketImg,
    href: "/sports/cricket",
  },
  {
    name: "Football",
    description: "Competitive football tournaments featuring top teams and thrilling gameplay.",
    image: footballImg,
    href: "/sports/football",
  },
  {
    name: "Basketball",
    description: "Fast-paced basketball action with professional players and intense competition.",
    image: basketballImg,
    href: "/sports/basketball",
  },
  {
    name: "Volleyball",
    description: "Dynamic volleyball matches showcasing teamwork and athletic excellence.",
    image: volleyballImg,
    href: "/sports/volleyball",
  },
  {
    name: "Swimming",
    description: "Olympic-standard swimming events with world-class athletes and records.",
    image: swimmingImg,
    href: "/sports/swimming",
  },
  {
    name: "Chess",
    description: "Strategic chess championships featuring grandmasters and tactical brilliance.",
    image: chessImg,
    href: "/sports/chess",
  },
  {
    name: "Boxing",
    description: "Thrilling boxing matches with championship fighters and knockout action.",
    image: boxingImg,
    href: "/sports/boxing",
  },
  {
    name: "Athletics",
    description: "Track and field events showcasing speed, strength, and endurance.",
    image: athleticsImg,
    href: "/sports/athletics",
  },
  {
    name: "Badminton",
    description: "High-speed badminton tournaments with precision and agility.",
    image: badmintonImg,
    href: "/sports/badminton",
  },
];

const Sports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] via-[hsl(var(--gradient-primary-mid))] to-[hsl(var(--gradient-primary-end))] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Championship Sports</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover excellence in competitive sports. From traditional team sports to individual championships, we celebrate athletic achievement across all disciplines.
          </p>
        </div>
      </section>

      {/* All Sports Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
              All Championship Sports
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Our championship features a diverse range of sports programs, each with dedicated coaches, professional facilities, and competitive leagues. Join us in celebrating athletic excellence across multiple disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sports.map((sport, index) => (
              <SportsCard key={sport.name} sport={sport} index={index} />
            ))}
          </div>

          {/* Athletics Information */}
          <div className="bg-card rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6">Athletics Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 text-primary">Season Schedule</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Fall Season:</p>
                    <p className="text-muted-foreground">Football, Soccer, Cross Country, Tennis</p>
                  </div>
                  <div>
                    <p className="font-semibold">Winter Season:</p>
                    <p className="text-muted-foreground">Basketball, Wrestling, Swimming</p>
                  </div>
                  <div>
                    <p className="font-semibold">Spring Season:</p>
                    <p className="text-muted-foreground">Baseball, Track & Field, Cricket</p>
                  </div>
                  <div>
                    <p className="font-semibold">Year-round:</p>
                    <p className="text-muted-foreground">Tennis (All Seasons)</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 text-primary">Getting Involved</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Tryouts are held at the beginning of each season</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Physical examination required before participation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Parent consent forms must be completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>Academic eligibility requirements must be maintained</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sports;
