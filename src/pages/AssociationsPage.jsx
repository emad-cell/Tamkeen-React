import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Check, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Associations from "@/components/Associations";

// بيانات الجمعيات (في تطبيق حقيقي ستكون من قاعدة البيانات)
const associationsData = [
  {
    id: 1,
    name: "جمعية رعاية ذوي الاحتياجات الخاصة",
    logo: "https://placehold.co/100x100",
    description:
      "جمعية متخصصة في تقديم خدمات تعليمية وتأهيلية متكاملة لذوي الاحتياجات الخاصة.",
    location: "الرياض",
    services: ["تعليمية", "طبية", "نفسية"],
    rating: 4.8,
    reviewsCount: 120,
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "مركز الأمل للرعاية والتأهيل",
    logo: "https://placehold.co/100x100",
    description:
      "مركز متخصص في تقديم برامج تأهيلية وعلاجية متخصصة للأطفال ذوي الإعاقة.",
    location: "جدة",
    services: ["تأهيلية", "طبية", "اجتماعية"],
    rating: 4.5,
    reviewsCount: 95,
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "جمعية أسر ذوي الإعاقة",
    logo: "https://placehold.co/100x100",
    description:
      "جمعية تهدف إلى تمكين أسر ذوي الإعاقة وتقديم الدعم النفسي والاجتماعي لهم.",
    location: "الدمام",
    services: ["اجتماعية", "نفسية", "مادية"],
    rating: 4.7,
    reviewsCount: 80,
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: "مؤسسة نور للخدمات التعليمية",
    logo: "https://placehold.co/100x100",
    description:
      "مؤسسة متخصصة في تطوير البرامج التعليمية المخصصة لذوي صعوبات التعلم.",
    location: "الرياض",
    services: ["تعليمية", "تدريبية"],
    rating: 4.4,
    reviewsCount: 65,
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: "مركز إرادة للتأهيل الشامل",
    logo: "https://placehold.co/100x100",
    description:
      "مركز متخصص في التأهيل البدني والوظيفي لذوي الإعاقات الحركية والذهنية.",
    location: "مكة المكرمة",
    services: ["تأهيلية", "طبية", "رياضية"],
    rating: 4.9,
    reviewsCount: 110,
    verified: true,
    featured: true,
  },
  {
    id: 6,
    name: "جمعية التوحد الخيرية",
    logo: "https://placehold.co/100x100",
    description: "جمعية متخصصة في تقديم الدعم للأطفال المصابين بالتوحد وأسرهم.",
    location: "الرياض",
    services: ["تعليمية", "نفسية", "تأهيلية"],
    rating: 4.6,
    reviewsCount: 88,
    verified: true,
    featured: false,
  },
];
// const [data, setData] = useState([]);
// useEffect(() => {
//   const fetchSettings = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/associations");
//       const result = await response.json();

//       if (result.status === 200 && result.data) {
//         setData(result.data);
//         console.log(result.data);
//       }
//     } catch (error) {
//       console.error("Error fetching Associations:", error);
//     }
//   };
//   fetchSettings();
// }, []);

const AssociationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // الجمعيات المميزة

  return (
    <div className="font-sans" style={{ direction: "rtl" }}>
      <Navbar />

      {/* Hero Section */}
      <Associations />

      {/* Join Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            هل أنت جمعية أو مركز متخصص؟
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            انضم إلى منصتنا وساهم في خدمة ذوي الاحتياجات الخاصة من خلال عرض
            خدماتك والوصول إلى المستفيدين في جميع أنحاء المملكة
          </p>
          <Button size="lg" className="rounded-full px-8">
            انضم كجهة خدمية
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const AssociationCard = ({ association }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {/* يمكن استبدالها بصورة شعار الجمعية */}
            <span className="text-2xl font-bold text-primary">
              {association.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {association.name}
              </h3>
              {association.verified && (
                <div className="mr-2 bg-blue-100 p-1 rounded-full">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 ml-1" />
              <span>{association.location}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {association.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {association.services.map((service, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex text-amber-500">
              <Star className="fill-current h-5 w-5" />
            </div>
            <span className="font-bold mx-1">{association.rating}</span>
            <span className="text-gray-500 text-sm">
              ({association.reviewsCount} تقييم)
            </span>
          </div>

          <Link
            to={`/associations/${association.id}`}
            className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all"
          >
            <span>عرض التفاصيل</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssociationsPage;
