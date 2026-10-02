import { Heart, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Patient Care', href: '#patient-form' },
  { label: 'Contact', href: '#quick-contact' },
  { label: 'Careers', href: '#careers' },
];

const services = [
  '24×7 Patient Care',
  'Hospital Bystander Nursing',
  'Home Nursing Care',
  'Elderly & Bedridden Care',
  'Post-Surgical Care',
  'Mother & Baby Care',
  'Palliative Care',
  'Personal Care & Grooming',
  'House Maid Services',
];

const WHATSAPP_NUMBER = '917356610397';
const WHATSAPP_MSG = encodeURIComponent('Hi! I would like to know more about SEVANIKA Home Health Care Services.');

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Wave top */}
      <div className={styles.waveTop} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        {/* Brand col */}
        <div className={styles.brand}>
          <img src="/logo.jpg" alt="SEVANIKA Logo" className={styles.logo} />
          <h2 className={styles.brandName}>SEVANIKA</h2>
          <p className={styles.brandTagline}>Home Health Care Services</p>
          <p className={styles.brandDesc}>
            Caring Hands, Trusted Healthcare. Providing compassionate, reliable and professional
            home health care across Thiruvananthapuram, Kerala.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-whatsapp btn-sm ${styles.waBtn}`}
            id="footer-whatsapp-btn"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Quick Links</h3>
          <ul className={styles.list}>
            {navLinks.map(l => (
              <li key={l.href}>
                <button
                  className={styles.listLink}
                  onClick={() => scrollToSection(l.href)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Our Services</h3>
          <ul className={styles.list}>
            {services.map(s => (
              <li key={s}><span className={styles.serviceItem}>• {s}</span></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact Us</h3>
          <div className={styles.contactList}>
            <a href="tel:+917356610397" className={styles.contactItem} id="footer-call-link">
              <Phone size={16} />
              7356610397
            </a>
            <a href="mailto:sevanikahomehealthcare@gmail.com" className={styles.contactItem} id="footer-email-link">
              <Mail size={16} />
              sevanikahomehealthcare@gmail.com
            </a>
            <span className={styles.contactItem}>
              <MapPin size={16} />
              Thiruvananthapuram, Kerala
            </span>
          </div>
          <div className={styles.hours}>
            <h4 className={styles.hoursTitle}>Working Hours</h4>
            <p>24 × 7 — Always Available</p>
            <p>Including Sundays & Public Holidays</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} SEVANIKA Home Health Care Services. All rights reserved.
            </p>
            <p className={styles.madeWith}>
              Made with <Heart size={14} className={styles.heartIcon} /> for compassionate care
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
