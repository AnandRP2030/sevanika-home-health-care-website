import { useInView } from 'react-intersection-observer';
import { motion, type Variants } from 'framer-motion';
import { Target, Heart, Shield } from 'lucide-react';
import styles from './About.module.css';

const pillars = [
  { icon: <Heart size={22} />, label: 'Compassion', desc: 'Every patient is treated with warmth, dignity and individual attention.' },
  { icon: <Shield size={22} />, label: 'Trust & Safety', desc: 'Trained, verified caregivers who prioritise patient safety above all.' },
  { icon: <Target size={22} />, label: 'Quality Care', desc: "Personalised plans tailored to each patient's unique needs and goals." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" ref={ref} className={styles.about} aria-label="About SEVANIKA">
      <div className={styles.waveBg} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          {/* Left image / visual */}
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageWrap}>
              <img src="/logo.jpg" alt="SEVANIKA brand" className={styles.logoLarge} />
              <div className={styles.ringAnim} aria-hidden="true" />
            </div>
            <div className={styles.missionBox}>
              <p className={styles.missionQuote}>
                "Because your loved ones deserve compassionate care."
              </p>
            </div>
          </motion.div>

          {/* Right text */}
          <div className={styles.text}>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <span className="section-badge">🏥 Our Mission</span>
              <h2 className="section-title">
                Dedicated to <span>Compassionate</span> Home Healthcare
              </h2>
              <p className={styles.description}>
                SEVANIKA Home Health Care Services is a trusted home healthcare support service dedicated to providing
                <strong> compassionate, reliable and professional care</strong> for patients and families across Thiruvananthapuram, Kerala.
              </p>
              <p className={styles.description}>
                We understand that every patient needs individual attention, comfort and dignity. Our goal is to make quality care
                available at home and in hospitals through trained and responsible caregivers.
              </p>
            </motion.div>

            {/* Pillars */}
            <div className={styles.pillars}>
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  className={styles.pillar}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  <div className={styles.pillarIcon}>{p.icon}</div>
                  <div>
                    <h3 className={styles.pillarLabel}>{p.label}</h3>
                    <p className={styles.pillarDesc}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <a href="#patient-form" className="btn btn-primary" id="about-cta-btn">
                Request a Caregiver
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
