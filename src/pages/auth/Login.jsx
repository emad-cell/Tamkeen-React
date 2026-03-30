import { useState } from "react";
import { api } from "../../services/axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { useAuth } from "../../context/AuthContext";
import { handleApiError } from "@/utils/apiError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/login", {
        email,
        password,
      });
      console.log(res);
      login(res.data.data);
      toast({
        title: "Loggedin successfully",
        description: `Wellcome ${res.data.data.email}`,
      });
      switch (res.data.role) {
        case "client":
          navigate("/");
          break;
        case "association":
          navigate("/association/dashboard");
          break;
        case "admin":
          navigate("/");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      toast({
        title: "Try again please",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
      style={{ direction: "rtl" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <Logo size="large" withText={true} />
            </Link>
            <p className="text-gray-600 mt-2">تسجيل الدخول إلى حسابك</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  تذكرني
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    <span>تسجيل الدخول</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">أو</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                إنشاء حساب جديد
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

export default Login;
