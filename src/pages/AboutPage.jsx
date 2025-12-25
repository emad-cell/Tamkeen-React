import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Heart, Shield, Target, BookOpen } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-secondary text-primary font-semibold px-4 py-2 rounded-full mb-4">
                من نحن
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                منصة تمكين: جسر التواصل بين ذوي الاحتياجات الخاصة والخدمات
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                نسعى لبناء مجتمع شامل يتيح لكل فرد من ذوي الاحتياجات الخاصة
                الوصول إلى الخدمات والفرص التي يستحقها بكرامة واستقلالية.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
                <div className="h-1 w-20 bg-primary mb-6"></div>
                <p className="text-gray-600 mb-4">
                  بدأت منصة تمكين كفكرة بسيطة من مجموعة من المتخصصين والمهتمين
                  بمجال ذوي الاحتياجات الخاصة، الذين لاحظوا الفجوة الكبيرة بين
                  الخدمات المتاحة والأشخاص الذين يحتاجون إليها.
                </p>
                <p className="text-gray-600 mb-4">
                  في عام 2020، انطلقت المنصة بهدف واضح: توفير جسر رقمي يربط بين
                  ذوي الاحتياجات الخاصة والخدمات المتخصصة التي تلبي احتياجاتهم
                  بطريقة سهلة الوصول وكريمة.
                </p>
                <p className="text-gray-600">
                  اليوم، تخدم منصة تمكين آلاف المستخدمين وتتعاون مع مئات
                  الجمعيات والمراكز المتخصصة في جميع أنحاء المملكة، لتوفير
                  منظومة متكاملة من الخدمات بأعلى المعايير.
                </p>
              </div>
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-xl relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="فريق منصة تمكين"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full"></div>
                <div className="absolute bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قيمنا</h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
              <p className="text-gray-600">
                نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتشكل هويتنا في
                كل ما نقوم به.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">الاحترام والكرامة</h3>
                <p className="text-gray-600">
                  نؤمن بأن كل شخص يستحق معاملة محترمة تحفظ كرامته بغض النظر عن
                  قدراته أو احتياجاته.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">الشفافية والموثوقية</h3>
                <p className="text-gray-600">
                  نلتزم بالشفافية في جميع تعاملاتنا ونسعى لبناء الثقة من خلال
                  توفير معلومات دقيقة وموثوقة.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">الشمولية والتنوع</h3>
                <p className="text-gray-600">
                  نعمل على خلق بيئة شاملة تحتضن التنوع وتتيح لكل فرد المشاركة
                  والانتماء بغض النظر عن الاختلافات.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">التميز والجودة</h3>
                <p className="text-gray-600">
                  نسعى دائماً لتقديم أعلى مستويات الجودة في خدماتنا ونعمل
                  باستمرار على تطوير وتحسين ما نقدمه.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Award className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">الابتكار والتطوير</h3>
                <p className="text-gray-600">
                  نؤمن بقوة الابتكار في إيجاد حلول جديدة للتحديات القائمة ونسعى
                  دائماً للتطوير المستمر.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">التوعية والتعليم</h3>
                <p className="text-gray-600">
                  نلتزم بنشر الوعي وتثقيف المجتمع حول قضايا ذوي الاحتياجات
                  الخاصة وأهمية الدمج والتمكين.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
