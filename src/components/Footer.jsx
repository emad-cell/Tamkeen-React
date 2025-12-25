import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const Footer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/settings");
        const result = await response.json();

        if (result.status === 200 && result.data) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);
  // console.log(data)
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Logo size="medium" withText={true} />
            <p className="text-gray-400 mt-4">{data?.data.About_Footer}</p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:-mb-2 pb-2">
              روابط سريعة
            </h3>
            <ul className="space-y-3" style={{ direction: "rtl" }}>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>الخدمات</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/associations"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>الجمعيات المتخصصة</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>قصص نجاح</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>اتصل بنا</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:-mb-2 pb-2">
              الدعم والمساعدة
            </h3>
            <ul className="space-y-3" style={{ direction: "rtl" }}>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>الأسئلة المتكررة</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>سياسة الخصوصية</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>شروط الاستخدام</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>الدعم الفني</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>مصادر مفيدة</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:-mb-2 pb-2">
              معلومات الاتصال
            </h3>
            <ul className="space-y-4">
              {/* <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1" />
                <span className="text-gray-400">
                  {data.data.location}
                </span>
              </li> */}
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary mt-1" />
                <span className="text-gray-400">{data?.data.Phone1}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary mt-1" />
                <span className="text-gray-400">{data?.data.Email1}</span>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">النشرة البريدية</h4>
              <div className="flex">
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-r-md transition-colors">
                  اشتراك
                </button>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="bg-white/10 text-white border-0 px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} تمكين. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-gray-500 text-sm hover:text-primary transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                to="/terms"
                className="text-gray-500 text-sm hover:text-primary transition-colors"
              >
                شروط الاستخدام
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                to="/sitemap"
                className="text-gray-500 text-sm hover:text-primary transition-colors"
              >
                خريطة الموقع
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
