"use client";
import React, { useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useSearchParams } from "next/navigation";

const GenerateInner = () => {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [pic, setPic] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addLink = () => {
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const submitLinks = async () => {
    const raw = JSON.stringify({ links, handle, pic });

    const baseUrl = window.location.origin;
    const r = await fetch(`${baseUrl}/api/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    });

    const result = await r.json();
    if (result.success) {
      toast.success(result.message);
      setLinks([{ link: "", linktext: "" }]);
      setPic("");
      setHandle("");
      redirect(`/${handle}`)
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col md:grid md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex justify-center items-start flex-col gap-8 p-6 md:p-12 max-w-3xl w-full mx-auto pt-20">
        <h1 className="font-extrabold text-3xl md:text-4xl text-[#1e2330]">
          Create Your Link Tree
        </h1>

        {/* Step 1: Handle */}
        <div className="w-full">
          <h2 className="font-semibold text-xl md:text-2xl text-[#254f1a] mb-2">
            Step 1: Claim your handle
          </h2>
          <input
            className="rounded-xl w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#254f1a]"
            type="text"
            placeholder="Choose a handle"
            value={handle || ""}
            onChange={(e) => setHandle(e.target.value.toLowerCase())}
          />
        </div>

        {/* Step 2: Links */}
        <div className="w-full">
          <h2 className="font-semibold text-xl md:text-2xl text-[#254f1a] mb-2">
            Step 2: Add Links
          </h2>
          {links.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                className="rounded-xl w-full md:w-1/2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#254f1a]"
                type="text"
                placeholder="Enter link text"
                value={item.linktext || ""}
                onChange={(e) =>
                  handleChange(index, item.link, e.target.value)
                }
              />
              <input
                className="rounded-xl w-full md:w-1/2 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#254f1a]"
                type="text"
                placeholder="Enter link"
                value={item.link || ""}
                onChange={(e) =>
                  handleChange(index, e.target.value, item.linktext)
                }
              />
            </div>
          ))}
          <button
            className="bg-[#254f1a] w-full md:w-32 py-2 text-white font-semibold rounded-full hover:bg-[#326a23] transition"
            onClick={addLink}
          >
            + Add Link
          </button>
        </div>

        {/* Step 3: Picture & Final Submit */}
        <div className="w-full">
          <h2 className="font-semibold text-xl md:text-2xl text-[#254f1a] mb-2">
            Step 3: Add a Picture & Finalize
          </h2>
          <div className="flex flex-col gap-3">
            <input
              className="rounded-xl w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#254f1a]"
              type="text"
              placeholder="Enter image link"
              value={pic || ""}
              onChange={(e) => setPic(e.target.value)}
            />
            <button
              className="disabled:bg-slate-600 bg-[#254f1a] w-full py-3 text-white font-bold rounded-full hover:bg-[#326a23] transition"
              onClick={submitLinks}
              disabled={
                pic.trim() === "" ||
                handle.trim() === "" ||
                links[0].linktext.trim() === ""
              }
            >
              Create Your LinkTree
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex justify-center items-center">
        <img
          className="object-contain max-h-[80vh] w-full"
          src="/generate.jpg"
          alt="preview"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

const Generate = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateInner />
    </Suspense>
  );
};

export default Generate;
