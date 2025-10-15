import { Trophy, Users, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SportsCard from "@/components/SportsCard";
import UpcomingFixtures from "@/components/UpcomingFixtures";
import Sponsors from "@/components/Sponsors";
import heroVenue from "@/assets/hero-venue.jpg";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${heroVenue})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-primary-start))]/80 via-[hsl(var(--gradient-primary-mid))]/80 to-[hsl(var(--gradient-primary-end))]/80" />
        
        {/* Floating Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[hsl(var(--gradient-accent-start))] to-[hsl(var(--gradient-accent-end))] rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[hsl(var(--gradient-highlight-start))] to-[hsl(var(--gradient-highlight-end))] rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }} />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl animate-navbar-fade">
            General Championship <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">2025</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-yellow-300 font-semibold mb-4 drop-shadow-lg">
            Premier Sports Tournament
          </p>
          
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Excellence in competitive sports since 2025. Join us in celebrating athletic achievement across multiple disciplines, from cricket to athletics, basketball to chess.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/sports">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-6 text-lg animate-button-pop group shadow-xl">
                View All Sports
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/fixtures">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg backdrop-blur-sm animate-button-pop shadow-xl" style={{ animationDelay: "0.2s" }}>
                See Fixtures
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Championship Information */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-list-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2 text-foreground">25+</h3>
              <p className="text-muted-foreground">Championship Categories</p>
            </div>

            <div className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-list-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2 text-foreground">15</h3>
              <p className="text-muted-foreground">International Teams</p>
            </div>

            <div className="text-center p-8 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-list-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2 text-foreground">$2M</h3>
              <p className="text-muted-foreground">Prize Pool</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Programs Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
              Championship Sports
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of competitive sports programs designed to showcase excellence in athletic performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((sport, index) => (
              <SportsCard key={sport.name} sport={sport} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <UpcomingFixtures />

      {/* Sponsors */}
      <Sponsors />

      <Footer />
    </div>
  );
};

export default Index;
