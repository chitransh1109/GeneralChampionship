import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sponsors = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
            Our Proud Sponsors
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Thanks to our amazing sponsors who make the General Championship possible
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Razorpay Advertisement Banner - Full Width */}
          <div className="relative overflow-hidden rounded-xl shadow-2xl min-h-[240px] md:min-h-[320px] animate-navbar-fade">
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
            <div className="relative z-10 p-6 md:p-12 flex flex-col items-center justify-center text-center text-white min-h-[240px] md:min-h-[320px]">
              <img
                src="https://razorpay.com/assets/razorpay-glyph.svg"
                alt="Razorpay Logo"
                className="h-10 md:h-16 mb-4 md:mb-6"
              />
              <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Powered by Razorpay</h3>
              <p className="text-sm md:text-xl mb-4 md:mb-6 max-w-2xl px-2">
                Secure, fast, and reliable payment solutions for championship ticket sales and registrations
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-6 text-sm md:text-lg">
                <ExternalLink className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Learn More
              </Button>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full blur-3xl opacity-10 -mr-16 md:-mr-32 -mt-16 md:-mt-32" />
              <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-purple-300 rounded-full blur-3xl opacity-10 -ml-16 md:-ml-32 -mb-16 md:-mb-32" />
            </div>
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Become a Sponsor</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto px-2">
            Join our family of sponsors and support excellence in sports. Various sponsorship packages available to suit your needs.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] hover:opacity-90 px-6 md:px-8 py-3">
              Contact Us
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 md:px-8 py-3">
              Download Sponsorship Package
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
