import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowITWorks";
import Services from "@/components/Services";
import { useEffect } from "react";
import Associations from "@/components/Associations";
import Statistics from "@/components/Statistics";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,#f4f7f2_0%,#fbfcfa_45%,#eef5f1_100%)]"
      style={{ direction: "ltr" }}
    >
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl animate-auth-float" />
      <div className="pointer-events-none absolute top-72 left-0 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl animate-auth-float-delay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
      <Navbar />
      <main className="relative z-10 pt-24 sm:pt-28">
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-emerald-100/70 bg-white/90 shadow-[0_20px_60px_rgba(16,24,40,0.08)] backdrop-blur-md animate-auth-fade-up">
            <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
                    <Sparkles size={16} />
                    Trusted digital platform for specialized services
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Fast, simple, and secure experience
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                    A modern platform that connects people with the right
                    services
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                    We deliver a clean and structured journey that helps users
                    discover associations and specialized services with
                    confidence. The interface combines calm visuals with subtle
                    motion for a polished, professional feel.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition duration-300 hover:brightness-110"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    Sign In
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    "Specialized associations",
                    "Diverse service categories",
                    "Faster and clearer access",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-200/60 to-teal-200/40 blur-2xl" />
                <div className="relative rounded-2xl border border-white/70 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-[0_30px_70px_rgba(15,23,42,0.2)] animate-auth-fade-up-delay">
                  <div className="flex items-center justify-between gap-4">
                    <Logo size="large" withText={true} />
                    <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                      Structured Experience
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                      Tamkeen experience
                    </p>
                    <h2 className="text-2xl font-bold leading-snug md:text-3xl">
                      Calm design, refined gradients, and subtle motion that
                      build trust.
                    </h2>
                    <p className="max-w-md text-sm leading-7 text-white/75">
                      This visual system follows the login page language: clear
                      cards, soft depth, and lightweight motion instead of
                      distracting effects.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs text-white/60">Quick Access</p>
                      <p className="mt-1 text-lg font-semibold">
                        Guided Navigation
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs text-white/60">Trust & Clarity</p>
                      <p className="mt-1 text-lg font-semibold">
                        Professional Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="animate-auth-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <Services />
        </section>
        <section
          className="animate-auth-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <HowItWorks />
        </section>
        <section
          className="animate-auth-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <Associations />
        </section>
        <section
          className="animate-auth-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Statistics />
        </section>
        <section
          className="animate-auth-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          <CallToAction />
        </section>
        <section
          className="animate-auth-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <Footer />
        </section>
      </main>
    </div>
  );
};
export default Index;
