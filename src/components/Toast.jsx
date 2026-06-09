import { useEffect, useState } from "react";

export default function Toast({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    // Trigger enter animation on next tick
    const show = requestAnimationFrame(() => setVisible(true));
    const dismiss = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 5000);

    return () => {
      cancelAnimationFrame(show);
      clearTimeout(dismiss);
    };
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className={`toast${visible ? " toast-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-inner">
        <div className="toast-icon">🏆</div>
        <div className="toast-body">
          <p className="toast-habit">{toast.habitName}</p>
          {toast.loading ? (
            <div className="toast-loading">
              <span className="toast-dot" />
              <span className="toast-dot" />
              <span className="toast-dot" />
            </div>
          ) : (
            <p className="toast-message">{toast.message}</p>
          )}
        </div>
        <button
          className="toast-close"
          onClick={() => {
            setVisible(false);
            setTimeout(onDismiss, 300);
          }}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
