export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-[#1e222a] py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
       
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 flex items-center justify-center text-[#ccff00]">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1zm12 0a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1zM3 8a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1zM8 11h8v2H8z" />
            </svg>
          </div>

          <span className="font-black text-base tracking-wider uppercase text-white font-mono">
            FITLOG
          </span>
        </div>

        <p className="text-gray-500 text-xs font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}