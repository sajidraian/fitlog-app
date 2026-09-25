import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h1 className="text-6xl sm:text-8xl font-black text-[#ccff00]">404</h1>
      <h2 className="text-xl font-extrabold uppercase tracking-wide">Page Not Found</h2>
      <p className="text-xs text-zinc-400 max-w-xs">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="bg-[#ccff00] text-black font-extrabold text-xs px-6 py-3 rounded-xl uppercase tracking-wider mt-4">
        Back to Home
      </Link>
    </div>
  );
}