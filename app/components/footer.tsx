export default function Footer() {

  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm">
            © 2024 WisataYok. All rights reserved.
          </span>
        </div>

        <div className="flex space-x-6 text-sm text-slate-500">
          <button
            className="hover:text-emerald-600 transition-colors"
          >
            Privacy Policy
          </button>

          <button
            className="hover:text-emerald-600 transition-colors"
          >
            Terms of Service
          </button>

          <button
            className="hover:text-emerald-600 transition-colors"
          >
            Sustainable Guidelines
          </button>
        </div>
      </div>
    </footer>
  );
}
