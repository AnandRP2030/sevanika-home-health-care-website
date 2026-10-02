import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import styles from './WhatsAppFAB.module.css';

const WHATSAPP_NUMBER = '917356610397';
const WHATSAPP_MSG = encodeURIComponent('Hi! I would like to know more about SEVANIKA Home Health Care Services.');

export default function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.fabContainer} role="complementary" aria-label="WhatsApp chat">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className={styles.closeTooltip}
              onClick={() => setShowTooltip(false)}
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
            <p className={styles.tooltipTitle}>Chat with us on WhatsApp!</p>
            <p className={styles.tooltipDesc}>
              Hi there 👋 How can we help you with home health care today?
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tooltipBtn}
              id="fab-whatsapp-start-chat"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fab}
        aria-label="Chat on WhatsApp with SEVANIKA"
        id="whatsapp-fab-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(false)}
      >
        {/* Pulse rings */}
        <span className={styles.ring1} aria-hidden="true" />
        <span className={styles.ring2} aria-hidden="true" />

        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}
