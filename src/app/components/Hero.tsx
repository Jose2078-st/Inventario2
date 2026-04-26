import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="border-b border-[#2b2b2b] px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: Headline */}
          <div className="flex flex-col justify-center">
            <h1
              className="mb-6 tracking-tight"
              style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
            >
              Turn site chaos into precise documentation
            </h1>
            <p
              className="mb-8 text-[#5a5a5a]"
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                letterSpacing: '0.01em'
              }}
            >
              FieldWork transforms scattered photos and notes into professional progress reports. Built for architects and contractors who demand precision.
            </p>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 bg-[#FF5733] px-8 py-4 transition-all hover:bg-[#e04d2d]"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: '#ffffff'
                }}
              >
                Start Free Trial
                <ArrowRight size={20} />
              </button>
              <span
                className="font-mono uppercase tracking-wider text-[#7a7a7a]"
                style={{ fontSize: '0.75rem' }}
              >
                No credit card required
              </span>
            </div>
          </div>

          {/* Right: Floating Browser Window */}
          <div className="flex items-center justify-center">
            <div
              className="w-full border border-[#2b2b2b] bg-white"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-[#e0e0e0] bg-[#f5f5f5] px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 border border-[#d0d0d0] bg-[#ff5f57]"></div>
                  <div className="h-3 w-3 border border-[#d0d0d0] bg-[#ffbd2e]"></div>
                  <div className="h-3 w-3 border border-[#d0d0d0] bg-[#28ca42]"></div>
                </div>
                <div className="ml-4 flex-1 border border-[#d0d0d0] bg-white px-3 py-1">
                  <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
                    fieldwork.app/reports
                  </span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-white p-8">
                <div className="mb-6 flex items-center justify-between border-b border-[#e0e0e0] pb-4">
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Progress Report</h3>
                    <p className="font-mono uppercase tracking-wider text-[#999]" style={{ fontSize: '0.7rem' }}>
                      Site 04 — Week 12
                    </p>
                  </div>
                  <div className="border border-[#2b2b2b] bg-[#FF5733] px-4 py-2">
                    <span className="font-mono text-white" style={{ fontSize: '0.75rem' }}>
                      EXPORT PDF
                    </span>
                  </div>
                </div>

                {/* Report Items */}
                <div className="space-y-4">
                  {[
                    { label: 'Foundation Pour', status: 'COMPLETE', color: '#28ca42' },
                    { label: 'Framing—South Wing', status: 'IN PROGRESS', color: '#FF5733' },
                    { label: 'Electrical Rough-In', status: 'SCHEDULED', color: '#999' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border border-[#e0e0e0] p-4">
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</span>
                      <span
                        className="font-mono px-3 py-1"
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: item.color,
                          color: '#ffffff'
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}