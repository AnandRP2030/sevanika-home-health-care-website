import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, MessageCircle, Send, Briefcase } from 'lucide-react';
import styles from './Careers.module.css';

const FORMSPREE_URL = 'https://formspree.io/f/xqpaorqv';
const WHATSAPP_NUMBER = '917356610397';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  jobRole: string;
  experience: string;
  qualification: string;
  location: string;
  availability: string;
  languages: string;
  about: string;
};

const jobRoles = [
  'Caregiver',
  'Nursing Assistant',
  'Staff Nurse / RN',
  'Patient Care Staff',
  'Home Nurse',
  'Hospital Bystander',
  'Palliative Care Worker',
  'Mother & Baby Care Specialist',
  'Other',
];

const experienceLevels = [
  'Fresher (No experience)',
  '6 months – 1 year',
  '1 – 2 years',
  '2 – 5 years',
  '5+ years',
];

export default function Careers() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const buildWhatsAppMsg = (data: FormData) =>
    encodeURIComponent(
      `*SEVANIKA – Career Application*\n\n` +
      `👤 *Name:* ${data.fullName}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email}\n` +
      `💼 *Job Role:* ${data.jobRole}\n` +
      `📅 *Experience:* ${data.experience}\n` +
      `🎓 *Qualification:* ${data.qualification}\n` +
      `📍 *Location:* ${data.location}\n` +
      `🗓️ *Availability:* ${data.availability}\n` +
      `🗣️ *Languages:* ${data.languages}\n` +
      `📝 *About:* ${data.about}`
    );

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'SEVANIKA – Career Application' }),
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
    <section id="careers" ref={ref} className={styles.section} aria-label="Join our team – careers">
      <div className={styles.bgShape} aria-hidden="true" />
      <div className="container">
        <div className={styles.layout}>
          {/* Left info panel */}
          <motion.div
            className={styles.infoPanel}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Briefcase size={40} className={styles.briefcaseIcon} />
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.25)' }}>
              🌟 Join Our Team
            </span>
            <h2 className={styles.infoTitle}>Build Your Career with SEVANIKA</h2>
            <p className={styles.infoDesc}>
              We're looking for <strong>caring, responsible and dedicated</strong> Caregivers, Nursing Assistants, Nurses
              and Patient Care Staff to join our growing team.
            </p>
            <p className={styles.infoDesc}>
              We welcome both <strong>experienced professionals</strong> and passionate freshers who care deeply about
              helping patients and elderly people.
            </p>

            <div className={styles.perks}>
              {[
                { emoji: '💛', label: 'Meaningful work — make a real difference' },
                { emoji: '📈', label: 'Career growth opportunities' },
                { emoji: '🤝', label: 'Supportive, family-like team' },
                { emoji: '📍', label: 'Based in Thiruvananthapuram, Kerala' },
              ].map(p => (
                <div key={p.label} className={styles.perk}>
                  <span>{p.emoji}</span>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.contactInfo}>
              <p>📞 Staff Enquiry: <a href="tel:+917356610397">7356610397</a></p>
              <p>✉️ <a href="mailto:sevanikahomehealthcare@gmail.com">sevanikahomehealthcare@gmail.com</a></p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: 50 }}
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
                  <h3>Application Submitted!</h3>
                  <p>
                    Thank you, <strong>{submittedData.fullName}</strong>! We've received your application for{' '}
                    <strong>{submittedData.jobRole}</strong>. We'll be in touch at <strong>{submittedData.phone}</strong>.
                  </p>
                  <div className="success-actions">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg(submittedData)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      id="career-whatsapp-confirm"
                    >
                      <MessageCircle size={16} />
                      Also send via WhatsApp
                    </a>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => { setStatus('idle'); setSubmittedData(null); }}
                    >
                      Apply Again
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className={styles.formTitle}>Staff Registration Form</h3>

                  <div className="form-row">
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-name">Full Name *</label>
                      <input
                        id="career-name"
                        className={`form-input ${errors.fullName ? 'error' : ''}`}
                        placeholder="Your full name"
                        {...register('fullName', { required: 'Name is required' })}
                      />
                      {errors.fullName && <span className="form-error"><AlertCircle size={12} />{errors.fullName.message}</span>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-phone">Phone Number *</label>
                      <input
                        id="career-phone"
                        type="tel"
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="10-digit mobile number"
                        {...register('phone', {
                          required: 'Phone is required',
                          pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid number' },
                        })}
                      />
                      {errors.phone && <span className="form-error"><AlertCircle size={12} />{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    {/* Email */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-email">Email Address *</label>
                      <input
                        id="career-email"
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

                    {/* Job Role */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-role">Job Role Applying For *</label>
                      <select
                        id="career-role"
                        className={`form-input ${errors.jobRole ? 'error' : ''}`}
                        {...register('jobRole', { required: 'Please select a role' })}
                      >
                        <option value="">Select a role</option>
                        {jobRoles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      {errors.jobRole && <span className="form-error"><AlertCircle size={12} />{errors.jobRole.message}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    {/* Experience */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-exp">Work Experience *</label>
                      <select
                        id="career-exp"
                        className={`form-input ${errors.experience ? 'error' : ''}`}
                        {...register('experience', { required: 'Experience is required' })}
                      >
                        <option value="">Select experience level</option>
                        {experienceLevels.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                      {errors.experience && <span className="form-error"><AlertCircle size={12} />{errors.experience.message}</span>}
                    </div>

                    {/* Qualification */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-qualification">Qualification *</label>
                      <input
                        id="career-qualification"
                        className={`form-input ${errors.qualification ? 'error' : ''}`}
                        placeholder="e.g., GNM, ANM, BSc Nursing, 10th, 12th..."
                        {...register('qualification', { required: 'Qualification is required' })}
                      />
                      {errors.qualification && <span className="form-error"><AlertCircle size={12} />{errors.qualification.message}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    {/* Location */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-location">Current Location *</label>
                      <input
                        id="career-location"
                        className={`form-input ${errors.location ? 'error' : ''}`}
                        placeholder="Your city / area"
                        {...register('location', { required: 'Location is required' })}
                      />
                      {errors.location && <span className="form-error"><AlertCircle size={12} />{errors.location.message}</span>}
                    </div>

                    {/* Availability */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="career-availability">Availability *</label>
                      <select
                        id="career-availability"
                        className={`form-input ${errors.availability ? 'error' : ''}`}
                        {...register('availability', { required: 'Please select availability' })}
                      >
                        <option value="">Select availability</option>
                        <option value="Immediate">Immediately Available</option>
                        <option value="Within 1 week">Within 1 Week</option>
                        <option value="Within 1 month">Within 1 Month</option>
                        <option value="Part-time only">Part-time Only</option>
                        <option value="Full-time only">Full-time Only</option>
                        <option value="Day shift only">Day Shift Only</option>
                        <option value="Night shift only">Night Shift Only</option>
                      </select>
                      {errors.availability && <span className="form-error"><AlertCircle size={12} />{errors.availability.message}</span>}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="career-languages">Languages Known</label>
                    <input
                      id="career-languages"
                      className="form-input"
                      placeholder="e.g., Malayalam, English, Tamil..."
                      {...register('languages')}
                    />
                  </div>

                  {/* About yourself */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="career-about">Tell Us About Yourself</label>
                    <textarea
                      id="career-about"
                      className="form-input"
                      placeholder="Briefly share your passion for caregiving and any relevant experience or certifications..."
                      rows={3}
                      style={{ resize: 'vertical' }}
                      {...register('about')}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:'0.75rem',padding:'0.75rem',color:'#dc2626',fontSize:'0.875rem',marginBottom:'1rem' }}>
                      <AlertCircle size={16} />
                      Something went wrong. Please send via WhatsApp or call us.
                    </div>
                  )}

                  <div className={styles.formActions}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      id="career-form-submit"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <><span className={styles.spinner} />Submitting...</>
                      ) : (
                        <><Send size={18} />Submit Application</>
                      )}
                    </button>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I would like to join the SEVANIKA team as a caregiver. Please guide me.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      id="career-whatsapp-btn"
                    >
                      <MessageCircle size={18} />
                      WhatsApp Instead
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
