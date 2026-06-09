import { useState } from "react";
import HabitCard from "./HabitCard";
import HabitModal from "./HabitModal";
import { CATEGORIES } from "../i18n";

export default function HabitList({
  habits,
  isCompletedToday,
  getStreak,
  getLongestStreak,
  onToggle,
  onAdd,
  onEdit,
  onDelete,
  t,
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? habits : habits.filter((h) => h.category === filter);

  function handleEdit(habit) {
    setEditingHabit(habit);
    setShowModal(true);
  }

  function handleSave(name, category) {
    if (editingHabit) {
      onEdit(editingHabit.id, name, category);
    } else {
      onAdd(name, category);
    }
    setEditingHabit(null);
  }

  function handleClose() {
    setShowModal(false);
    setEditingHabit(null);
  }

  return (
    <div className="habit-list-section">
      <div className="habit-list-header">
        <h2 className="section-title">{t.habits}</h2>
        <button className="btn btn-primary add-btn" onClick={() => setShowModal(true)}>
          <span>+</span> {t.addHabit}
        </button>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-chip${filter === "all" ? " active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t.all}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip${filter === cat ? " active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      {habits.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌱</div>
          <h3 className="empty-title">{t.noHabitsTitle}</h3>
          <p className="empty-desc">{t.noHabitsDesc}</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + {t.addHabit}
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state small">
          <p className="empty-desc">No habits in this category yet.</p>
        </div>
      ) : (
        <div className="habit-grid">
          {filtered.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={isCompletedToday(habit)}
              streak={getStreak(habit)}
              longestStreak={getLongestStreak(habit)}
              onToggle={onToggle}
              onEdit={handleEdit}
              onDelete={onDelete}
              t={t}
            />
          ))}
        </div>
      )}

      {showModal && (
        <HabitModal
          habit={editingHabit}
          onSave={handleSave}
          onClose={handleClose}
          t={t}
        />
      )}
    </div>
  );
}
