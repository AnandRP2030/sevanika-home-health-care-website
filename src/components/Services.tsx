import { useInView } from 'react-intersection-observer';
import { motion, type Variants } from 'framer-motion';
import styles from './Services.module.css';

const services = [
  { emoji: '🕐', title: '24×7 Patient Care', desc: 'Round-the-clock caregiver services for continuous patient support and monitoring.', highlight: true },
  { emoji: '👴', title: 'Elderly Care & Senior Companionship', desc: 'Compassionate care and meaningful companionship for elderly individuals, ensuring comfort, dignity and a better quality of life.', highlight: false },
  { emoji: '🏥', title: 'Hospital & Home Bystander Services', desc: 'Dedicated bystander support for patients admitted to hospitals or recovering at home, providing round-the-clock assistance.', highlight: false },
  { emoji: '🛁', title: 'Personal Care & Hygiene Assistance', desc: 'Respectful assistance with bathing, grooming and daily hygiene routines, helping patients maintain cleanliness and dignity.', highlight: false },
  { emoji: '🩹', title: 'Post-Surgical Recovery Support', desc: 'Expert care and close monitoring during the critical recovery period following surgical procedures.', highlight: false },
  { emoji: '🚗', title: 'Doctor Visit & Medical Escort Services', desc: 'Reliable escort and accompaniment for patients during doctor visits, hospital appointments and medical consultations.', highlight: false },
  { emoji: '💊', title: 'Feeding & Medication Reminders', desc: 'Timely reminders and assistance with meals and medication schedules to ensure patients stay on track with their care plan.', highlight: false },
  { emoji: '👶', title: 'Mother & Baby Care', desc: 'Postnatal care for new mothers and newborns, helping families through the transition with professional support and reassurance.', highlight: true },
  { emoji: '🧠', title: 'Dementia & Memory Care Support', desc: 'Specialised care for individuals living with dementia and memory-related conditions, delivered with patience and empathy.', highlight: false },
  { emoji: '🌏', title: 'NRI Elder Care & Routine Welfare Checks', desc: 'Regular welfare visits and care coordination for elderly parents of NRIs, providing peace of mind across distances.', highlight: false },
  { emoji: '🌙', title: 'Night Care & Emergency Bystander Support', desc: 'Overnight care and rapid emergency bystander support to ensure patient safety throughout the night.', highlight: false },
  { emoji: '♿', title: 'Differently-Abled Support Services', desc: 'Personalised assistance and daily support services for individuals with physical or developmental disabilities.', highlight: false },
  { emoji: '🧹', title: 'Home Cleaning & Housekeeping Services', desc: 'Professional home cleaning and housekeeping to maintain a hygienic, tidy and comfortable living environment.', highlight: false },
  { emoji: '🍳', title: 'House Maid & Cooking Assistance', desc: 'Reliable house maid services combined with cooking assistance, ensuring a well-managed and nourishing home.', highlight: false },
  { emoji: '⏱️', title: 'Short-Term & Long-Term Caregiver Placement', desc: 'Flexible caregiver placement options — from short-term recovery support to long-term dedicated care arrangements.', highlight: false },
  { emoji: '👩‍⚕️', title: 'Nursing Assistant & Home Health Aide Services', desc: 'Qualified nursing assistants and home health aides providing skilled routine care and daily patient support at home.', highlight: true },
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
