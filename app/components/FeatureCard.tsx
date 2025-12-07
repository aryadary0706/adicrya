import { ReactNode } from "react";

export const colorMap: Record<string, string> = {
  amber: "#f59e0b",
  blue: "#3b82f6",
  emerald: "#10b981",
};


type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  color: keyof typeof colorMap;
};

export default function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const shadowColor = colorMap[color];
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all">
      {/* Glow Circle Layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
        style={{
          boxShadow: `
            0 0 12px ${shadowColor}55,
            0 0 28px ${shadowColor}40,
            0 0 50px ${shadowColor}30,
            0 0 90px ${shadowColor}20
          `
        }}
      />
      {/* Card Content */}
      <div className="relative">
        <div className="flex items-center justify-center h-12 w-12 mb-4 mx-auto md:mx-0">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-slate-900 mb-2 text-center md:text-left">
          {title}
        </h3>
        <p className="text-slate-500 text-center md:text-left">{description}</p>
      </div>
    </div>
  );
}

