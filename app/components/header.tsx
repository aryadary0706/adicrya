"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-emerald-600 font-semibold"
      : "text-slate-600 hover:text-emerald-500";

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="font-bold text-xl tracking-tight text-slate-800">
              WisataYok
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={isActive("/")}>Home</Link>
            <Link href="/recommendations" className={isActive("/recommendations")}>
              Destinations
            </Link>
            <Link href="/saved" className={isActive("/saved")}>Saved Trips</Link>
            <Link
              href="/plan"
              className="bg-emerald-600 text-white px-4 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
            >
              Plan Trip
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-600 hover:text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base text-slate-700 hover:text-emerald-600 hover:bg-slate-50">
              Home
            </Link>
            <Link href="/recommendations" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base text-slate-700 hover:text-emerald-600 hover:bg-slate-50">
              Destinations
            </Link>
            <Link href="/plan" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base text-slate-700 hover:text-emerald-600 hover:bg-slate-50">
              Plan Trip
            </Link>
            <Link href="/saved" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base text-slate-700 hover:text-emerald-600 hover:bg-slate-50">
              Saved Trips
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
