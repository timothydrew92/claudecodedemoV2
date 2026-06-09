import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "daily-wins-habits";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function calcStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;
  const sorted = [...completedDates].sort((a, b) => b.localeCompare(a));
  const today = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (sorted[0] !== today && sorted[0] !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev - curr) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function calcLongestStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;
  const sorted = [...completedDates].sort((a, b) => a.localeCompare(b));
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      if (current > longest) longest = current;
    } else if (diff > 1) {
      current = 1;
    }
  }
  return longest;
}

export function useHabits() {
  const [habits, setHabits] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = useCallback((name, category) => {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      category,
      completedDates: [],
      createdAt: todayStr(),
    };
    setHabits((prev) => [...prev, newHabit]);
  }, []);

  const editHabit = useCallback((id, name, category) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name, category } : h))
    );
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    const today = todayStr();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const already = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: already
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  }, []);

  const isCompletedToday = useCallback(
    (habit) => habit.completedDates.includes(todayStr()),
    []
  );

  const getStreak = useCallback((habit) => calcStreak(habit.completedDates), []);
  const getLongestStreak = useCallback(
    (habit) => calcLongestStreak(habit.completedDates),
    []
  );

  const todayCount = habits.filter((h) => h.completedDates.includes(todayStr())).length;
  const activeStreakCount = habits.filter((h) => calcStreak(h.completedDates) > 0).length;
  const bestStreak = habits.reduce((max, h) => Math.max(max, calcLongestStreak(h.completedDates)), 0);

  return {
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
  };
}
