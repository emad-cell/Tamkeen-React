import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  AlertCircle,
  FileText,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { servicesData } from "../components/Services";
import { useToast } from "@/hooks/use-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Convert id to number for comparison
  const serviceId = Number(id);

  // Find the service with the matching id
  const service = servicesData.find((s) => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookmark = () => {
    toast({
      title: "تمت الإضافة للمفضلة",
      description: "تم إضافة الخدمة إلى قائمة المفضلة بنجاح",
    });
  };

  if (!service) {
    return (
      <div className="font-sans" style={{ direction: "rtl" }}>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl font-bold mb-4">الخدمة غير موجودة</h1>
          <p className="mb-8 text-gray-600">
            عذراً، لم نتمكن من العثور على الخدمة المطلوبة
          </p>
          <Link to="/services">
            <Button>العودة إلى الخدمات</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans" style={{ direction: "rtl" }}>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${service.color}`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {service.title}
                    </h1>
                    <div className="flex items-center text-amber-500 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="fill-current h-5 w-5" />
                      ))}
                      <span className="text-gray-700 mr-2">(47 تقييم)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleBookmark()}
                  >
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6">
                {service.description} نقدم هذه الخدمة بأعلى المعايير المهنية من
                خلال فريق متخصص من الخبراء المؤهلين للتعامل مع مختلف الاحتياجات.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الموقع</p>
                    <p className="font-medium">الرياض، حي الورود</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">متاح من</p>
                    <p className="font-medium">الأحد - الخميس</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-md">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ساعات العمل</p>
                    <p className="font-medium">9:00 ص - 3:00 م</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-md">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">مقدم من</p>
                    <p className="font-medium">
                      جمعية رعاية ذوي الاحتياجات الخاصة
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details Tabs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                  <TabsTrigger value="requirements">
                    الشروط والمتطلبات
                  </TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">نبذة عن الخدمة</h3>
                    <p className="text-gray-700 mb-4">
                      تقدم هذه الخدمة مجموعة متكاملة من البرامج التعليمية
                      المصممة خصيصاً لتلبية احتياجات الأفراد من ذوي الاحتياجات
                      الخاصة. حيث نسعى من خلال هذه البرامج إلى تطوير المهارات
                      الأكاديمية والاجتماعية والعملية بطريقة تتناسب مع قدرات كل
                      فرد.
                    </p>
                    <p className="text-gray-700 mb-4">
                      يقوم على تقديم هذه الخدمة نخبة من المختصين والمعلمين
                      المؤهلين في مجال التربية الخاصة، حيث يتم وضع خطة تعليمية
                      فردية لكل مستفيد بناءً على تقييم شامل لقدراته واحتياجاته.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">الفوائد</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>
                        تطوير المهارات الأكاديمية الأساسية (القراءة، الكتابة،
                        الحساب)
                      </li>
                      <li>تنمية المهارات الاجتماعية والتواصلية</li>
                      <li>تعزيز الثقة بالنفس والاستقلالية</li>
                      <li>دعم متواصل من فريق متخصص</li>
                      <li>تقارير دورية لقياس التقدم والتطور</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">المتطلبات</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>تقرير طبي حديث يوضح الحالة (لا يزيد عن 6 أشهر)</li>
                      <li>صورة من الهوية الوطنية أو سجل الأسرة</li>
                      <li>تعبئة نموذج التسجيل الخاص بالخدمة</li>
                      <li>حضور جلسة التقييم المبدئي</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">الشروط</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>الالتزام بمواعيد الجلسات المحددة</li>
                      <li>
                        إشعار الجمعية قبل 24 ساعة في حال الاعتذار عن حضور جلسة
                      </li>
                      <li>تسديد الرسوم في الموعد المحدد</li>
                      <li>الالتزام بتعليمات المختصين والمتابعة المنزلية</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-amber-800 mb-2">
                          ملاحظة هامة
                        </h4>
                        <p className="text-amber-700">
                          في حال وجود صعوبة في تأمين المستندات المطلوبة أو وجود
                          ظروف خاصة، يرجى التواصل مع مكتب الخدمة الاجتماعية في
                          الجمعية لدراسة الحالة وتقديم الدعم المناسب.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">التقييمات والآراء</h3>
                    <Button variant="outline">إضافة تقييم</Button>
                  </div>

                  {/* Sample reviews */}
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            م
                          </div>
                          <div>
                            <p className="font-bold">محمد عبدالله</p>
                            <p className="text-xs text-gray-500">قبل 3 أيام</p>
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="fill-current h-4 w-4" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        خدمة ممتازة وفريق متخصص. استفاد ابني كثيراً من البرنامج
                        التعليمي المقدم وتحسنت مهاراته بشكل ملحوظ. أنصح بها
                        بشدة.
                      </p>
                    </div>

                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            س
                          </div>
                          <div>
                            <p className="font-bold">سارة محمد</p>
                            <p className="text-xs text-gray-500">قبل أسبوع</p>
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="fill-current h-4 w-4" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-gray-700">
                        تجربة إيجابية بشكل عام. المعلمون متعاونون جداً ويبذلون
                        جهداً كبيراً. أتمنى لو كانت مواعيد الجلسات أكثر مرونة.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            ع
                          </div>
                          <div>
                            <p className="font-bold">عبدالرحمن علي</p>
                            <p className="text-xs text-gray-500">قبل شهر</p>
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="fill-current h-4 w-4" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        خدمة ممتازة ومميزة. الجمعية توفر كل ما يلزم من أدوات
                        ووسائل تعليمية حديثة. أشكر فريق العمل على جهودهم
                        المبذولة.
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <Button variant="ghost">عرض المزيد من التقييمات</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  200 ريال
                </h3>
                <p className="text-gray-500">سعر الجلسة الواحدة</p>
              </div>

              <div className="border-t border-b py-4 my-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">عدد الجلسات الأسبوعية</span>
                  <span className="font-bold">3 جلسات</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">مدة الجلسة</span>
                  <span className="font-bold">45 دقيقة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">القيمة الشهرية</span>
                  <span className="font-bold text-primary">2400 ريال</span>
                </div>
              </div>

              <Button className="w-full mb-3">طلب الخدمة</Button>
              <Button variant="outline" className="w-full">
                جدولة مكالمة استشارية
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">بحاجة إلى مساعدة؟</p>
                <div className="flex justify-center gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-5 w-5 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">مقدم الخدمة</h3>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold">
                    جمعية رعاية ذوي الاحتياجات الخاصة
                  </h4>
                  <p className="text-gray-500 text-sm">جمعية خيرية مرخصة</p>
                </div>
              </div>

              <div className="flex gap-1 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="fill-current h-5 w-5" />
                ))}
                <span className="text-gray-700 mr-2">(120 تقييم)</span>
              </div>

              <Link to={`/associations/1`}>
                <Button variant="outline" className="w-full">
                  عرض الملف الكامل
                </Button>
              </Link>
            </div>

            {/* Related Documents */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">مستندات ومرفقات</h3>

              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <span>نموذج التسجيل</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <span>الشروط والأحكام</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <span>دليل المستفيد</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
