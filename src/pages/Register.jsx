import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
const Register = () => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("client");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orgLicense, setOrgLicense] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDocuments(filesArray);

      // إظهار رسالة تأكيد تحميل الوثائق
      if (filesArray.length > 0) {
        toast({
          title: "تم رفع الوثائق",
          description: `تم رفع ${filesArray.length} ملف/ملفات بنجاح`,
        });
      }
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);

      // إظهار رسالة تأكيد تحميل الوثائق
      if (filesArray.length > 0) {
        toast({
          title: "تم رفع الصورة",
          description: `تم رفع ${filesArray.length} ملف/ملفات بنجاح`,
        });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (userType === "client") {
        formData.append("full_name", full_name);
        formData.append("email", email);
        formData.append("mobile_number", phone);
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
        if (documents.length > 0) {
          formData.append("file", documents[0]);
        }
        if (images.length > 0) {
          formData.append("image", images[0]);
        }
        console.log(formData);
        const response = await fetch(
          "http://127.0.0.1:8000/api/clientRegister",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        if (!response.ok) {
          if (data.errors) {
            const messages = Object.values(data.errors).flat().join("، ");
            throw new Error(messages);
          }

          throw new Error(data.data || "حدث خطأ غير متوقع أثناء التسجيل");
        }

        // تسجيل ناجح
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: data.msg || "مرحباً بك في منصة تمكين",
        });
        navigate("/login");
      } else {
        formData.append("full_name", full_name);
        formData.append("email", email);
        formData.append("mobile_number", phone);
        formData.append("license", orgLicense);
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
        if (documents.length > 0) {
          formData.append("file", documents[0]);
        }
        if (images.length > 0) {
          formData.append("image", images[0]);
        }
        console.log(formData);
        const response = await fetch(
          "http://127.0.0.1:8000/api/associationRegister",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (!response.ok) {
          if (data.errors) {
            const messages = Object.values(data.errors).flat().join("، ");
            throw new Error(messages);
          }

          // استخدم msg بدل message
          throw new Error(data.data || "حدث خطأ غير متوقع أثناء التسجيل");
        }

        // تسجيل ناجح
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: data.msg || "مرحباً بك في منصة تمكين",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "فشل التسجيل",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 rtl">
      <div className="w-full max-w-xl">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <Logo size="large" withText={true} />
            </Link>
            <p className="text-gray-600 mt-2">إنشاء حساب جديد</p>
          </div>

          <Tabs defaultValue="client" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2 mb-8 flex-row-reverse">
              <TabsTrigger value="client" className="flex items-center gap-2">
                <UserPlus size={18} />
                <span>فرد</span>
              </TabsTrigger>
              <TabsTrigger
                value="association"
                className="flex items-center gap-2"
              >
                <Users size={18} />
                <span>جمعية/مركز</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="client" className="space-y-4" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 text-right">
                    <Label htmlFor="full_name">الاسم الكامل</Label>
                    <Input
                      id="full_name"
                      placeholder="أدخل الاسم الكامل"
                      value={full_name}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="email-individual">البريد الإلكتروني</Label>
                    <Input
                      id="email-individual"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="phone-individual">رقم الجوال</Label>
                    <Input
                      id="phone-individual"
                      placeholder="09xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="images">صورة شخصية </Label>
                    <div className="flex items-center flex-row-reverse gap-2">
                      <Label
                        htmlFor="images"
                        className="flex items-center gap-2 py-2 px-4 border border-dashed border-primary rounded-md w-full cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={18} className="text-primary" />
                        <span>
                          {images.length > 0
                            ? `${images.length} ملف/ملفات محددة`
                            : "اضغط لتحميل صورة شخصية"}
                        </span>
                      </Label>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="documents">وثائق التوثيق</Label>
                    <div className="flex items-center flex-row-reverse gap-2">
                      <Label
                        htmlFor="documents"
                        className="flex items-center gap-2 py-2 px-4 border border-dashed border-primary rounded-md w-full cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={18} className="text-primary" />
                        <span>
                          {documents.length > 0
                            ? `${documents.length} ملف/ملفات محددة`
                            : "اضغط لتحميل الوثائق"}
                        </span>
                      </Label>
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 text-right mt-3">
                    <span className="text-xs text-gray-500">
                      يمكنك رفع أي بطاقة أو وثيقة تثبت أحقيتك في الانضمام لنا
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      سيقوم الأدمن بمراجعة الملفات
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="password-individual">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password-individual"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-right pr-10"
                      />
                      {/* <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button> */}
                    </div>
                    <p className="text-xs text-gray-500">
                      يجب أن تكون كلمة المرور 8 أحرف على الأقل
                    </p>
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="confirm-password-individual">
                      تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password-individual"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="أعد إدخال كلمة المرور"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-right pr-10"
                      />
                      {/* <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button> */}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="association" className="space-y-4" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="full-name">اسم الجمعية/المركز</Label>
                    <Input
                      id="full-name"
                      placeholder="أدخل اسم الجمعية أو المركز"
                      value={full_name}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="email-org">البريد الإلكتروني</Label>
                    <Input
                      id="email-org"
                      type="email"
                      placeholder="أدخل البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="phone-org">رقم التواصل</Label>
                    <Input
                      id="phone-org"
                      placeholder="09xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="images">صورة للملف الشخصي </Label>
                    <div className="flex items-center flex-row-reverse gap-2">
                      <Label
                        htmlFor="images"
                        className="flex items-center gap-2 py-2 px-4 border border-dashed border-primary rounded-md w-full cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={18} className="text-primary" />
                        <span>
                          {images.length > 0
                            ? `${images.length} ملف/ملفات محددة`
                            : "اضغط لتحميل صورة شخصية"}
                        </span>
                      </Label>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="documents">وثائق التوثيق</Label>
                    <div className="flex items-center flex-row-reverse gap-2">
                      <Label
                        htmlFor="documents"
                        className="flex items-center gap-2 py-2 px-4 border border-dashed border-primary rounded-md w-full cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={18} className="text-primary" />
                        <span>
                          {documents.length > 0
                            ? `${documents.length} ملف/ملفات محددة`
                            : "اضغط لتحميل الوثائق"}
                        </span>
                      </Label>
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      يمكنك رفع أي بطاقة أو وثيقة تثبت أحقيتك في الانضمام لنا
                    </p>
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="license">رقم الترخيص</Label>
                    <Input
                      id="license"
                      placeholder="أدخل رقم الترخيص"
                      value={orgLicense}
                      onChange={(e) => setOrgLicense(e.target.value)}
                      className="text-right"
                    />
                    <p className="text-xs text-gray-500">
                      سيتم التحقق من صحة الترخيص قبل تفعيل الحساب
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right">
                    <Label htmlFor="password-org">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password-org"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-right pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Label htmlFor="confirm-password-org">
                      تأكيد كلمة المرور
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password-org"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="أعد إدخال كلمة المرور"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-right pr-10"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* <div className="flex items-center space-x-2 space-x-reverse mt-6">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  أوافق على{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    سياسة الخصوصية
                  </Link>
                </Label>
              </div> */}

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                    <span>جاري إنشاء الحساب...</span>
                  </div>
                ) : (
                  <span>إنشاء حساب</span>
                )}
              </Button>
            </form>
          </Tabs>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
