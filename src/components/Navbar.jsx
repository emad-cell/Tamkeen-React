import { cn } from "@/lib/utils";
import { useState } from "react";
import Logo from "./Logo";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 backdrop-blur-md shadow-sm bg-blue/50",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo size="medium" withText={true} />
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/services" className="nav-link">
              Services
            </Link>
            <Link to="/associations" className="nav-link">
              Associations
            </Link>
            <Link to="/success-stories" className="nav-link">
              Success Stories
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <Link to="/donate" className="nav-link text-primary font-medium">
              Donate Now
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-2 py-2 px-4 rounded-full border border-primary hover:text-primary hover:bg-white bg-primary text-white transition-all duration-300"
              >
                <User size={18} />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-3 px-4">
              <Link
                to="/"
                className="py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/associations"
                className="py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Associations
              </Link>
              <Link
                to="/success-stories"
                className="py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Success Stories
              </Link>
              <Link
                to="/about"
                className="py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-2 text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/donate"
                className="py-2 text-primary font-medium hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Donate Now
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link
                  to="/login"
                  className="flex items-center gap-2 py-2 px-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
