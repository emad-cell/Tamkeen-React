import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Filter, Search, ArrowRight } from "lucide-react";

// Sample associations data
const associationsData = [
  {
    id: 1,
    name: "جمعية رعاية ذوي الاحتياجات الخاصة",
    location: "الرياض",
    rating: 4.8,
    specialties: ["تأهيل طبي", "تعليم خاص"],
    image: "zoro-looking-fierce-and-ready-to-fight-desktop-wallpaper-cover.jpg",
  },
  {
    id: 2,
    name: "مركز النور للعلاج الطبيعي",
    location: "جدة",
    rating: 4.6,
    specialties: ["علاج طبيعي", "تأهيل حركي"],
    image: "zoro-looking-fierce-and-ready-to-fight-desktop-wallpaper-cover.jpg",
  },
  {
    id: 3,
    name: "مؤسسة الأمل للدعم النفسي",
    location: "الدمام",
    rating: 4.9,
    specialties: ["استشارات نفسية", "علاج سلوكي"],
    image: "zoro-looking-fierce-and-ready-to-fight-desktop-wallpaper-cover.jpg",
  },
];

const Associations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-secondary/50" id="associations">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-white text-primary font-semibold px-4 py-2 rounded-full mb-4">
            جمعياتنا المتخصصة
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            اكتشف الجمعيات المتخصصة في مجال رعاية ذوي الاحتياجات الخاصة
          </h2>
          <p className="text-gray-600 text-lg">
            نتعاون مع أفضل الجمعيات المتخصصة والمرخصة لضمان تقديم خدمات عالية
            الجودة لمستخدمي المنصة.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ابحث عن جمعية أو خدمة..."
                className="w-full py-3 px-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} className="text-primary" />
              <span>خيارات التصفية</span>
            </button>
          </div>

          {showFilters && (
            <div className="bg-white rounded-xl shadow-md p-6 mt-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المنطقة
                  </label>
                  <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">جميع المناطق</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التخصص
                  </label>
                  <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">جميع التخصصات</option>
                    <option value="تأهيل طبي">تأهيل طبي</option>
                    <option value="تعليم خاص">تعليم خاص</option>
                    <option value="علاج طبيعي">علاج طبيعي</option>
                    <option value="استشارات نفسية">استشارات نفسية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التقييم
                  </label>
                  <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">جميع التقييمات</option>
                    <option value="5">5 نجوم</option>
                    <option value="4">4 نجوم وأعلى</option>
                    <option value="3">3 نجوم وأعلى</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  تطبيق الفلترة
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {associationsData.map((association) => (
            <div
              key={association.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:-translate-y-2 duration-300"
            >
              <div className="relative h-52">
                <img
                  src={association.image}
                  alt={association.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full flex items-center">
                  <MapPin size={16} className="text-primary mr-1" />
                  <span className="text-sm">{association.location}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-amber-500 mr-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < Math.floor(association.rating)
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            i < Math.floor(association.rating)
                              ? "text-amber-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {association.rating}/5
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{association.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {association.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-secondary text-primary px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/associations/${association.id}`}
                  className="block w-full text-center py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  عرض التفاصيل والخدمات
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/associations"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-white text-primary hover:bg-gray-50 transition-all duration-300 shadow-sm"
          >
            <span>عرض جميع الجمعيات</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Associations;
