import { useState, useCallback } from "react";
import { translations } from "./i18n";
import { useHabits } from "./useHabits";
import { getMotivation } from "./lib/getMotivation";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import HabitList from "./components/HabitList";
import Toast from "./components/Toast";
import "./App.css";

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("daily-wins-lang") || "en");
  const t = translations[lang];
  const [toast, setToast] = useState(null);

  function handleSetLang(code) {
    setLang(code);
    localStorage.setItem("daily-wins-lang", code);
  }

  const {
    habits,
    addHabit,
    editHabit,
    deleteHabit,
    toggleComplete,
    isCompletedToday,
    getStreak,
    getLongestStreak,
    todayCount,
    activeStreakCount,
    bestStreak,
  } = useHabits();

  const handleToggle = useCallback(
    async (id) => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return;

      const wasCompleted = isCompletedToday(habit);
      toggleComplete(id);

      // Only show toast when marking complete, not when unchecking
      if (wasCompleted) return;

      const currentStreak = getStreak(habit) + 1; // +1 because the toggle hasn't re-rendered yet

      // Show loading toast immediately
      setToast({ habitName: habit.name, message: "", loading: true });

      try {
        const message = await getMotivation(habit.name, currentStreak);
        setToast({ habitName: habit.name, message, loading: false });
      } catch {
        // Silently dismiss on API error — don't interrupt the UX
        setToast(null);
      }
    },
    [habits, isCompletedToday, toggleComplete, getStreak]
  );

  return (
    <div className="app">
      <Header lang={lang} setLang={handleSetLang} t={t} />
      <main className="main">
        <Dashboard
          habits={habits}
          todayCount={todayCount}
          activeStreakCount={activeStreakCount}
          bestStreak={bestStreak}
          t={t}
        />
        <HabitList
          habits={habits}
          isCompletedToday={isCompletedToday}
          getStreak={getStreak}
          getLongestStreak={getLongestStreak}
          onToggle={handleToggle}
          onAdd={addHabit}
          onEdit={editHabit}
          onDelete={deleteHabit}
          t={t}
        />
      </main>
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
