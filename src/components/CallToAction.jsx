import { Link } from "react-router-dom";
import { ArrowRight, Users, Building } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1" style={{ direction: "rtl" }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                انضم إلى منصتنا اليوم وكن جزءًا من مجتمع داعم
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                سواء كنت فردًا من ذوي الاحتياجات الخاصة تبحث عن خدمات، أو جمعية
                متخصصة ترغب في تقديم خدماتك، منصتنا تفتح لك آفاقًا جديدة للتواصل
                والدعم.
              </p>

              <div className="flex flex-col md:flex-row gap-4 mb-10">
                <Link
                  to="/register/user"
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  <Users size={20} />
                  <span>تسجيل كمستخدم</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register/association"
                  className="flex items-center justify-center gap-2 py-3 px-6 border border-primary text-primary rounded-full hover:bg-secondary transition-all duration-300"
                >
                  <Building size={20} />
                  <span>تسجيل كجمعية</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 text-sm">
                  "منصتنا تلتزم بمعايير الخصوصية والأمان العالية. نحن نضمن تجربة
                  آمنة وسلسة لجميع المستخدمين، مع التركيز على سهولة الوصول
                  وتقديم الدعم اللازم في كل خطوة."
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform -rotate-3"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                    alt="People collaborating together"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>

                <div
                  className="absolute -bottom-5 right-5 glass-card p-4 rounded-lg max-w-[220px] animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-[8px] h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-sm font-medium">
                      انضم إلى أكثر من 5000 مستخدم و150 جمعية متخصصة
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
