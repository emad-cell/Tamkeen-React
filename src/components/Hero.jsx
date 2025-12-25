import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-br from-secondary to-blue-50">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="text-right order-1 lg:order-2 animate-fade-in"
            style={{ direction: "rtl" }}
          >
            <div className="inline-block bg-accent/10 text-accent font-semibold px-4 py-2 rounded-full mb-6">
              منصة لربط ذوي الاحتياجات الخاصة بالخدمات المتخصصة
            </div>
            <h1 className="hero-text text-gray-900 mb-6">
              نسهل وصولك للخدمات
              <span className="text-primary block mt-2">
                بكل سهولة وموثوقية
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-xl">
              منصة إلكترونية شاملة تهدف إلى تسهيل وصول ذوي الاحتياجات الخاصة
              وأسرهم إلى الخدمات الأساسية عن طريق ربطهم مع الجمعيات المتخصصة، مع
              ضمان جودة الخدمات عبر آلية تحكم آمنة.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link
                to="/services"
                className="flex items-center gap-2 py-3 px-8 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                <span>استكشف الخدمات</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/associations"
                className="py-3 px-8 rounded-full border border-primary text-primary hover:bg-secondary transition-all duration-300"
              >
                الجمعيات المتخصصة
              </Link>
            </div>
          </div>
          <div
            className="order-1 lg:order-2 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="zoro-looking-fierce-and-ready-to-fight-desktop-wallpaper-cover.jpg"
                  alt="مساعدة ذوي الاحتياجات الخاصة"
                  className="w-full object-cover h-[400px]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-lg shadow-lg max-w-xs animate-float">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium">
                    خدمات متخصصة على مدار 24 ساعة
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-sm font-medium">كفائة مصداقية وأمان</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
