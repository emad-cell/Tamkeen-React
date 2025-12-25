import { Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

// interface LogoProps {
//   size?: "small" | "medium" | "large";
//   withText?: boolean;
// }

const Logo = ({ size = "medium", withText = true }) => {
  // Set sizes based on the size prop
  const logoSizes = {
    small: {
      container: "h-8 w-8",
      iconMain: "h-4 w-4",
      iconAccent: "h-3 w-3",
      text: "text-xl",
    },
    medium: {
      container: "h-10 w-10",
      iconMain: "h-5 w-5",
      iconAccent: "h-4 w-4",
      text: "text-2xl",
    },
    large: {
      container: "h-14 w-14",
      iconMain: "h-7 w-7",
      iconAccent: "h-5 w-5",
      text: "text-3xl",
    },
  };

  const { container, iconMain, iconAccent, text } = logoSizes[size];

  return (
    <Link to="/" className="flex items-center gap-2">
      <div
        className={`relative ${container} flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent shadow-md`}
      >
        <Users className={`${iconMain} text-white absolute transform`} />
        <Heart
          className={`${iconAccent} text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        />
      </div>

      {withText && (
        <span className={`font-bold ${text} text-primary relative`}>
          <span className="relative z-10">تمكين</span>
          <span className="absolute inset-x-0 bottom-0 h-8 bg-secondary z-0 transform -rotate-2"></span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
