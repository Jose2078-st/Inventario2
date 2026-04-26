import { Check } from 'lucide-react';

export function Pricing() {
  const features = [
    'Unlimited site photos and voice notes',
    'AI-powered organization and tagging',
    'Professional PDF export',
    'Cloud storage and archiving',
    'Mobile and desktop access',
    'Priority email support',
    'Custom branding on reports',
    'Advanced analytics dashboard'
  ];

  return (
    <section className="border-b border-[#2b2b2b] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2
            className="mb-4"
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '-0.01em'
            }}
          >
            One plan. Full access.
          </h2>
          <p
            className="mx-auto max-w-2xl text-[#5a5a5a]"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6
            }}
          >
            No tiers, no upsells, no surprises. Just professional documentation tools at a fair price.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="border border-[#2b2b2b] bg-white p-10">
            {/* Header */}
            <div className="mb-8 border-b border-[#e0e0e0] pb-6 text-center">
              <h3
                className="mb-2"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em'
                }}
              >
                Professional
              </h3>
              <div className="mb-2">
                <span
                  style={{
                    fontSize: '4rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  $49
                </span>
                <span
                  className="ml-2 text-[#999]"
                  style={{
                    fontSize: '1.25rem'
                  }}
                >
                  /month
                </span>
              </div>
              <p
                className="font-mono uppercase tracking-wider text-[#999]"
                style={{ fontSize: '0.75rem' }}
              >
                Per user — Billed annually
              </p>
            </div>

            {/* Features */}
            <div className="mb-8 space-y-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={20} className="mt-0.5 flex-shrink-0 text-[#2b2b2b]" strokeWidth={2} />
                  <span
                    className="text-[#2b2b2b]"
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.5
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className="w-full bg-[#FF5733] py-4 transition-all hover:bg-[#e04d2d]"
              style={{
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: '#ffffff'
              }}
            >
              Start 14-Day Free Trial
            </button>
            <p
              className="mt-4 text-center text-[#999]"
              style={{ fontSize: '0.85rem' }}
            >
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}