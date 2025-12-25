import { Search, CheckCircle, FileCheck, MessageCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "ابحث عن الخدمة",
    description:
      "استخدم خيارات البحث المتقدمة لإيجاد الخدمة المناسبة حسب نوع الإعاقة، الموقع، أو نوع الخدمة.",
    icon: <Search className="h-10 w-10 text-white" />,
    color: "from-primary to-blue-400",
  },
  {
    id: 2,
    title: "قدم طلب الخدمة",
    description: "أرفق المستندات المطلوبة وقدم طلب الخدمة بخطوات بسيطة.",
    icon: <FileCheck className="h-10 w-10 text-white" />,
    color: "from-teal-500 to-green-400",
  },
  {
    id: 3,
    title: "تواصل مع الجمعية",
    description:
      "تواصل مباشرة مع الجمعية المتخصصة لمناقشة التفاصيل والإجابة عن استفساراتك.",
    icon: <MessageCircle className="h-10 w-10 text-white" />,
    color: "from-purple-500 to-indigo-400",
  },
  {
    id: 4,
    title: "احصل على الخدمة",
    description: "بعد موافقة المشرف، تحصل على الخدمة المطلوبة بسهولة وأمان.",
    icon: <CheckCircle className="h-10 w-10 text-white" />,
    color: "from-amber-500 to-orange-400",
  },
];

const HowItWorks = () => {
  return (
    <section className="pb-12 md:pb-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-secondary text-primary font-bold px-4 py-2 rounded-full mb-4">
            كيف تعمل المنصة
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-gray-900">
            خطوات بسيطة للحصول على الخدمة
          </h2>
          <p className="text-gray-600 text-lg">
            صممنا المنصة لتكون سهلة الاستخدام وتتيح لك الوصول إلى الخدمات
            المناسبة بأقل جهد وأسرع وقت.
          </p>
        </div>

        <div className="relative">
          {/* Desktop line connector */}
          {/* <div className="hidden lg:block absolute top-1 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} shadow-lg`}
                >
                  {step.icon}
                  <span className="sr-only">Step {step.id}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-16 bg-gray-200 my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
