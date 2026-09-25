import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";

export default function Home() {
  return (
    <main className="min-h-screen pb-16 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16">
        <Hero />
        <LibrarySection />
      </div>
    </main>
  );
}