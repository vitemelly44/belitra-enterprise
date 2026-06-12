export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A18] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="font-['Space_Grotesk'] font-bold text-xl text-[#F5F5F0] mb-4 block"
            >
              Belitra
            </button>
            <p className="text-sm text-[#F5F5F0]/50 leading-relaxed max-w-xs">
              Building Kenya&apos;s future with quality construction services
              and materials since 2009.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Space_Grotesk'] font-medium text-sm text-[#F5F5F0] mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About Us', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Contact', id: 'cta' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-[#F5F5F0]/50 hover:text-[#F5F5F0] transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Space_Grotesk'] font-medium text-sm text-[#F5F5F0] mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'Building Construction',
                'Civil Engineering',
                'Construction Materials',
                'Renovation & Remodeling',
                'Road Works',
                'Material Supply',
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-[#F5F5F0]/50">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-['Space_Grotesk'] font-medium text-sm text-[#F5F5F0] mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#F5F5F0]/30 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-[#F5F5F0]/50">
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#F5F5F0]/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-[#F5F5F0]/50">
                  info@belitraenterprises.co.ke
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#F5F5F0]/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-[#F5F5F0]/50">
                  +254 700 000 000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#F5F5F0]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#F5F5F0]/30">
              &copy; {new Date().getFullYear()} Belitra Enterprises Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-[#F5F5F0]/30 hover:text-[#F5F5F0]/60 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-[#F5F5F0]/30 hover:text-[#F5F5F0]/60 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
