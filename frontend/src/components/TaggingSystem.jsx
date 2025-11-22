import React, { useState } from "react";
import { Loader2, Shield } from "lucide-react";
import { API_URL } from "../config";

const TaggingModule = () => {
  const [input, setInput] = useState({ customer_id: "CUST_A", email_body: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/predict-tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      setResult(await res.json());
    } catch (e) { 
      alert("Server offline"); 
      console.log(e)
    }
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 animate-in fade-in">
      <div className="space-y-4">
        <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800"><Shield className="w-5 h-5 text-blue-600" /> Part A: Isolated Tagging</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Customer (Isolation Scope)</label>
            <select className="w-full p-2 border rounded bg-slate-50" value={input.customer_id} onChange={(e) => setInput({...input, customer_id: e.target.value})}>
              <option value="CUST_A">Customer A (Access/Workflow)</option>
              <option value="CUST_B">Customer B (Billing/Mobile)</option>
              <option value="CUST_C">Customer C (Mail Merge/Search)</option>
              <option value="CUST_D">Customer D (User Mgmt/UI)</option>
              <option value="CUST_E">Customer E (Delays/Drafts)</option>
              <option value="CUST_F">Customer F (Session/Search)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Body</label>
            <textarea className="w-full h-32 p-2 border rounded bg-slate-50 focus:bg-white outline-none transition" placeholder="Paste email content here..." value={input.email_body} onChange={(e) => setInput({...input, email_body: e.target.value})} />
          </div>
          <button onClick={handleSubmit} disabled={loading || !input.email_body} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Predict Tag"}
          </button>
        </div>
      </div>
      <div className="bg-slate-100 p-6 rounded-lg border flex flex-col justify-center items-center min-h-[300px]">
        {result ? (
          <div className="text-center w-full space-y-4 animate-in zoom-in-95">
            <div><div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Predicted Tag</div><span className="px-6 py-2 bg-white text-blue-700 font-bold text-xl rounded-full shadow-sm border border-blue-100">{result.tag}</span></div>
            <div className="w-full max-w-xs mx-auto"><div className="flex justify-between text-xs text-slate-500 mb-1"><span>Confidence</span><span>{(result.confidence * 100).toFixed(0)}%</span></div><div className="h-2 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${result.confidence * 100}%` }} /></div></div>
            <p className="text-sm text-slate-600 italic bg-white p-3 rounded border">"{result.reason}"</p>
          </div>
        ) : <div className="text-slate-400 text-sm">Ready to process...</div>}
      </div>
    </div>
  );
};

export default TaggingModule;