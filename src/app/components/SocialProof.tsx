export function SocialProof() {
  const testimonials = [
    {
      quote: "FieldWork cut our documentation time from 4 hours to 20 minutes per site visit. The ROI was immediate.",
      name: "Sarah Chen",
      firm: "CHEN ARCHITECTURE"
    },
    {
      quote: "Finally, a tool that understands how we actually work. No forced workflows, no clunky interfaces—just results.",
      name: "Marcus Rodriguez",
      firm: "RODRIGUEZ CONSTRUCTION CO."
    },
    {
      quote: "Our clients love the clarity. Inspectors love the precision. We love not staying late to compile reports.",
      name: "Aisha Patel",
      firm: "PATEL & ASSOCIATES"
    }
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
            Trusted by professionals who build
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="border border-[#2b2b2b] bg-white p-8"
            >
              <blockquote
                className="mb-6 text-[#2b2b2b]"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                  fontStyle: 'normal'
                }}
              >
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-[#e0e0e0] pt-4">
                <p
                  className="text-[#2b2b2b]"
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="font-mono uppercase tracking-wider text-[#999]"
                  style={{
                    fontSize: '0.7rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {testimonial.firm}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}