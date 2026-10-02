import { useInView } from 'react-intersection-observer';
import { motion, type Variants } from 'framer-motion';
import styles from './Services.module.css';

const services = [
  { emoji: '🕐', title: '24×7 Patient Care', desc: 'Round-the-clock caregiver services for continuous patient support and monitoring.', highlight: true },
  { emoji: '🏥', title: 'Hospital Bystander Nursing', desc: 'Professional bystander services at hospitals to support patients admitted for treatment.', highlight: false },
  { emoji: '🏠', title: 'Home Nursing Care', desc: 'Skilled nursing care delivered in the comfort of the patient\'s home by trained nurses.', highlight: false },
  { emoji: '👩‍⚕️', title: 'Nursing Assistant Services', desc: 'Qualified nursing assistants providing routine patient care and daily support.', highlight: false },
  { emoji: '👴', title: 'Elderly & Bedridden Care', desc: 'Specialised, respectful care for elderly and bedridden patients with full dignity.', highlight: true },
  { emoji: '🩹', title: 'Post-Surgical Care', desc: 'Expert care and monitoring during recovery after surgical procedures.', highlight: false },
  { emoji: '💙', title: 'Palliative & Supportive Care', desc: 'Compassionate supportive care focused on comfort, quality of life and family wellbeing.', highlight: false },
  { emoji: '🛁', title: 'Personal Care & Grooming', desc: 'Bathing, grooming and hygiene assistance performed with care and dignity.', highlight: false },
  { emoji: '👶', title: 'Mother & Baby Care', desc: 'Postnatal care for new mothers and newborns, helping families through the transition.', highlight: true },
  { emoji: '⏱️', title: 'Short & Long-Term Care', desc: 'Flexible care plans from short-term recovery support to long-term caregiver placement.', highlight: false },
  { emoji: '🧹', title: 'House Maid Services', desc: 'Reliable and trusted house maid services for household chores, cleaning and daily home management.', highlight: false },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
  }),
};

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="services" ref={ref} className={styles.services} aria-label="Our services">
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.decor1} />
        <div className={styles.decor2} />
      </div>
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            🌟 What We Offer
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our <span>Healthcare</span> Services
          </motion.h2>
          <div className="divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Comprehensive home and hospital care solutions tailored to every patient's needs —
            delivered with compassion, skill and dedication.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className={`${styles.card} ${s.highlight ? styles.highlighted : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={styles.cardEmoji}>{s.emoji}</div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              {s.highlight && (
                <span className={styles.popularBadge}>Popular</span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className={styles.ctaText}>Need a service not listed here? We're here to help.</p>
          <a href="#quick-contact" className="btn btn-primary btn-lg" id="services-contact-btn">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
