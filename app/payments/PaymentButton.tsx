"use client";
type Props = {
  text: string;
  plan: "basic" | "air" | "pro";
};

export default function PaymentButton({ text, plan }: Props) {
  async function pay() {
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ error: "Request failed" }));
        throw new Error(data.error || "Stripe error");
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert(error instanceof Error ? error.message : "Payment failed");
    }
  }

  return (
    <button
      onClick={pay}
      className="btn-primary text-2xl font-semibold text-white border-white hover:cursor-pointer p-2 border-2 rounded-md"
    >
      {text || "Pay"}
    </button>
  );
}
