import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Clock, UserCheck, MapPin, Phone, Heart, Award } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: <Clock size={28} />,
    title: '24×7 Availability',
    desc: 'Our caregivers and support team are available round the clock, every day of the year.',
    color: '#0d9488',
  },
  {
    icon: <UserCheck size={28} />,
    title: 'Trained Professionals',
    desc: 'All caregivers are carefully screened, trained and verified for your peace of mind.',
    color: '#1e3a8a',
  },
  {
    icon: <Heart size={28} />,
    title: 'Personalised Care',
    desc: 'We create individualised care plans that respect each patient\'s needs and preferences.',
    color: '#dc2626',
  },
  {
    icon: <MapPin size={28} />,
    title: 'Local & Trusted',
    desc: 'Based in Thiruvananthapuram, Kerala — we understand the local needs of our community.',
    color: '#d97706',
  },
  {
    icon: <Award size={28} />,
    title: 'Dignity First',
    desc: 'Every interaction is guided by respect, empathy and the highest ethical standards.',
    color: '#7c3aed',
  },
  {
    icon: <Phone size={28} />,
    title: 'Always Reachable',
    desc: 'Direct communication with our team via WhatsApp, call or email at any time.',
    color: '#059669',
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="why-us" ref={ref} className={styles.section} aria-label="Why choose SEVANIKA">
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-badge"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            ⭐ Why SEVANIKA
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Why Families <span>Trust Us</span>
          </motion.h2>
          <div className="divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            At SEVANIKA, we focus on care, safety, dignity and trust —
            carefully matching each patient with the right caregiver.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className={styles.iconWrap} style={{ background: `${r.color}15`, color: r.color }}>
                {r.icon}
              </div>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardDesc}>{r.desc}</p>
              <div className={styles.accentLine} style={{ background: r.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
