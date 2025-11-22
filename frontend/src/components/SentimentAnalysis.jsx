import React, { useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { API_URL } from "../config";

const SentimentModule = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/analyze-sentiment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_body: text }),
      });
      setResult(await res.json());
    } catch (e) {
      alert("Server offline");
      console.log(e)
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in">
      <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800 mb-4">
        <MessageSquare className="w-5 h-5 text-purple-600" /> Part B: Sentiment
        Analysis
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm border">
          <textarea
            className="w-full h-40 p-4 text-lg outline-none resize-none"
            placeholder="Enter email text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-4 flex justify-end border-t pt-4">
            <button
              onClick={handleAnalyze}
              disabled={loading || !text}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />} Analyze
            </button>
          </div>
        </div>
        <div className="md:col-span-1 space-y-4">
          {result ? (
            <>
              <div
                className={`p-6 rounded-lg border text-center flex flex-col items-center justify-center h-32 ${
                  result.sentiment === "negative"
                    ? "bg-red-50 border-red-200 text-red-600"
                    : result.sentiment === "positive"
                    ? "bg-green-50 border-green-200 text-green-600"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <span className="text-xs uppercase font-bold opacity-75 mb-1">
                  Sentiment
                </span>
                <span className="text-2xl font-bold capitalize">
                  {result.sentiment}
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg border text-sm text-slate-600 h-32 overflow-y-auto shadow-sm">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Reasoning
                </span>
                {result.reasoning}
              </div>
            </>
          ) : (
            <div className="h-full bg-slate-50 rounded-lg border border-dashed flex items-center justify-center text-slate-400 text-sm">
              Results area
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentModule;
