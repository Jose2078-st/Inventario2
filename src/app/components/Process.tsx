import { Camera, FileText, FileCheck } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: Camera,
      number: '01',
      title: 'Capture on Site',
      description: 'Take photos and voice notes directly from the field. No special equipment needed.'
    },
    {
      icon: FileText,
      number: '02',
      title: 'AI Processing',
      description: 'FieldWork automatically organizes, timestamps, and categorizes your documentation.'
    },
    {
      icon: FileCheck,
      number: '03',
      title: 'Export Report',
      description: 'Generate professional PDFs ready for clients, inspectors, or project archives.'
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
            Three steps. Zero friction.
          </h2>
          <p
            className="mx-auto max-w-2xl text-[#5a5a5a]"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6
            }}
          >
            Documentation that fits into your existing workflow—not the other way around.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="border border-[#2b2b2b] bg-white p-8 transition-all hover:border-[#FF5733]"
            >
              <div className="mb-6 flex items-start justify-between">
                <step.icon size={48} strokeWidth={1.5} className="text-[#2b2b2b]" />
                <span
                  className="font-mono text-[#d0d0d0]"
                  style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    lineHeight: 1
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '-0.01em'
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-[#5a5a5a]"
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}