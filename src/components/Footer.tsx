import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Twitter, Facebook, Instagram } from "lucide-react";
const championshipLogo = "/championship-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] via-gray-900 to-[hsl(var(--gradient-primary-end))] text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-lg bg-black/90 p-2 border-2 border-orange-500/30">
                <img
                  src={championshipLogo}
                  alt="Championship Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">General Championship 2025</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Excellence in Sports Competition since 2025. Join us in celebrating athletic achievement and competitive spirit across multiple disciplines.
            </p>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                    <p>NIH Rd, near Tyagi Dairy 16, Civil Lines, Roorkee, Uttarakhand 247667, India.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                  <a href="tel:+918439337545" className="hover:text-accent transition-colors">
                    +91 84393 37545
                  </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:wasimiitr@gmail.com" className="hover:text-accent transition-colors">
                  wasimiitr@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sports" className="text-gray-300 hover:text-accent transition-colors">
                  Sports Programs
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-gray-300 hover:text-accent transition-colors">
                  Teams
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="text-gray-300 hover:text-accent transition-colors">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-300 hover:text-accent transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-accent hover:bg-white/20 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-accent hover:bg-white/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-accent hover:bg-white/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>© 2025 General Championship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
