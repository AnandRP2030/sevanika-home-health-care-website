import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, MessageCircle, Send, Zap } from 'lucide-react';
import styles from './QuickContact.module.css';

const FORMSPREE_URL = 'https://formspree.io/f/xqpaorqv';
const WHATSAPP_NUMBER = '917356610397';

type FormData = { name: string; email: string; phone: string };

export default function QuickContact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const buildWhatsAppMsg = (data: FormData) =>
    encodeURIComponent(
      `*SEVANIKA – Quick Contact*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email}`
    );

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'SEVANIKA – Quick Contact' }),
      });
      if (res.ok) {
        setStatus('success');
        setSubmittedData(data);
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="quick-contact" ref={ref} className={styles.section} aria-label="Quick contact form">
      <div className="container">
        <div className={styles.wrapper}>
          {/* Left info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Zap size={36} className={styles.zapIcon} />
            <h2 className={styles.infoTitle}>
              Quick<br />Get In Touch
            </h2>
            <p className={styles.infoDesc}>
              Leave your details and we'll reach out to you within a few hours.
              No lengthy forms — just your name, email and number.
            </p>
            <div className={styles.contactPoints}>
              <a href="tel:+917356610397" className={styles.contactItem} id="quick-call-link">
                📞 7356610397
              </a>
              <a href="mailto:sevanikahomehealthcare@gmail.com" className={styles.contactItem} id="quick-email-link">
                ✉️ sevanikahomehealthcare@gmail.com
              </a>
              <span className={styles.contactItem}>📍 Thiruvananthapuram, Kerala</span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I would like to know more about SEVANIKA Home Health Care Services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              id="quick-contact-whatsapp-btn"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right form */}
          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' && submittedData ? (
                <motion.div
                  key="success"
                  className="success-box"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="success-icon">✓</div>
                  <h3>Message Received!</h3>
                  <p>Thanks <strong>{submittedData.name}</strong>! We'll reach you soon at <strong>{submittedData.phone}</strong>.</p>
                  <div className="success-actions">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg(submittedData)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      id="quick-contact-whatsapp-confirm"
                    >
                      <MessageCircle size={16} />
                      Also send on WhatsApp
                    </a>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => { setStatus('idle'); setSubmittedData(null); }}
                    >
                      Send Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className={styles.form}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className={styles.formTitle}>Send a Quick Message</h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="qc-name">Full Name *</label>
                    <input
                      id="qc-name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="form-error"><AlertCircle size={12} />{errors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="qc-email">Email Address *</label>
                    <input
                      id="qc-email"
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your@email.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                    />
                    {errors.email && <span className="form-error"><AlertCircle size={12} />{errors.email.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="qc-phone">Phone Number *</label>
                    <input
                      id="qc-phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="Your mobile number"
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' },
                      })}
                    />
                    {errors.phone && <span className="form-error"><AlertCircle size={12} />{errors.phone.message}</span>}
                  </div>

                  {status === 'error' && (
                    <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'0.75rem',padding:'0.75rem',color:'#dc2626',fontSize:'0.875rem',marginBottom:'1rem' }}>
                      <AlertCircle size={16} />
                      Something went wrong. Please WhatsApp us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    id="quick-contact-submit"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {status === 'loading' ? (
                      <><span style={{display:'inline-block',width:'16px',height:'16px',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.6s linear infinite'}} />Sending...</>
                    ) : (
                      <><Send size={18} />Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
