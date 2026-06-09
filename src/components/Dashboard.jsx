export default function Dashboard({ habits, todayCount, activeStreakCount, bestStreak, t }) {
  const total = habits.length;
  const pct = total === 0 ? 0 : Math.round((todayCount / total) * 100);

  return (
    <div className="dashboard">
      <div className="dashboard-progress-card">
        <div className="dp-header">
          <span className="dp-title">{t.todayProgress}</span>
          <span className="dp-pct">{pct}%</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="dp-sub">
          {todayCount} {t.completedOf} {total} {t.habits}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <span className="stat-value">{total}</span>
          <span className="stat-label">{t.totalHabits}</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{activeStreakCount}</span>
          <span className="stat-label">{t.activeStreaks}</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{bestStreak}</span>
          <span className="stat-label">{t.bestStreak}</span>
        </div>
      </div>
    </div>
  );
}
