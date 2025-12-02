import Link from "next/link";
import Image from "next/image";
import StepCards from "./components/StepBox";
import { Clock, Globe, ArrowRight, Zap } from 'lucide-react';
import FeatureCard from "./components/FeatureCard";

export default function LandingPage(){
  return(
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Plan Your Perfect Trip <br className="hidden md:block" />
            <span className="text-emerald-300">Responsibly & Instantly</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-emerald-100 mb-10">
            Get a personalized, eco-friendly itinerary in seconds. We optimize routes, suggest sustainable spots, and guide you on local etiquette.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/plan" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-emerald-900 bg-emerald-300 hover:bg-emerald-400 shadow-lg transition-all transform hover:scale-105">
              Start Planning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Why EcoTravel?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              More than just a schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-amber-500" />}
              title="Auto-Generated Itineraries"
              description="Input your city and preferences, and get a complete plan in seconds. No more hours of research."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-blue-500" />}
              title="Smart Time Blocking"
              description="Realistic routing that accounts for travel time and your preferred pace. No rushing."
            />
            <FeatureCard 
              icon={<Globe className="h-8 w-8 text-emerald-500" />}
              title="Local & Sustainable"
              description="Learn local etiquette and find eco-friendly spots to support the local community (SDG 11)."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How it Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
             <StepCards Step="1" text="Choose Destination" />
             <div className="hidden md:block w-16 h-1 bg-slate-200"></div>
             <StepCards Step="2" text="Set Preferences" />
             <div className="hidden md:block w-16 h-1 bg-slate-200"></div>
             <StepCards Step="3" text="Get Itinerary" />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-emerald-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Travelers Love Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-6 rounded-xl shadow-sm">
                 <p className="text-slate-600 italic">"The local etiquette tips saved me from so many awkward moments in Japan. Plus, the route was super efficient!"</p>
                 <div className="mt-4 font-bold text-emerald-800">- Sarah J.</div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm">
                 <p className="text-slate-600 italic">"Finally, a planner that cares about sustainability. Found amazing eco-cafes I wouldn't have found otherwise."</p>
                 <div className="mt-4 font-bold text-emerald-800">- David L.</div>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}