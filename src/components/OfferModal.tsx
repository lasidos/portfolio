import { useCallback, useEffect, useState } from 'react';
import type { Translation } from '../i18n/types';
import './OfferModal.css';

const MIN_AMOUNT = 700;

interface OfferModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  t: Translation['profile'];
}

export function OfferModal({ open, onClose, email, t }: OfferModalProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [amount, setAmount] = useState('');
  const [touchedAmount, setTouchedAmount] = useState(false);

  const amountNum = amount === '' ? null : Number(amount);
  const amountInvalid = amountNum !== null && amountNum <= MIN_AMOUNT;

  const reset = useCallback(() => {
    setSubject('');
    setBody('');
    setAmount('');
    setTouchedAmount(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (amountInvalid) return;
      const lines: string[] = [];
      if (subject) lines.push(`[제목] ${subject}`);
      lines.push('');
      if (body) lines.push(body);
      if (amount) lines.push('', `[제안금액] ${amount}만원`);
      const mailBody = lines.join('\n');
      const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject || t.offerModalTitle)}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailto;
      handleClose();
    },
    [email, subject, body, amount, amountInvalid, handleClose, t]
  );

  if (!open) return null;

  return (
    <div className="offer-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="offer-modal-title">
      <div className="offer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="offer-header">
          <h2 id="offer-modal-title" className="offer-title">
            {t.offerModalTitle}
          </h2>
          <button type="button" className="offer-close" onClick={handleClose} aria-label={t.offerClose}>
            ×
          </button>
        </div>
        <form className="offer-form" onSubmit={handleSubmit}>
          <label className="offer-label">
            {t.offerSubject}
            <input
              type="text"
              className="offer-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t.offerSubjectPlaceholder}
            />
          </label>
          <label className="offer-label">
            {t.offerBody}
            <textarea
              className="offer-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={t.offerBodyPlaceholder}
              rows={4}
            />
          </label>
          <label className="offer-label">
            {t.offerAmount}
            <input
              type="number"
              className={`offer-input ${amountInvalid ? 'offer-input--error' : ''}`}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setTouchedAmount(true);
              }}
              onBlur={() => setTouchedAmount(true)}
              placeholder={t.offerAmountPlaceholder}
              min={0}
              step={1}
            />
            {touchedAmount && amountInvalid && <p className="offer-error">{t.offerAmountError}</p>}
          </label>
          <div className="offer-actions">
            <button type="button" className="offer-btn offer-btn--secondary" onClick={handleClose}>
              {t.offerClose}
            </button>
            <button type="submit" className="offer-btn offer-btn--primary" disabled={amountInvalid}>
              {t.offerSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
