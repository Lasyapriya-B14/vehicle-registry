import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Car, CheckCircle, ShieldCheck, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-20 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
                  Vehicle Registration
                  <span className="block mt-2 text-blue-300">Made Simple</span>
                </h1>
                <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                  Register your vehicles efficiently with our streamlined digital platform. Upload documents, track status, and manage your fleet all in one place.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-blue-50">
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-1 bg-white/20 rounded-lg blur"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/30">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Car className="h-12 w-12 text-blue-300" />
                        <div>
                          <h3 className="text-xl font-semibold">Vehicle Registration</h3>
                          <p className="text-blue-200">Simple, fast, secure</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Register multiple vehicles</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Upload required documents</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Track application status</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300" />
                          <span>Secure approval process</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our vehicle registration system simplifies the entire process with powerful features designed to save you time and effort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Car className="h-10 w-10 text-primary" />,
                  title: "Effortless Registration",
                  description:
                    "Register your vehicles with a simple, intuitive interface. Save time with our streamlined process.",
                },
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "Document Management",
                  description:
                    "Upload, store, and manage all your vehicle-related documents securely in one place.",
                },
                {
                  icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                  title: "Secure Approval Process",
                  description:
                    "Our platform ensures secure and transparent approval processing for all registrations.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md hover:border-primary/50"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete your vehicle registration in just a few simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Create Account",
                  description: "Sign up and create your personal account with a simple registration process.",
                },
                {
                  step: "02",
                  title: "Enter Vehicle Details",
                  description: "Add information about your vehicle including make, model, and identification number.",
                },
                {
                  step: "03",
                  title: "Upload Documents",
                  description: "Upload the required documents to complete your vehicle registration.",
                },
                {
                  step: "04",
                  title: "Receive Approval",
                  description: "Wait for admin approval and get notified when your registration is complete.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full">
                    <div className="absolute -top-4 left-6 bg-primary text-primary-foreground text-sm font-bold py-1 px-3 rounded-full">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of satisfied users who have simplified their vehicle registration process with our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-white text-black hover:bg-blue-50">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}