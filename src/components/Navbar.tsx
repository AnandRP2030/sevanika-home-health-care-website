import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Patient Care', href: '#patient-form' },
  { label: 'Contact', href: '#quick-contact' },
  { label: 'Careers', href: '#careers' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setIsOpen(false);
    // Use setTimeout to let the drawer close animation finish before scrolling.
    // scrollIntoView is unreliable on Android browsers — window.scrollTo is more robust.
    setTimeout(() => {
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      const navbarHeight = 70; // fixed navbar height in px
      const top = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 50);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#home" className={styles.logo} onClick={() => handleNav('#home')} aria-label="SEVANIKA Home">
          <img src="/logo.jpg" alt="SEVANIKA Logo" className={styles.logoImg} />
          <div className={styles.logoText}>
            <span className={styles.logoName}>SEVANIKA</span>
            <span className={styles.logoTagline}>Home Health Care</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links} role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <button
                role="menuitem"
                className={`${styles.link} ${active === link.href ? styles.active : ''}`}
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="tel:+917356610397"
          className={`btn btn-primary btn-sm ${styles.cta}`}
          id="navbar-call-btn"
          aria-label="Call us now"
        >
          <Phone size={14} />
          Call Now
        </a>

        {/* Mobile Toggle */}
        <button
          className={styles.burger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          id="navbar-menu-toggle"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul role="menu">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  role="none"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    role="menuitem"
                    className={styles.drawerLink}
                    onClick={() => handleNav(link.href)}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li>
                <a href="tel:+917356610397" className={`btn btn-primary ${styles.drawerCta}`}>
                  <Phone size={16} /> Call Now: 7356610397
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
