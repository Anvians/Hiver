import React, { useState } from "react";
import ConnectionStatus from "./components/ConnectionStatus.jsx";
import TaggingModule from "./components/TaggingSystem.jsx";
import SentimentModule from "./components/SentimentAnalysis.jsx";
import RagModule from "./components/MiniRAG.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("tagging");
  console.log("Current API URL:", import.meta.env.VITE_API_URL || "Falling back to Localhost");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <ConnectionStatus />
      <header className="bg-white border-b p-6 mb-8">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-yellow-400 rounded text-slate-900 font-bold flex items-center justify-center">
              H
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              AI Evaluation Project
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-11">
            Full-Stack Implementation: React + Express + Gemini
          </p>
        </div>
      </header>
      <main className="container mx-auto px-6">
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-xl shadow-sm border inline-flex">
            {[
              { id: "tagging", label: "Part A: Tagging" },
              { id: "sentiment", label: "Part B: Sentiment" },
              { id: "rag", label: "Part C: RAG" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          {activeTab === "tagging" && <TaggingModule />}
          {activeTab === "sentiment" && <SentimentModule />}
          {activeTab === "rag" && <RagModule />}
        </div>
      </main>
    </div>
  );
}
