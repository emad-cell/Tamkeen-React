import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Search,
  ArrowRight,
  Heart,
  DollarSign,
  Brain,
  Book,
  Activity,
  Users,
  School,
  Stethoscope,
  FileText,
  PlusCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { servicesData } from "../components/Services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const typeConfig = {
  اجتماعية: {
    icon: <Users className="h-6 w-6 text-white" />,
    gradient: "from-amber-500 to-yellow-400",
  },
  مادي: {
    icon: <Heart className="h-6 w-6 text-white" />,
    gradient: "from-pink-500 to-rose-400",
  },
  نفسية: {
    icon: <Brain className="h-6 w-6 text-white" />,
    gradient: "from-purple-500 to-indigo-400",
  },
  تعليمية: {
    icon: <School className="h-6 w-6 text-white" />,
    gradient: "from-blue-500 to-cyan-400",
  },
  فيزيئية: {
    icon: <FileText className="h-6 w-6 text-white" />,
    gradient: "from-gray-600 to-gray-500",
  },
  طبية: {
    icon: <Stethoscope className="h-6 w-6 text-white" />,
    gradient: "from-teal-500 to-green-400",
  },
};

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState([]);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/service");
        const result = await response.json();

        if (result.status === 200 && result.data) {
          setData(result.data);
          console.log();
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);
  const handleRequestService = async (id, user_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          user_id: user_id, // يبقى رقم (integer)
          email: localStorage.getItem("email"),
          service_id: id,
          note: note,
        }),
      });

      const data = await response.json().catch(() => ({}));
      console.log("Add service response:", response.status, data);

      if (!response.ok) {
        if (data.errors) {
          const messages = Object.values(data.errors).flat().join("، ");
          throw new Error(messages);
        }
        if (data.message) {
          throw new Error(data.message);
        }
        if (response.status === 401) {
          throw new Error("غير مصرح. يرجى تسجيل الدخول من جديد.");
        }
        throw new Error(data.data || "حدث خطأ غير متوقع أثناء الإدخال");
      }

      toast({
        title: "تمت إضافة الخدمة بنجاح",
      });
    } catch (error) {
      console.log(3);
      toast({
        title: "فشل الإضافة",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="font-sans" style={{ direction: "rtl" }}>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary to-primary/80 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white my-4 ">
            خدماتنا المتخصصة
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            نقدم باقة متنوعة من الخدمات المتخصصة لذوي الاحتياجات الخاصة لضمان
            حصولهم على أفضل دعم ممكن
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 text-gray-500 h-5 w-5" />
              <Input
                className="pr-10 bg-white/90 focus:bg-white"
                placeholder="ابحث عن خدمة معينة..."
              />
            </div>
            <Button variant="secondary" className="flex items-center gap-2">
              <Filter size={18} />
              <span>تصفية النتائج</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label htmlFor="location">المنطقة</Label>
              <Select>
                <SelectTrigger id="location">
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المناطق</SelectItem>
                  <SelectItem value="riyadh">الرياض</SelectItem>
                  <SelectItem value="jeddah">جدة</SelectItem>
                  <SelectItem value="dammam">الدمام</SelectItem>
                  <SelectItem value="makkah">مكة المكرمة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="disability-type">نوع الإعاقة</Label>
              <Select>
                <SelectTrigger id="disability-type">
                  <SelectValue placeholder="اختر نوع الإعاقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="physical">حركية</SelectItem>
                  <SelectItem value="visual">بصرية</SelectItem>
                  <SelectItem value="hearing">سمعية</SelectItem>
                  <SelectItem value="mental">ذهنية</SelectItem>
                  <SelectItem value="learning">صعوبات تعلم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="price-range">نطاق السعر</Label>
              <Slider defaultValue={[500]} max={1000} step={50} />
              <div className="flex justify-between text-sm text-gray-500">
                <span>مجاني</span>
                <span>1000 ريال</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="rating">التقييم</Label>
              <Select>
                <SelectTrigger id="rating">
                  <SelectValue placeholder="اختر التقييم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التقييمات</SelectItem>
                  <SelectItem value="5">5 نجوم</SelectItem>
                  <SelectItem value="4">4 نجوم وأعلى</SelectItem>
                  <SelectItem value="3">3 نجوم وأعلى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Listing */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((service) => {
              const { icon: Icon, gradient } = typeConfig[service.type] || {
                icon: <Users className="h-6 w-6 text-white" />,
                gradient: "from-gray-400 to-gray-600",
              };

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-3 bg-gradient-to-r ${gradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex-shrink-0`}
                      >
                        {Icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {service.association}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full">
                        {service.type}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {service.location}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          service.available == 1
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {service.available == 1 ? "متاحة" : "غير متاحة"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-primary font-bold">
                        {service.price}
                        <span className="text-gray-500 text-sm font-normal">
                          /للجلسة
                        </span>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex items-center gap-2">
                            <PlusCircle size={16} />
                            <span>عرض تفاصيل الخدمة</span>
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                              {service.name}
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                              {service.description}
                            </DialogDescription>
                          </DialogHeader>

                          {/* التفاصيل */}
                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div>
                              <span className="font-semibold">النوع:</span>{" "}
                              {service.type}
                            </div>
                            <div>
                              <span className="font-semibold">السعر:</span>{" "}
                              {service.price
                                ? `${service.price} ل.س`
                                : "مجانية"}
                            </div>
                            <div>
                              <span className="font-semibold">الموقع:</span>{" "}
                              {service.location}
                            </div>
                            <div>
                              <span className="font-semibold">
                                العدد المطلوب للخدمة:
                              </span>{" "}
                              {service.capacity}
                            </div>
                            <div>
                              <span className="font-semibold">
                                تاريخ البداية:
                              </span>{" "}
                              {service.start_date}
                            </div>
                            <div>
                              <span className="font-semibold">
                                تاريخ الانتهاء:
                              </span>{" "}
                              {service.end_date}
                            </div>
                            <div className="col-span-2">
                              <span className="font-semibold">المتطلبات:</span>{" "}
                              {service.requirements || "لا توجد متطلبات"}
                            </div>
                            <div className="col-span-2">
                              <span className="font-semibold">الجمعية:</span>{" "}
                              {service.association || "غير محدد"}
                            </div>
                            <div className="col-span-2">
                              <span className="font-semibold">الحالة:</span>{" "}
                              {service.status === "active" ? (
                                <span className="text-green-600">نشطة</span>
                              ) : (
                                <span className="text-red-600">متوقفة</span>
                              )}
                            </div>
                          </div>

                          <DialogFooter className="mt-6">
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div className=" space-y-1">
                                <Input
                                  id="service-name"
                                  placeholder="هل لديك اي ملاحظات؟"
                                  value={note}
                                  onChange={(e) => setNote(e.target.value)}
                                />
                              </div>
                              <div className=" space-y-1">
                                <Button
                                  type="submit"
                                  onClick={() =>
                                    handleRequestService(
                                      service.id,
                                      service.user_id
                                    )
                                  }
                                >
                                  طلب الخدمة
                                </Button>
                              </div>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="mx-auto">
              تحميل المزيد من الخدمات
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
