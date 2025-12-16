import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_BY_PLAN = {
  basic: process.env.STRIPE_PRICE_BASIC!,
  air: process.env.STRIPE_PRICE_AIR!,
  pro: process.env.STRIPE_PRICE_PRO!,
} as const;

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    if (!plan || !(plan in PRICE_BY_PLAN)) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment", // use "subscription" if the price is recurring
      line_items: [
        {
          price: PRICE_BY_PLAN[plan as keyof typeof PRICE_BY_PLAN],
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payments/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
