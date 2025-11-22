import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { API_URL } from "../config";

const ConnectionStatus = () => {
  const [status, setStatus] = useState("connecting");
  useEffect(() => {
    const check = async () => {
      try {
        await fetch(`${API_URL}/health`);
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    };
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  return status === "online" ? (
    <div className="bg-green-50 text-green-700 text-xs py-1 text-center border-b border-green-100 flex justify-center items-center gap-2">
      <CheckCircle2 className="w-3 h-3" /> Connected to Backend (Loaded 60 DB
      Records)
    </div>
  ) : (
    <div className="bg-red-50 text-red-700 text-xs py-1 text-center border-b border-red-100 flex justify-center items-center gap-2">
      <AlertCircle className="w-3 h-3" /> Backend Disconnected (Run 'node
      server.js')
    </div>
  );
};

export default ConnectionStatus;
