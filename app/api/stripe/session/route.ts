import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId)
    return Response.json({ error: "Missing session_id" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return Response.json({
      exists: true,
      id: session.id,
      payment_status: session.payment_status,
      status: session.status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email ?? null,
    });
  } catch (e: any) {
    // session not found / wrong mode / wrong account -> Stripe throws
    return Response.json(
      { exists: false, error: e?.message ?? "Not found" },
      { status: 404 }
    );
  }
}
