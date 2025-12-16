"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(
          `/api/stripe/session?session_id=${encodeURIComponent(sessionId!)}`
        );
        const data = await res.json();
        console.log(data);
        if (data.exists) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (sessionId) {
      checkSession();
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Payment success</h1>
      <p>Session ID: {sessionId}</p>
      {success ? (
        <p className="text-xl text-green-500 font-bold">Payment successful!</p>
      ) : (
        <p>Processing...</p>
      )}
    </div>
  );
}
