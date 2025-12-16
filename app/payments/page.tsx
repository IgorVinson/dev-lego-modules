import Link from "next/link";
import PaymentButton from "./PaymentButton";

const steps = [
  {
    title: "Provision Stripe keys",
    summary:
      "Create a project inside the Stripe Dashboard and copy both publishable and secret keys into your environment.",
    checklist: [
      "Install `stripe` + `@stripe/stripe-js` packages for server and client utilities.",
      "Store `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` inside `.env.local`.",
      "Expose the publishable key through `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.",
    ],
  },
  {
    title: "Create checkout session endpoints",
    summary:
      "Use a Next.js Route Handler or API Route to create Payment Links or Checkout Sessions on demand.",
    checklist: [
      'Instantiate `const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });`.',
      "Validate the incoming payload (product id, price id, success/cancel URLs).",
      "Return the session URL to the client and redirect using `router.push(session.url)`.",
    ],
  },
  {
    title: "Handle webhooks + fulfillment",
    summary:
      "Listen for `checkout.session.completed` and subscription lifecycle events to update your database.",
    checklist: [
      "Use the raw request body plus `stripe.webhooks.constructEvent` with the webhook secret.",
      "Persist customers, products, and invoices so you can reconcile subscriptions later.",
      "Send confirmation emails or unlock product access after successful events.",
    ],
  },
];

const resources = [
  {
    title: "Example repo",
    description:
      "Minimal Next.js + Stripe starter showing Checkout + webhook handling.",
    action: {
      label: "Open template",
      href: "https://github.com/stripe-samples/nextjs-typescript-react-stripe-js",
    },
  },
  {
    title: "Stripe Dashboard",
    description:
      "Manage products, pricing, and monitor live/test events with observability built-in.",
    action: {
      label: "Visit dashboard",
      href: "https://dashboard.stripe.com/test/payments",
    },
  },
  {
    title: "API reference",
    description:
      "All REST + client SDK methods with request + response samples.",
    action: { label: "Read docs", href: "https://stripe.com/docs/api" },
  },
];

export default function Payments() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-indigo-500/30">
      <div className="flex justify-center">
        <PaymentButton text="Pay here with Stripe" plan="basic" />
      </div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 dark:bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-900/10 blur-[120px]" />
      </div>
      <main className="relative z-10 flex min-h-screen flex-col items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-indigo-700 dark:text-indigo-300 hover:underline mb-8"
          >
            Back to modules
          </Link>

          {/* Hero Section */}
          <section className="mb-16 text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md">
              <span className="text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase">
                Stripe Integration
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-indigo-600 to-indigo-400 dark:from-white dark:via-indigo-200 dark:to-indigo-400">
              Launch payments in a single sprint
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Use this blueprint to wire up Stripe Checkout, subscriptions, and
              webhooks with confidence. Everything follows the same design
              system as the rest of Dev Lego Modules so you stay on brand while
              adding revenue features.
            </p>
          </section>

          {/* Highlights */}
          <section className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-3">
                Environment
              </p>
              <h3 className="text-2xl font-semibold mb-2">Test vs Live</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Build everything in test mode first. Switch keys only when your
                webhook endpoint + UI handle all status paths.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-3">
                Tooling
              </p>
              <h3 className="text-2xl font-semibold mb-2">Stripe CLI</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Run <code>stripe login</code> then{" "}
                <code>
                  stripe listen --forward-to localhost:3000/api/webhook
                </code>{" "}
                to replay events locally.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-3">
                Security
              </p>
              <h3 className="text-2xl font-semibold mb-2">Least privilege</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Keep secret keys on the server only and restrict dashboard roles
                so one leaked key cannot charge arbitrary customers.
              </p>
            </div>
          </section>

          {/* Steps */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold">Implementation path</h2>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                3 core milestones
              </span>
            </div>
            <div className="space-y-6">
              {steps.map(step => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 backdrop-blur-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      ~2 hours
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {step.summary}
                  </p>
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {step.checklist.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-indigo-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Code example */}
          <section className="mb-16">
            <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-50 via-white to-transparent dark:from-indigo-950 dark:via-black/20 dark:to-transparent p-8">
              <h2 className="text-3xl font-semibold mb-4">Server snippet</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Drop this Route Handler in{" "}
                <code>app/api/create-checkout-session/route.ts</code> and call
                it from your product page. Replace price IDs + URLs with your
                own values.
              </p>
              <pre className="bg-black/90 text-white text-sm rounded-2xl p-6 overflow-x-auto">
                {`import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    success_url: body.successUrl,
    cancel_url: body.cancelUrl,
    line_items: [{ price: body.priceId, quantity: 1 }],
  });

  return NextResponse.json({ url: session.url });
}`}
              </pre>
            </div>
          </section>

          {/* Resources */}
          <section className="mb-24">
            <h2 className="text-3xl font-semibold mb-6">Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {resources.map(resource => (
                <div
                  key={resource.title}
                  className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 backdrop-blur"
                >
                  <p className="text-sm uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-3">
                    {resource.title}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                    {resource.description}
                  </p>
                  <a
                    href={resource.action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-300 hover:underline"
                  >
                    {resource.action.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5H21m0 0v7.5m0-7.5L10.5 15"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 9.75v8.25a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18V8.25A2.25 2.25 0 0 1 6 6h8.25"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
