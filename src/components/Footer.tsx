
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Code2,
} from 'lucide-react'

import { P } from '../data/portfolio'
import { go } from '../lib/scroll'

const socialLinks = [
  {
    Icon: Github,
    label: 'GitHub',
    href: P.links.github,
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    href: P.links.linkedin,
  },
  {
    Icon: Mail,
    label: 'Email',
    href: `mailto:${P.links.email}`,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[.08] px-5 py-12 sm:px-8">

      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-electric/[.06] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">

        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          {/* Brand */}
          <div className="space-y-3">

            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                go('home')
              }}
              className="inline-flex items-center gap-2 font-display text-lg font-semibold text-white transition hover:opacity-80"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon/20 bg-neon/10 text-neon">
                <Code2 size={17} />
              </span>

              Abhishek Kumar
              <span className="text-neon">.</span>
            </a>

            <p className="text-sm text-white/45">
              Full Stack Developer | MERN Stack Developer
            </p>

            <p className="text-xs text-white/30">
              Building the future, one line of code at a time.
            </p>

          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">

            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                aria-label={label}
                title={label}
                href={href}
                {...(
                  href.startsWith('http')
                    ? {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {}
                )}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[.03] text-white/55 transition-all duration-300 hover:-translate-y-1 hover:border-neon/50 hover:bg-neon/10 hover:text-neon hover:shadow-[0_0_20px_rgba(34,228,255,0.12)]"
              >
                <Icon
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            ))}

            {/* Back To Top */}
            <button
              type="button"
              aria-label="Back to top"
              title="Back to top"
              onClick={() => go('home')}
              className="ml-2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-electric to-neon text-ink shadow-[0_0_20px_rgba(34,228,255,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(34,228,255,0.4)]"
            >
              <ArrowUp size={19} />
            </button>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[.08] pt-6 text-center sm:flex-row">

          <p className="text-xs text-white/35">
            © {currentYear} Abhishek Kumar. All rights reserved.
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Designed with <span className="text-neon">♥</span> & Built with React
          </p>

        </div>

      </div>
    </footer>
  )
}
