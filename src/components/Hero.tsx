import { motion } from 'framer-motion';
import { Phone, MessageCircle, ChevronDown, Heart } from 'lucide-react';
import styles from './Hero.module.css';

const WHATSAPP_NUMBER = '917356610397';
const WHATSAPP_MSG = encodeURIComponent('Hi! I would like to know more about SEVANIKA Home Health Care Services.');

export default function Hero() {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={styles.hero} aria-label="Hero section">
      {/* Background */}
      <div className={styles.heroBg}>
        <img src="/hero-bg.jpg" alt="SEVANIKA caregiver with patient" className={styles.heroBgImg} />
        <div className={styles.heroBgOverlay} />
      </div>

      {/* Animated blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.textSide}>
          {/* Badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={14} className="animate-heartbeat" />
            Thiruvananthapuram, Kerala
          </motion.div>

          {/* Headline */}
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className={styles.headlineMain}>SEVANIKA</span>
            <span className={styles.headlineSub}>Home Health Care</span>
            <span className={styles.headlineTagline}>Caring Hands,<br />Trusted Healthcare</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Compassionate, reliable and professional care for patients and families —
            right in the comfort of your home. Available <strong>24×7</strong> with trained caregivers.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {[
              { value: '24×7', label: 'Available' },
              { value: '10+', label: 'Services' },
              { value: '100%', label: 'Dedicated' },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              id="hero-whatsapp-btn"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
            <a
              href="tel:+917356610397"
              className="btn btn-secondary btn-lg"
              id="hero-call-btn"
              aria-label="Call us now"
            >
              <Phone size={20} />
              Call: 7356610397
            </a>
          </motion.div>
        </div>

        {/* Right visual card */}
        <motion.div
          className={styles.visualSide}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div className={styles.floatingCard}>
            <div className={styles.cardIconRow}>
              <div className={`${styles.cardIcon} ${styles.iconTeal}`}>🏥</div>
              <div className={`${styles.cardIcon} ${styles.iconGold}`}>💛</div>
            </div>
            <h2 className={styles.cardTitle}>Trusted Home Care</h2>
            <p className={styles.cardDesc}>
              From hospital bystander services to home nursing — we provide dignified, personalised care for every patient.
            </p>
            <div className={styles.serviceChips}>
              {['Home Nursing', 'Elder Care', 'Post-Surgery', 'Mother & Baby'].map(s => (
                <span key={s} className={styles.chip}>{s}</span>
              ))}
            </div>
            <div className={styles.availBadge}>
              <span className={styles.dot} />
              Available 24×7
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <button
        className={styles.scrollDown}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        id="hero-scroll-down"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
