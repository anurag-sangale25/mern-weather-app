import { useWeather } from "../context/WeatherContext.jsx";

const RecentSearches = () => {
  const { history, loadByCity } = useWeather();

  return (
    <aside className="history-panel glass-card">
      <div className="section-heading">
        <span>Recent searches</span>
        <strong>{history.length}/5</strong>
      </div>
      {history.length === 0 ? (
        <p className="muted">Connect MongoDB to start storing searches.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <button type="button" key={item._id} onClick={() => loadByCity(item.city)}>
              <span>{item.city}</span>
              <small>{new Date(item.date).toLocaleDateString()}</small>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};

export default RecentSearches;
