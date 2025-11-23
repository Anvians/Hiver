// 1. We look for VITE_API_URL first.
// 2. If it doesn't exist (local development), we use localhost.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";