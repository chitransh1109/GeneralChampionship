import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Play } from "lucide-react";
// Championship logo - save your logo image as championship-logo.png in the public folder
const championshipLogo = "/championship-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLiveStreamsOpen, setIsLiveStreamsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sports", path: "/sports" },
    { name: "Teams", path: "/teams" },
    { name: "Fixtures", path: "/fixtures" },
    { name: "Results", path: "/results" },
    { name: "About", path: "/about" },
    { name: "Admin", path: "/admin" },
  ];

  const liveStreams = [
    { sport: "Football", url: "https://youtube.com/live/football" },
    { sport: "Basketball", url: "https://youtube.com/live/basketball" },
    { sport: "Soccer", url: "https://youtube.com/live/soccer" },
    { sport: "Cricket", url: "https://youtube.com/live/cricket" },
    { sport: "Tennis", url: "https://youtube.com/live/tennis" },
    { sport: "Athletics", url: "https://youtube.com/live/athletics" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] via-[hsl(var(--gradient-primary-mid))] to-[hsl(var(--gradient-primary-end))] shadow-xl animate-navbar-fade">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-lg bg-black/90 p-2 shadow-lg animate-logo-bounce border-2 border-orange-500/30">
              <img
                src={championshipLogo}
                alt="Championship Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--gradient-accent-start))] via-[hsl(var(--gradient-highlight-start))] to-[hsl(var(--gradient-highlight-end))] bg-clip-text text-transparent animate-title-gradient">
              General Championship 2025
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-accent hover:scale-110 animate-navitem-fade ${
                  isActive(link.path) ? "text-accent" : "text-primary-foreground"
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Live Streams Button */}
            <div className="relative">
              <button
                onClick={() => setIsLiveStreamsOpen(!isLiveStreamsOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-[hsl(var(--gradient-accent-start))] rounded-lg font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 animate-button-pop animate-pulse-glow"
              >
                <Play className="w-4 h-4" />
                Live Match Streams
              </button>

              {isLiveStreamsOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setIsLiveStreamsOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-64 bg-popover rounded-lg shadow-2xl p-4 animate-dropdown-in z-50">
                    <h3 className="font-bold text-lg mb-3 text-popover-foreground">Live Streams</h3>
                    <div className="space-y-2">
                      {liveStreams.map((stream) => (
                        <a
                          key={stream.sport}
                          href={stream.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                        >
                          {stream.sport}
                        </a>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsLiveStreamsOpen(false)}
                      className="mt-4 w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-dropdown-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-accent/20 text-accent"
                      : "text-primary-foreground hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsLiveStreamsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-[hsl(var(--gradient-accent-start))] rounded-lg font-semibold text-white shadow-lg mt-2"
              >
                <Play className="w-4 h-4" />
                Live Match Streams
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
