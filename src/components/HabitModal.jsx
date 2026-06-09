import { useState, useEffect } from "react";
import { CATEGORIES, CATEGORY_COLORS } from "../i18n";

export default function HabitModal({ habit, onSave, onClose, t }) {
  const [name, setName] = useState(habit?.name || "");
  const [category, setCategory] = useState(habit?.category || CATEGORIES[0]);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), category);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{habit ? t.editHabit : t.addHabit}</h2>
          <button className="modal-close" onClick={onClose} aria-label={t.cancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">{t.habitName}</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.enterHabitName}
              autoFocus
              maxLength={60}
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t.category}</label>
            <div className="category-grid">
              {CATEGORIES.map((cat) => {
                const colors = CATEGORY_COLORS[cat];
                const selected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-chip${selected ? " selected" : ""}`}
                    style={
                      selected
                        ? { background: colors.bg, color: colors.text, borderColor: colors.border }
                        : {}
                    }
                    onClick={() => setCategory(cat)}
                  >
                    {t.categories[cat]}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
