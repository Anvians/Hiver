import React, { useState } from "react";
import { Loader2, Database } from "lucide-react";
import { API_URL } from "../config";

const RagModule = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/kb-query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      setResult(await res.json());
    } catch (e) {
      alert("Server offline");
      console.log(e)
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in space-y-6">
      <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
        <Database className="w-5 h-5 text-emerald-600" /> Part C: Knowledge Base
        (RAG)
      </h2>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-4 py-3 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          placeholder="Ask Copilot..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !query}
          className="bg-emerald-600 text-white px-6 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Ask Copilot"
          )}
        </button>
      </div>
      {result && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              AI Answer
            </h3>
            <p className="text-slate-700 leading-relaxed">{result.answer}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
              Source Documentation
            </h4>
            <div className="grid gap-2">
              {result.retrieved_docs.map((doc, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-3 rounded border flex justify-between items-center text-sm"
                >
                  <span className="font-medium text-slate-700">
                    {doc.title}
                  </span>
                  <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600 font-mono">
                    Score: {doc.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RagModule;
