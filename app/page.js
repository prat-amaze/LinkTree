"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");

  const createTree = () => {
    if (text.trim() !== "") router.push(`/generate?handle=${text}`);
  };

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[120vh] grid grid-cols-1 md:grid-cols-2">
        <div className="px-6 md:px-16 py-16 md:py-40 flex flex-col justify-center">
          <p className="text-yellow-300 text-4xl sm:text-5xl md:text-7xl font-bold font-sans">
            Everything you are. In one, simple link in bio.
          </p>
          <p className="text-white mt-4 sm:mt-6 text-base sm:text-lg font-bold max-w-xl">
            Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-2 max-w-md">
            <input
              value={text}
              onChange={(e) => setText(e.target.value.toLowerCase())}
              type="text"
              placeholder="Enter your handle"
              className="min-h-14 rounded-lg w-full sm:w-72 pl-4 text-lg"
            />
            <button
              onClick={createTree}
              className="bg-[#e9c0e9] font-bold h-14 sm:h-16 rounded-full text-lg sm:w-60"
            >
              Claim your Linktree
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center px-6 md:px-0 mt-10 md:mt-0">
          <img
            className="h-[40vh] sm:h-[55vh] md:h-[70vh] object-contain"
            src="/home.png"
            alt="home image"
          />
        </div>
      </section>

      <section className="bg-[#bc2f2a] min-h-[90vh]"></section>
      <section className="bg-[#cbd195] min-h-[90vh]"></section>
    </main>
  );
}
