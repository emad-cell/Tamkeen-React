import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  CreditCard,
  Coins,
  AlertCircle,
  AlertCircleIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !name || !email) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // محاكاة لعملية التبرع
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم إرسال التبرع بنجاح",
        description: "شكراً لدعمك منصة تمكين ومساعدة ذوي الاحتياجات الخاصة",
      });

      // إعادة تعيين النموذج
      setAmount("");
      setName("");
      setEmail("");
      setMessage("");
      setPaymentMethod("credit");
    }, 1500);
  };

  const predefinedAmounts = ["1000", "5000", "10000", "20000"];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">تبرع الآن</h1>
            <p className="mt-4 text-gray-600">
              تبرعك يساهم في تغيير حياة ذوي الاحتياجات الخاصة في سوريا ويدعم
              تطوير الخدمات المقدمة لهم
            </p>
          </div>

          {/* <Alert className="mb-8">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDialogTitle>لا حاجة للتسجيل للتبرع</AlertDialogTitle>
            <AlertDialogDescription>
              يمكنك التبرع مباشرة دون الحاجة لإنشاء حساب أو تسجيل الدخول.
            </AlertDialogDescription>
          </Alert> */}

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">مبلغ التبرع (ليرة سورية)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="أدخل مبلغ التبرع"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {predefinedAmounts.map((preAmount) => (
                      <Button
                        key={preAmount}
                        type="button"
                        variant="outline"
                        className={`${
                          amount === preAmount ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => setAmount(preAmount)}
                      >
                        {preAmount} ل.س
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">الاسم (اختياري)</Label>
                  <Input
                    id="name"
                    placeholder="أدخل اسمك"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    سيتم استخدام البريد الإلكتروني لإرسال إيصال التبرع
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">رسالة (اختياري)</Label>
                  <Textarea
                    id="message"
                    placeholder="أضف رسالة مع تبرعك"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>طريقة الدفع</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-4">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label
                          htmlFor="credit"
                          className="flex items-center gap-2 font-normal cursor-pointer"
                        >
                          <CreditCard size={18} />
                          <span>بطاقة ائتمان</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-4">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label
                          htmlFor="bank"
                          className="flex items-center gap-2 font-normal cursor-pointer"
                        >
                          <Coins size={18} />
                          <span>تحويل بنكي</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      <span>جاري معالجة التبرع...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Heart size={18} />
                      <span>تبرع الآن</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">
              كيف سيتم استخدام تبرعك؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">دعم الجمعيات</h3>
                <p className="text-gray-600">
                  مساعدة الجمعيات والمراكز المتخصصة بذوي الاحتياجات الخاصة
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">توفير الخدمات</h3>
                <p className="text-gray-600">
                  توفير خدمات متخصصة في مناطق مختلفة من سوريا
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">تطوير المنصة</h3>
                <p className="text-gray-600">
                  تطوير منصة تمكين لتقديم خدمات أفضل للمستفيدين
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
