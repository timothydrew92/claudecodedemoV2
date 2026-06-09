import { useState } from "react";
import { CATEGORY_COLORS } from "../i18n";

export default function HabitCard({ habit, isCompleted, streak, longestStreak, onToggle, onEdit, onDelete, t }) {
  const [confirmDel, setConfirmDel] = useState(false);
  const colors = CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.Productivity;

  function handleDelete() {
    if (confirmDel) {
      onDelete(habit.id);
    } else {
      setConfirmDel(true);
      setTimeout(() => setConfirmDel(false), 3000);
    }
  }

  return (
    <div className={`habit-card${isCompleted ? " completed" : ""}`}>
      <div className="habit-card-top">
        <div className="habit-info">
          <span
            className="habit-category-badge"
            style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
          >
            {t.categories[habit.category]}
          </span>
          <h3 className="habit-name">{habit.name}</h3>
        </div>
        <button
          className={`check-btn${isCompleted ? " done" : ""}`}
          onClick={() => onToggle(habit.id)}
          aria-label={isCompleted ? t.completed : t.complete}
        >
          {isCompleted ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="11" fill="#6366f1" />
              <path d="M6 11l3.5 3.5L16 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="10" stroke="#d1d5db" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      <div className="habit-card-bottom">
        <div className="streak-info">
          <div className="streak-item">
            <span className={`streak-flame${streak > 0 ? " active" : ""}`}>🔥</span>
            <div className="streak-text">
              <span className="streak-value">{streak}</span>
              <span className="streak-label">{t.currentStreak}</span>
            </div>
          </div>
          <div className="streak-divider" />
          <div className="streak-item">
            <span className="streak-star">⭐</span>
            <div className="streak-text">
              <span className="streak-value">{longestStreak}</span>
              <span className="streak-label">{t.longestStreak}</span>
            </div>
          </div>
        </div>
        <div className="habit-actions">
          <button
            className="action-btn edit"
            onClick={() => onEdit(habit)}
            aria-label={t.editHabit}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M10.5 2.5l2 2-8 8H2.5v-2l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`action-btn delete${confirmDel ? " confirm" : ""}`}
            onClick={handleDelete}
            aria-label={t.deleteHabit}
          >
            {confirmDel ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 4h9M6 4V3h3v1M5 4v7a1 1 0 001 1h3a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
