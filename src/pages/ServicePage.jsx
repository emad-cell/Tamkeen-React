import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Tag,
  DollarSign,
  CheckCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

// Mock data for the service
const serviceData = {
  id: "1",
  name: "جلسات علاج فيزيائي للأطفال",
  description:
    "خدمة جلسات العلاج الفيزيائي للأطفال من ذوي الاحتياجات الخاصة. تهدف الجلسات إلى تحسين القدرات الحركية وتعزيز الاستقلالية في الحركة والتنقل. يشرف على الجلسات فريق متخصص من أخصائيي العلاج الفيزيائي المؤهلين للتعامل مع احتياجات الأطفال المختلفة.",
  association: {
    id: "1",
    name: "مركز الأمل للرعاية",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    location: "دمشق - المزة",
    phone: "09xxxxxxxx",
    email: "info@alamal.org",
    rating: 4.8,
    reviewsCount: 24,
  },
  category: "طبية",
  price: "مجاني",
  isPaid: false,
  availability: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
  hours: "9:00 صباحاً - 3:00 مساءً",
  requirements: [
    "تقرير طبي حديث",
    "بطاقة هوية المريض أو المعيل",
    "صور شخصية للمريض",
  ],
  images: [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  ],
  beneficiariesCount: 120,
  faqs: [
    {
      question: "ما هي مدة الجلسة؟",
      answer: "مدة الجلسة 45 دقيقة لكل مريض.",
    },
    {
      question: "هل يمكن حجز أكثر من جلسة في الأسبوع؟",
      answer: "نعم، يمكن حجز جلستين كحد أقصى في الأسبوع الواحد.",
    },
    {
      question: "هل يجب حضور ولي الأمر مع الطفل؟",
      answer:
        "نعم، يجب حضور ولي الأمر أو المعيل مع الطفل لمتابعة الجلسة والتعرف على التمارين التي يمكن متابعتها في المنزل.",
    },
  ],
  reviews: [
    {
      id: 1,
      user: "أحمد محمود",
      rating: 5,
      date: "15/03/2025",
      comment:
        "خدمة ممتازة والفريق متعاون جداً. تحسنت حالة ابني كثيراً بعد جلستين فقط.",
    },
    {
      id: 2,
      user: "سمر علي",
      rating: 4,
      date: "10/03/2025",
      comment: "المركز مجهز بشكل جيد والأخصائيين على مستوى عال من المهنية.",
    },
  ],
};

const ServicePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestDate, setRequestDate] = useState("");
  const [requestTime, setRequestTime] = useState("");
  const [requestNotes, setRequestNotes] = useState("");
  const [isForSelf, setIsForSelf] = useState("self");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Simulating fetching a service by ID
  const service = serviceData;
  const [data, setData] = useState(null);

  const handleRequest = () => {
    setIsSubmitting(true);

    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRequestDialog(false);

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معك قريباً لتأكيد موعدك",
      });

      // Reset form data
      setRequestDate("");
      setRequestTime("");
      setRequestNotes("");
      setIsForSelf("self");
      setPatientName("");
      setPatientAge("");
    }, 1500);
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/service/${id}`);
        const result = await response.json();

        if (result.status === 200 && result.data) {
          setData(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (currentImage - 1 + service.images.length) % service.images.length
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: "rtl" }}>
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="text-sm breadcrumbs">
                <ul className="flex items-center space-x-2 space-x-reverse">
                  <li>
                    <Link to="/" className="text-gray-500 hover:text-primary">
                      الرئيسية
                    </Link>
                  </li>
                  <li>
                    <span className="mx-2 text-gray-400">/</span>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-gray-500 hover:text-primary"
                    >
                      الخدمات
                    </Link>
                  </li>
                  <li>
                    <span className="mx-2 text-gray-400">/</span>
                  </li>
                  <li className="text-primary">{service.name}</li>
                </ul>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {service.name}
              </h1>
              <div className="flex items-center mt-2">
                <Link
                  to={`/associations/${service.association.id}`}
                  className="text-primary hover:underline"
                >
                  {service.association.name}
                </Link>
                <Badge variant="outline" className="mr-2">
                  {service.category}
                </Badge>
                <div className="flex items-center mr-2">
                  <div className="flex mr-1">
                    {renderStars(service.association.rating)}
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({service.association.reviewsCount} تقييم)
                  </span>
                </div>
              </div>
            </div>
            <Button
              className="flex items-center gap-2"
              size="lg"
              onClick={() => setShowRequestDialog(true)}
            >
              <span>طلب الخدمة</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-[400px]">
                <img
                  src={service.images[currentImage]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex space-x-2 space-x-reverse">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImage ? "bg-primary" : "bg-white"
                      }`}
                    ></button>
                  ))}
                </div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">تفاصيل الخدمة</TabsTrigger>
                    <TabsTrigger value="requirements">المتطلبات</TabsTrigger>
                    <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          وصف الخدمة
                        </h3>
                        <p className="text-gray-700">{service.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          أسئلة شائعة
                        </h3>
                        <div className="space-y-3">
                          {service.faqs.map((faq, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <h4 className="font-medium text-gray-900">
                                {faq.question}
                              </h4>
                              <p className="text-gray-700 mt-1">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          متطلبات الخدمة
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                          {service.requirements.map((requirement, index) => (
                            <li key={index} className="text-gray-700">
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800">
                          ملاحظة هامة
                        </h4>
                        <p className="text-yellow-700 mt-1">
                          يرجى إحضار جميع المستندات المطلوبة وقت الزيارة
                          للاستفادة من الخدمة بشكل سريع.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          تقييمات المستفيدين
                        </h3>
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-yellow-500 ml-2">
                            {service.association.rating}
                          </div>
                          <div className="flex">
                            {renderStars(service.association.rating)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {service.reviews.length > 0 ? (
                          service.reviews.map((review) => (
                            <div
                              key={review.id}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <div className="flex justify-between">
                                <div className="font-medium">{review.user}</div>
                                <div className="text-gray-500 text-sm">
                                  {review.date}
                                </div>
                              </div>
                              <div className="flex mt-1">
                                {renderStars(review.rating)}
                              </div>
                              <p className="mt-2 text-gray-700">
                                {review.comment}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-center">
                            لا توجد تقييمات بعد
                          </p>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">معلومات الخدمة</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Tag className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">الفئة</span>
                      <p>{service.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">السعر</span>
                      <p>{service.price}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">أيام العمل</span>
                      <p>{service.availability.join("، ")}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">ساعات العمل</span>
                      <p>{service.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">
                        عدد المستفيدين
                      </span>
                      <p>{service.beneficiariesCount}+</p>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4"
                    onClick={() => setShowRequestDialog(true)}
                  >
                    طلب الخدمة
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  معلومات مزود الخدمة
                </h3>

                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden mr-3">
                    <img
                      src={service.association.logo}
                      alt={service.association.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/associations/${service.association.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {service.association.name}
                    </Link>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {renderStars(service.association.rating)}
                      </div>
                      <span className="text-gray-500 text-sm mr-1">
                        ({service.association.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">العنوان</span>
                      <p>{service.association.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">رقم الهاتف</span>
                      <p>{service.association.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="mr-3 text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <span className="text-gray-500 text-sm">
                        البريد الإلكتروني
                      </span>
                      <p>{service.association.email}</p>
                    </div>
                  </div>

                  <Link
                    to={`/associations/${service.association.id}`}
                    className="block text-center text-primary hover:underline mt-4"
                  >
                    عرض صفحة الجمعية
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            خدمات مشابهة قد تهمك
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for similar services */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  className="w-full h-full object-cover"
                  alt="خدمة مشابهة"
                />
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  طبية
                </Badge>
                <h3 className="font-semibold text-lg">علاج النطق للأطفال</h3>
                <p className="text-gray-500 text-sm mb-3">مركز النور للتأهيل</p>
                <Button variant="outline" size="sm" className="w-full">
                  عرض التفاصيل
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  className="w-full h-full object-cover"
                  alt="خدمة مشابهة"
                />
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  تعليمية
                </Badge>
                <h3 className="font-semibold text-lg">دورة تعليمية للأطفال</h3>
                <p className="text-gray-500 text-sm mb-3">
                  جمعية الأمل للمستقبل
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  عرض التفاصيل
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  className="w-full h-full object-cover"
                  alt="خدمة مشابهة"
                />
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  نفسية
                </Badge>
                <h3 className="font-semibold text-lg">جلسات دعم نفسي</h3>
                <p className="text-gray-500 text-sm mb-3">مركز الصحة النفسية</p>
                <Button variant="outline" size="sm" className="w-full">
                  عرض التفاصيل
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Service Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>طلب خدمة: {service.name}</DialogTitle>
            <DialogDescription>
              {service.isPaid
                ? `هذه الخدمة مدفوعة بقيمة ${service.price}. سيتم التواصل معك لتحديد طريقة الدفع.`
                : "هذه الخدمة مجانية. سيتم التواصل معك لتأكيد موعدك بعد إرسال الطلب."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="request-date">التاريخ المفضل</Label>
              <Input
                id="request-date"
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="request-time">الوقت المفضل</Label>
              <Input
                id="request-time"
                type="time"
                value={requestTime}
                onChange={(e) => setRequestTime(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                أوقات العمل: {service.hours}
              </p>
            </div>

            <div className="space-y-2">
              <Label>هل الخدمة لك شخصياً؟</Label>
              <RadioGroup value={isForSelf} onValueChange={setIsForSelf}>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="self" id="for-self" />
                    <Label htmlFor="for-self">نعم، لي شخصياً</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="other" id="for-other" />
                    <Label htmlFor="for-other">لا، لشخص آخر</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {isForSelf === "other" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="patient-name">اسم المستفيد</Label>
                  <Input
                    id="patient-name"
                    placeholder="أدخل اسم المستفيد من الخدمة"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-age">عمر المستفيد</Label>
                  <Input
                    id="patient-age"
                    type="number"
                    placeholder="أدخل عمر المستفيد من الخدمة"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="request-notes">ملاحظات إضافية (اختياري)</Label>
              <Textarea
                id="request-notes"
                placeholder="أي معلومات إضافية تود إضافتها للطلب"
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRequestDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              onClick={handleRequest}
              disabled={isSubmitting || !requestDate || !requestTime}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  <span>جاري الإرسال...</span>
                </div>
              ) : (
                <span>إرسال الطلب</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicePage;
