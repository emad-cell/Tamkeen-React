import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessStories from "@/components/SuccessStories";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample additional success stories data
const additionalSuccessStories = [
  {
    id: 4,
    name: "ليلى عمر",
    age: 14,
    story:
      "كانت ليلى تعاني من صعوبات في التواصل نتيجة اضطراب طيف التوحد. بعد ستة أشهر من المشاركة في برنامج العلاج بالفن الذي وفرته جمعية النور، أصبحت أكثر قدرة على التعبير عن مشاعرها واحتياجاتها.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 5,
    name: "فهد سعيد",
    age: 11,
    story:
      "بفضل برنامج الدمج المدرسي ودعم معلمي التربية الخاصة، تغلب فهد على صعوبات القراءة التي كانت تعيقه أكاديمياً، وأصبح من المتميزين في الصف.",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
  },
  {
    id: 6,
    name: "نورا محمد",
    age: 17,
    story:
      "نورا التي تعاني من إعاقة حركية، استطاعت تحقيق حلمها في تعلم السباحة وحصدت ميدالية ذهبية في بطولة محلية بعد التدريب في مركز التأهيل الرياضي المتخصص.",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1586&q=80",
  },
];

const SuccessStoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 3;
  const totalPages = Math.ceil(
    additionalSuccessStories.length / storiesPerPage
  );

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = additionalSuccessStories.slice(
    indexOfFirstStory,
    indexOfLastStory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-secondary text-primary font-semibold px-4 py-2 rounded-full mb-4">
              قصص نجاح
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              قصص ملهمة تعكس نجاح منصتنا
            </h1>
            <p className="text-gray-600 text-lg">
              نشارك معكم قصص حقيقية لأشخاص غيرت حياتهم من خلال الخدمات المقدمة
              عبر منصة تمكين، لتكون مصدر إلهام وأمل للجميع.
            </p>
          </div>

          {/* Featured Success Stories Component */}
          <SuccessStories />

          {/* Additional Success Stories */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                المزيد من القصص الملهمة
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">{story.name}</h3>
                      <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full">
                        {story.age} سنة
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">"{story.story}"</p>
                    <button className="text-primary font-medium hover:text-primary/80 transition-colors">
                      قراءة المزيد
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="mx-4 flex items-center gap-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 rounded-full transition-colors ${
                        currentPage === idx + 1
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Next page"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            )}

            <div className="text-center mt-16">
              <p className="text-lg text-gray-700 mb-6">
                هل لديك قصة نجاح تود مشاركتها معنا؟
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                شارك قصتك معنا
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
