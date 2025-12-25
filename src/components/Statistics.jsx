
import { Users, Building, FileCheck, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    id: 1,
    value: 5000,
    title: "مستخدمي المنصة",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    id: 2,
    value: 150,
    title: "جمعيات متخصصة",
    icon: <Building className="h-8 w-8 text-primary" />,
  },
  {
    id: 3,
    value: 12000,
    title: "خدمات مقدمة",
    icon: <FileCheck className="h-8 w-8 text-primary" />,
  },
  {
    id: 4,
    value: 50,
    title: "حملات تمويل ناجحة",
    icon: <Heart className="h-8 w-8 text-primary" />,
  },
];

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    const counters = stats.map((stat, index) => {
      let frame = 0;
      const countTo = stat.value;
      
      return setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(countTo * progress);

        if (frame === totalFrames) {
          clearInterval(counters[index]);
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = countTo;
            return newCounts;
          });
        } else {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = currentCount;
            return newCounts;
          });
        }
      }, frameDuration);
    });

    return () => {
      counters.forEach(counter => clearInterval(counter));
    };
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-primary text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute -bottom-20 left-1/3 w-60 h-60 rounded-full bg-white"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {counts[index].toLocaleString()}+
              </h3>
              <p className="text-white/80">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
