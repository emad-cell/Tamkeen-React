import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowITWorks";
import Services from "@/components/Services";
import { useEffect } from "react";
import Associations from "@/components/Associations";
import Statistics from "@/components/Statistics";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-sans" style={{ direction: "rtl" }}>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Associations />
      <Statistics />
      {/* {/* <SuccessStories />  */}
      <CallToAction />
      <Footer />
    </div>
  );
};
export default Index;
