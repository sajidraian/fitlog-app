import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-[#ccff00]">404</h1>
      <h2 className="text-2xl font-bold uppercase text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 text-sm mt-2 max-w-md">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-[#b3e600] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}