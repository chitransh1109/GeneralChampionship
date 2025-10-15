import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const sponsors = [
  {
    name: "SportTech Equipment",
    tier: "Gold",
    description: "Official equipment supplier for all championship sports",
    tierColor: "bg-yellow-400",
  },
  {
    name: "HealthFirst Medical",
    tier: "Gold",
    description: "Providing medical support and sports healthcare",
    tierColor: "bg-yellow-400",
  },
  {
    name: "City Bank",
    tier: "Silver",
    description: "Banking partner supporting local sports excellence",
    tierColor: "bg-gray-400",
  },
  {
    name: "Pizza Palace",
    tier: "Silver",
    description: "Fueling champions with quality nutrition",
    tierColor: "bg-gray-400",
  },
  {
    name: "AutoMax Dealership",
    tier: "Bronze",
    description: "Transportation partner for championship events",
    tierColor: "bg-orange-400",
  },
  {
    name: "Fresh Mart Grocery",
    tier: "Bronze",
    description: "Supporting healthy lifestyles and nutrition",
    tierColor: "bg-orange-400",
  },
];

const Sponsors = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
            Our Proud Sponsors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thanks to our amazing sponsors who make the General Championship possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sponsors.map((sponsor, idx) => (
            <div
              key={sponsor.name}
              className="bg-card rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-list-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 ${sponsor.tierColor} text-white rounded-full text-sm font-semibold`}>
                  {sponsor.tier}
                </span>
              </div>
              
              <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">{sponsor.name.charAt(0)}</span>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{sponsor.name}</h3>
              <p className="text-muted-foreground text-sm">{sponsor.description}</p>
            </div>
          ))}

          {/* Razorpay Advertisement Banner - Full Width */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-xl shadow-2xl min-h-[320px] animate-navbar-fade">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200')",
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-70" />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center text-center text-white min-h-[320px]">
              <img
                src="https://razorpay.com/assets/razorpay-glyph.svg"
                alt="Razorpay Logo"
                className="h-16 mb-6"
              />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Powered by Razorpay</h3>
              <p className="text-lg md:text-xl mb-6 max-w-2xl">
                Secure, fast, and reliable payment solutions for championship ticket sales and registrations
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <ExternalLink className="mr-2 w-5 h-5" />
                Learn More
              </Button>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-10 -ml-32 -mb-32" />
            </div>
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Become a Sponsor</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our family of sponsors and support excellence in sports. Various sponsorship packages available to suit your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] hover:opacity-90 px-8">
              Contact Us
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
              Download Sponsorship Package
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
