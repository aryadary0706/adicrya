import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-50 mb-4 mx-auto md:mx-0">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-slate-900 mb-2 text-center md:text-left">
        {title}
      </h3>
      <p className="text-slate-500 text-center md:text-left">{description}</p>
    </div>
  );
}
