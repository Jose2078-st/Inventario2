export function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Updates', 'Security'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Compliance']
  };

  return (
    <footer className="bg-[#2b2b2b] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <h3
              className="mb-4 text-white"
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}
            >
              FieldWork
            </h3>
            <p
              className="mb-6 text-[#999]"
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                maxWidth: '320px'
              }}
            >
              Precision documentation for architects and contractors who build the future.
            </p>
            <p
              className="font-mono uppercase tracking-wider text-[#666]"
              style={{ fontSize: '0.7rem' }}
            >
              &copy; 2026 FieldWork Inc.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="mb-4 font-mono uppercase tracking-wider text-[#999]"
                style={{ fontSize: '0.75rem' }}
              >
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#ccc] transition-colors hover:text-white"
                      style={{
                        fontSize: '0.9rem',
                        textDecoration: 'none'
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#444] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p
              className="font-mono text-[#666]"
              style={{ fontSize: '0.75rem' }}
            >
              Built with precision. Designed for professionals.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-mono uppercase tracking-wider text-[#999] transition-colors hover:text-white"
                style={{ fontSize: '0.7rem' }}
              >
                Twitter
              </a>
              <a
                href="#"
                className="font-mono uppercase tracking-wider text-[#999] transition-colors hover:text-white"
                style={{ fontSize: '0.7rem' }}
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="font-mono uppercase tracking-wider text-[#999] transition-colors hover:text-white"
                style={{ fontSize: '0.7rem' }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}