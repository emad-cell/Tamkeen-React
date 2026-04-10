import { Link } from "react-router-dom";
import {
  Heart,
  Brain,
  Stethoscope,
  School,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export const servicesData = [
  {
    id: 1,
    title: "Educational Services",
    description:
      "Specialized educational programs and academic support tailored for students with disabilities.",
    icon: <School className="h-6 w-6 text-white" />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Medical Services",
    description:
      "Specialized medical care and treatment plans for diverse health needs.",
    icon: <Stethoscope className="h-6 w-6 text-white" />,
    color: "from-teal-500 to-green-400",
  },
  {
    id: 3,
    title: "Mental Health Support",
    description:
      "Psychological support and counseling from qualified professionals.",
    icon: <Brain className="h-6 w-6 text-white" />,
    color: "from-purple-500 to-indigo-400",
  },
  {
    id: 4,
    title: "Financial Assistance",
    description:
      "Financial aid and funding campaigns for urgent material needs.",
    icon: <Heart className="h-6 w-6 text-white" />,
    color: "from-pink-500 to-rose-400",
  },
  {
    id: 5,
    title: "Social Support",
    description:
      "Community-focused programs that encourage inclusion and active participation.",
    icon: <Users className="h-6 w-6 text-white" />,
    color: "from-amber-500 to-yellow-400",
  },
  {
    id: 6,
    title: "Administrative Guidance",
    description:
      "Help with official paperwork and required reports for service access.",
    icon: <FileText className="h-6 w-6 text-white" />,
    color: "from-gray-600 to-gray-500",
  },
];
const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-white" id="services">
      <div className="container mx-auto px-4 ">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-secondary text-primary font-semibold px-4 py-2 rounded-full mb-4">
            Our Specialized Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Integrated solutions designed around real needs
          </h2>
          <p className="text-gray-600 text-lg">
            We provide a complete set of specialized services that support
            individuals and families with high quality and easy access.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card glass-card group">
              {" "}
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-lg mb-6 bg-gradient-to-r ${service.color} transform group-hover:scale-110 transition-all duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-5">{service.description}</p>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-secondary text-primary hover:bg-secondary/80 transition-all duration-300"
          >
            <span>View All Services</span>
            <ArrowRight size={18} />
          </Link>
        </div> */}
      </div>
    </section>
  );
};
export default Services;
