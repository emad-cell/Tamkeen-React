import { useState } from "react";
import { api } from "../../services/axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { useAuth } from "../../context/AuthContext";
import { authWithGoogle } from "@/services/auth";
import { handleApiError } from "@/utils/apiError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigateByRole = (role) => {
    switch (role) {
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
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);

      try {
        const res = await authWithGoogle({
          access_token: tokenResponse.access_token,
          provider: "google",
        });

        const authData = res?.data?.data || res?.data?.user || res?.data;
        const token = authData?.token || res?.data?.token;

        if (!token) {
          throw new Error("Token not found in Google login response");
        }

        const role = res?.data?.role || authData?.role;
        login({ ...authData, token });
        toast({
          title: "Logged in successfully",
          description: `Welcome back, ${authData?.email || "there"}`,
        });
        navigateByRole(role);
      } catch (error) {
        toast({
          title: "Google login failed",
          description: handleApiError(error),
          variant: "destructive",
        });
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      toast({
        title: "Google login was canceled",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/login", {
        email,
        password,
      });
      login(res.data.data);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${res.data.data.email}`,
      });
      navigateByRole(res.data.role);
    } catch (error) {
      toast({
        title: "Please try again",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#f4f7f2] p-4"
      style={{ direction: "ltr" }}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl animate-auth-float" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-teal-300/30 blur-3xl animate-auth-float-delay" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-emerald-100 bg-white/95 p-8 shadow-[0_20px_60px_rgba(16,24,40,0.08)] backdrop-blur-md animate-auth-fade-up">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <Logo size="large" withText={true} />
              </Link>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-slate-200 bg-[#fcfdfb] focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-slate-700">
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 border-slate-200 bg-[#fcfdfb] pl-10 focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                    <button
                      type="button"
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full bg-gradient-to-l from-emerald-700 to-teal-600 text-white shadow-lg shadow-emerald-900/10 transition hover:brightness-110"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn size={18} />
                      <span>Sign in</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or</span>
              </div>
            </div>
            <div className="mt-5">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:bg-emerald-50"
                onClick={() => handleGoogleAuth()}
                disabled={isGoogleLoading}
              >
                <span className="flex items-center justify-center gap-3">
                  <svg
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303C33.652 32.659 29.32 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.038l5.657-5.657C34.051 6.053 29.284 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.038l5.657-5.657C34.051 6.053 29.284 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.22 0 9.943-1.997 13.523-5.243l-6.248-5.285C29.173 34.091 26.717 35 24 35c-5.3 0-9.618-3.317-11.29-7.946l-6.52 5.024C9.514 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.013 2.916-3.04 5.347-5.827 6.471l.002-.001 6.248 5.285C35.804 37.196 40 31.103 40 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  <span>
                    {isGoogleLoading
                      ? "Please wait..."
                      : "Continue with Google"}
                  </span>
                </span>
              </Button>
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center mt-8 animate-auth-fade-up-delay">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
