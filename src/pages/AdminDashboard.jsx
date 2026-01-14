import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
// import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  PlusCircle,
  Users,
  Building2,
  FileText,
  Newspaper,
  Award,
} from "lucide-react";

// Import chart component for statistics
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import InfoField from "@/components/InfoField";
import EmptyField from "@/components/EmptyField";
import { useNavigate } from "react-router-dom";
// import { request } from "http";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [pendusers, setPendUsers] = useState([]);
  const [clients_count, setclients_count] = useState(0);
  const [associations_count, setassociations_count] = useState(0);
  const [services_count, setservices_count] = useState(0);
  const [pending_count, setpending_count] = useState(0);
  const [accepted, setaccepted] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({
    totalBeneficiaries: clients_count,
    totalAssociations: associations_count,
    totalServices: 87,
    pendingServices: 8,
    pendingStories: 5,
    pendingArticles: 3,
  });

  const accept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/${id}/active`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = result?.message || result?.data || "فشل حذف الخدمة";
        throw new Error(message);
      }
      setPendUsers((prev) => prev.filter((user) => user.id !== id));

      // ✅ إغلاق Dialog (إن وجد)
      setOpen(false);
      setpending_count(pending_count - 1);

      toast({ title: "تم قبول المستخدم بنجاح" });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/service");
        const result = await response.json();

        if (result.status === 200 && result.data) {
          setServices(result.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/stats");
        const result = await response.json();

        // خزّن البيانات مباشرة
        setStats(result);
        setclients_count(result.clients_count);
        setassociations_count(result.associations_count);
        setservices_count(result.services_count);
        setpending_count(result.pending_count);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/allusers");
        const result = await response.json();
        setUsers(result.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/allPendusers");
        const result = await response.json();
        setPendUsers(result.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="space-y-6 m-3 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
        <span className="text-sm text-gray-500">آخر تحديث: 04/04/2025</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">المستفيدين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {clients_count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">الجمعيات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {associations_count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">الخدمات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {services_count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">قيد الانتظار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {pending_count}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="registrations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="registrations"
            className="flex items-center gap-1"
          >
            <Users size={16} />
            <span>طلبات التسجيل</span>
            <Badge className="ml-1 bg-yellow-500">{pending_count}</Badge>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-1">
            <Building2 size={16} />
            <span>الخدمات</span>
            <Badge className="ml-1 bg-yellow-500">{services_count}</Badge>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1">
            <Building2 size={16} />
            <span>المستخدمون</span>
            <Badge className="ml-1 bg-yellow-500">
              {clients_count + associations_count}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registrations" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">طلبات التسجيل الجديدة</h2>
          </div>

          <div className="space-y-4">
            {pendusers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* قسم معلومات المستخدم */}
                    <div className="flex-1">
                      {/* الاسم الكامل */}
                      <div className="flex flex-col gap-1">
                        {user.association ? (
                          <h3 className="text-lg font-semibold">
                            {user.association.full_name}
                          </h3>
                        ) : null}
                        {user.client ? (
                          <h3 className="text-lg font-semibold">
                            {user.client.full_name}
                          </h3>
                        ) : null}
                      </div>

                      {/* البريد والدور */}
                      <div className="flex flex-col gap-1 mt-2">
                        <p className="text-gray-500 text-sm">
                          البريد الإلكتروني: {user.email}
                        </p>
                        <p className="text-gray-500 text-sm">
                          الدور: {user.role}
                        </p>
                      </div>

                      {/* حالة القبول */}
                      <div className="mt-2 flex items-center gap-2">
                        {user.client?.accepted === 1 && (
                          <Badge variant="default">تم قبول العميل</Badge>
                        )}
                        {user.client?.accepted === 0 && (
                          <Badge variant="destructive">
                            لم يتم قبول العميل
                          </Badge>
                        )}
                        {user.association?.accepted === 1 && (
                          <Badge variant="default">تم قبول الجمعية</Badge>
                        )}
                        {user.association?.accepted === 0 && (
                          <Badge variant="destructive">
                            لم يتم قبول الجمعية
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex flex-col items-end gap-2">
                      {/* <Button
                        variant="outline"
                        onClick={() => accept(user.id)}
                        size="sm"
                      >
                        {" "}
                        عرض بيانات الطلب
                      </Button> */}
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="flex items-center gap-2">
                            <span> عرض الطلب</span>
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              {user.client?.full_name ||
                                user.association?.full_name}
                            </DialogTitle>
                            <DialogDescription>{user.email}</DialogDescription>
                          </DialogHeader>

                          {/* المعلومات */}
                          <div className="grid grid-cols-2 gap-4 py-4">
                            {/* رقم الموبايل */}
                            <InfoField
                              label="رقم الموبايل"
                              value={
                                user.client?.mobile_number ||
                                user.association?.mobile_number ||
                                "-"
                              }
                            />
                            {/* الدور */}
                            <InfoField label="الدور" value={user.role} />
                            {/* الملف */}
                            <div className="col-span-2 space-y-1">
                              <Label>الملف المرفق</Label>
                              {user.file_url ? (
                                <a
                                  href={user.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-10 items-center justify-between rounded-md border border-input px-3 text-sm hover:bg-muted"
                                >
                                  <span>فتح الملف</span>
                                  <span className="text-primary">📄</span>
                                </a>
                              ) : (
                                <EmptyField />
                              )}
                            </div>

                            {/* الصورة */}
                            <div className="col-span-2 space-y-2">
                              <Label>الصورة</Label>
                              {user.image_url ? (
                                <div className="flex justify-center rounded-md border p-3">
                                  <img
                                    src={user.image_url}
                                    alt="user"
                                    className="max-h-48 rounded-md object-contain"
                                  />
                                </div>
                              ) : (
                                <EmptyField />
                              )}
                            </div>
                          </div>

                          <DialogFooter>
                            <Button onClick={() => setOpen(false)}>
                              تعليق الطلب حالي
                            </Button>
                            <Button onClick={() => accept(user.id)}>
                              قبول المستخدم
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">خدمات بانتظار الموافقة</h2>
          </div>
          <div className="space-y-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="text-gray-500">
                        الجمعية/المركز: {service.association}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{service.type}</Badge>
                        <span className="text-sm">السعر: {service.price}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">
                        تاريخ البدء: {service.start_date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold"> المستخدمون</h2>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* قسم معلومات المستخدم */}
                    <div className="flex-1">
                      {/* الاسم الكامل */}
                      <div className="flex flex-col gap-1">
                        {user.association ? (
                          <h3 className="text-lg font-semibold">
                            {user.association.full_name}
                          </h3>
                        ) : null}
                        {user.client ? (
                          <h3 className="text-lg font-semibold">
                            {user.client.full_name}
                          </h3>
                        ) : null}
                      </div>

                      {/* البريد والدور */}
                      <div className="flex flex-col gap-1 mt-2">
                        <p className="text-gray-500 text-sm">
                          البريد الإلكتروني: {user.email}
                        </p>
                        <p className="text-gray-500 text-sm">
                          الدور: {user.role}
                        </p>
                      </div>

                      {/* حالة القبول */}
                      <div className="mt-2 flex items-center gap-2">
                        {user.client?.accepted === 1 && (
                          <Badge variant="default">تم قبول العميل</Badge>
                        )}
                        {user.client?.accepted === 0 && (
                          <Badge variant="destructive">
                            لم يتم قبول العميل
                          </Badge>
                        )}
                        {user.association?.accepted === 1 && (
                          <Badge variant="default">تم قبول الجمعية</Badge>
                        )}
                        {user.association?.accepted === 0 && (
                          <Badge variant="destructive">
                            لم يتم قبول الجمعية
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    // </DashboardLayout>
  );
};

export default AdminDashboard;
