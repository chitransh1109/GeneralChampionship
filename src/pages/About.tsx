import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">
            About General Championship 2025
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn more about our championship, mission, and values.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
