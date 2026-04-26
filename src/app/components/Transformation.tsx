import { ArrowRight, Image, StickyNote, CheckSquare } from 'lucide-react';

export function Transformation() {
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
            From scattered to structured
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* Left: Input (Messy) */}
          <div className="border border-[#2b2b2b] bg-[#fafafa] p-8">
            <div className="mb-4 flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <span
                className="font-mono uppercase tracking-wider text-[#999]"
                style={{ fontSize: '0.75rem' }}
              >
                Before
              </span>
              <span
                className="border border-[#e0e0e0] bg-white px-2 py-1 font-mono text-[#999]"
                style={{ fontSize: '0.7rem' }}
              >
                UNORGANIZED
              </span>
            </div>

            {/* Scattered items */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 border border-[#d0d0d0] bg-white p-3 opacity-80">
                <Image size={20} className="text-[#999]" />
                <div className="flex-1">
                  <p className="font-mono text-[#666]" style={{ fontSize: '0.8rem' }}>
                    IMG_4521.jpg
                  </p>
                  <p className="text-[#999]" style={{ fontSize: '0.75rem' }}>
                    Foundation pour—blurry angle
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-[#d0d0d0] bg-white p-3 opacity-70" style={{ transform: 'rotate(-1deg)' }}>
                <StickyNote size={20} className="text-[#999]" />
                <div className="flex-1">
                  <p className="text-[#666]" style={{ fontSize: '0.85rem' }}>
                    "Check w/ foreman re: rebar spacing"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-[#d0d0d0] bg-white p-3 opacity-90" style={{ transform: 'rotate(1.5deg)' }}>
                <Image size={20} className="text-[#999]" />
                <div className="flex-1">
                  <p className="font-mono text-[#666]" style={{ fontSize: '0.8rem' }}>
                    IMG_4522.jpg
                  </p>
                  <p className="text-[#999]" style={{ fontSize: '0.75rem' }}>
                    Close-up—no context
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-[#d0d0d0] bg-white p-3 opacity-60" style={{ transform: 'rotate(-0.5deg)' }}>
                <StickyNote size={20} className="text-[#999]" />
                <div className="flex-1">
                  <p className="text-[#666]" style={{ fontSize: '0.85rem' }}>
                    "Weather delay Tuesday"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Arrow */}
          <div className="flex justify-center md:block">
            <ArrowRight size={40} className="text-[#FF5733]" strokeWidth={2} />
          </div>

          {/* Right: Output (Clean) */}
          <div className="border border-[#2b2b2b] bg-white p-8">
            <div className="mb-4 flex items-center justify-between border-b border-[#2b2b2b] pb-3">
              <span
                className="font-mono uppercase tracking-wider text-[#2b2b2b]"
                style={{ fontSize: '0.75rem', fontWeight: 600 }}
              >
                After
              </span>
              <span
                className="border border-[#2b2b2b] bg-[#FF5733] px-2 py-1 font-mono text-white"
                style={{ fontSize: '0.7rem' }}
              >
                REPORT-READY
              </span>
            </div>

            {/* Organized report sections */}
            <div className="space-y-4">
              <div className="border-l-4 border-[#28ca42] bg-[#fafafa] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckSquare size={16} className="text-[#28ca42]" />
                  <span className="font-mono uppercase" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                    Foundation Pour — Complete
                  </span>
                </div>
                <p className="text-[#5a5a5a]" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                  4 photos catalogued, timestamp verified, geo-tagged. Weather conditions noted.
                </p>
              </div>

              <div className="border-l-4 border-[#FF5733] bg-[#fafafa] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckSquare size={16} className="text-[#FF5733]" />
                  <span className="font-mono uppercase" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                    Action Item — Rebar Inspection
                  </span>
                </div>
                <p className="text-[#5a5a5a]" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                  Flagged for foreman review. Linked to relevant photos and code references.
                </p>
              </div>

              <div className="border-l-4 border-[#999] bg-[#fafafa] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckSquare size={16} className="text-[#999]" />
                  <span className="font-mono uppercase" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                    Schedule Update — Weather Delay
                  </span>
                </div>
                <p className="text-[#5a5a5a]" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                  Automatically logged to project timeline. Stakeholders notified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}