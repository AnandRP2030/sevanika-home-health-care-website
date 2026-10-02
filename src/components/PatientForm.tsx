import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, AlertCircle, MessageCircle, Send } from 'lucide-react';
import styles from './PatientForm.module.css';

const FORMSPREE_URL = 'https://formspree.io/f/xqpaorqv';
const WHATSAPP_NUMBER = '917356610397';

type FormData = {
  name: string;
  phone: string;
  email: string;
  patientName: string;
  location: string;
  careType: string;
  duration: string;
  condition: string;
  startDate: string;
  additionalInfo: string;
};

const careTypes = [
  'Home Nursing Care',
  'Hospital Bystander',
  'Elderly / Bedridden Care',
  'Post-Surgical Care',
  'Palliative Care',
  'Mother & Baby Care',
  'Personal Care & Grooming',
  'Short-Term Care',
  'Long-Term Care',
  'Other',
];

export default function PatientForm() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const buildWhatsAppMsg = (data: FormData) => {
    return encodeURIComponent(
      `*SEVANIKA – Patient Care Request*\n\n` +
      `👤 *Contact Name:* ${data.name}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email}\n` +
      `🧑 *Patient Name:* ${data.patientName}\n` +
      `📍 *Location:* ${data.location}\n` +
      `🏥 *Care Type:* ${data.careType}\n` +
      `⏱️ *Duration:* ${data.duration}\n` +
      `📋 *Condition:* ${data.condition}\n` +
      `📅 *Start Date:* ${data.startDate}\n` +
      `💬 *Additional Info:* ${data.additionalInfo || 'N/A'}`
    );
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'SEVANIKA – Patient Care Request' }),
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
    <section id="patient-form" ref={ref} className={styles.section} aria-label="Patient care request form">
      <div className={styles.bgGradient} aria-hidden="true" />
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-badge"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            🏥 Request Care
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Need a <span>Caregiver?</span>
          </motion.h2>
          <div className="divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Fill the form below and our team will get back to you shortly to arrange the right caregiver for your loved one.
          </motion.p>
        </div>

        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                <h3>Request Received!</h3>
                <p>
                  Thank you, <strong>{submittedData.name}</strong>! We've received your care request and will contact you at{' '}
                  <strong>{submittedData.phone}</strong> shortly.
                </p>
                <div className="success-actions">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg(submittedData)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    id="patient-form-whatsapp-btn"
                  >
                    <MessageCircle size={18} />
                    Send via WhatsApp too
                  </a>
                  <button
                    className="btn btn-secondary"
                    onClick={() => { setStatus('idle'); setSubmittedData(null); }}
                    id="patient-form-another-btn"
                  >
                    Submit Another
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
                exit={{ opacity: 0 }}
              >
                <div className={styles.formGrid}>
                  {/* Contact Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-contact-name">Your Name *</label>
                    <input
                      id="patient-contact-name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="form-error"><AlertCircle size={12} />{errors.name.message}</span>}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-phone">Phone Number *</label>
                    <input
                      id="patient-phone"
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

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-email">Email Address</label>
                    <input
                      id="patient-email"
                      type="email"
                      className="form-input"
                      placeholder="your@email.com (optional)"
                      {...register('email')}
                    />
                  </div>

                  {/* Patient Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-name">Patient Name *</label>
                    <input
                      id="patient-name"
                      className={`form-input ${errors.patientName ? 'error' : ''}`}
                      placeholder="Patient's full name"
                      {...register('patientName', { required: 'Patient name is required' })}
                    />
                    {errors.patientName && <span className="form-error"><AlertCircle size={12} />{errors.patientName.message}</span>}
                  </div>

                  {/* Location */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-location">Location / Area *</label>
                    <input
                      id="patient-location"
                      className={`form-input ${errors.location ? 'error' : ''}`}
                      placeholder="e.g., Kazhakuttom, Trivandrum"
                      {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && <span className="form-error"><AlertCircle size={12} />{errors.location.message}</span>}
                  </div>

                  {/* Care Type */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-care-type">Type of Care Needed *</label>
                    <select
                      id="patient-care-type"
                      className={`form-input ${errors.careType ? 'error' : ''}`}
                      {...register('careType', { required: 'Please select care type' })}
                    >
                      <option value="">Select care type</option>
                      {careTypes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.careType && <span className="form-error"><AlertCircle size={12} />{errors.careType.message}</span>}
                  </div>

                  {/* Duration */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-duration">Care Duration *</label>
                    <select
                      id="patient-duration"
                      className={`form-input ${errors.duration ? 'error' : ''}`}
                      {...register('duration', { required: 'Please select duration' })}
                    >
                      <option value="">Select duration</option>
                      <option value="1-3 days">1–3 Days</option>
                      <option value="1 week">About 1 Week</option>
                      <option value="2-4 weeks">2–4 Weeks</option>
                      <option value="1-3 months">1–3 Months</option>
                      <option value="Long-term (3+ months)">Long-term (3+ months)</option>
                    </select>
                    {errors.duration && <span className="form-error"><AlertCircle size={12} />{errors.duration.message}</span>}
                  </div>

                  {/* Start Date */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="patient-start-date">Preferred Start Date *</label>
                    <input
                      id="patient-start-date"
                      type="date"
                      className={`form-input ${errors.startDate ? 'error' : ''}`}
                      {...register('startDate', { required: 'Please select a start date' })}
                    />
                    {errors.startDate && <span className="form-error"><AlertCircle size={12} />{errors.startDate.message}</span>}
                  </div>
                </div>

                {/* Condition - full width */}
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-condition">Patient's Condition / Diagnosis *</label>
                  <textarea
                    id="patient-condition"
                    className={`form-input ${errors.condition ? 'error' : ''}`}
                    placeholder="Briefly describe the patient's medical condition or diagnosis..."
                    rows={3}
                    style={{ resize: 'vertical' }}
                    {...register('condition', { required: 'Please describe the patient\'s condition' })}
                  />
                  {errors.condition && <span className="form-error"><AlertCircle size={12} />{errors.condition.message}</span>}
                </div>

                {/* Additional Info */}
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-additional">Additional Information</label>
                  <textarea
                    id="patient-additional"
                    className="form-input"
                    placeholder="Any special requirements, preferences, or questions..."
                    rows={2}
                    style={{ resize: 'vertical' }}
                    {...register('additionalInfo')}
                  />
                </div>

                {status === 'error' && (
                  <div className={styles.errorMsg}>
                    <AlertCircle size={16} />
                    Something went wrong. Please try WhatsApp below or call us directly.
                  </div>
                )}

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    id="patient-form-submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <><span className={styles.spinner} />Submitting...</>
                    ) : (
                      <><Send size={18} />Submit Request</>
                    )}
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I need home health care assistance from SEVANIKA. Please help me.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    id="patient-form-whatsapp-direct"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Us
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
