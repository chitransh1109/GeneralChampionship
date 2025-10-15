import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Sport {
  name: string;
  description: string;
  image: string;
  href: string;
}

interface SportsCardProps {
  sport: Sport;
  index: number;
}

const SportsCard = ({ sport, index }: SportsCardProps) => {
  return (
    <Link
      to={sport.href}
      className="group relative bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-dropdown-in"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={sport.image}
          alt={sport.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[hsl(var(--gradient-accent-start))] to-[hsl(var(--gradient-highlight-start))] rounded-full blur-2xl opacity-30 -mr-16 -mt-16" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
          {sport.name}
        </h3>
        <p className="text-gray-600 mb-4">{sport.description}</p>
        
        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default SportsCard;
