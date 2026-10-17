import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import EventCard from "../components/EventCard";

const categories = ["Music", "Sports", "Arts & Theatre", "Film", "Miscellaneous"];

export default function EventsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.events);
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchEvents({}));
  }, [dispatch]);

  function searchEvents(event) {
    event.preventDefault();
    dispatch(fetchEvents({ keyword, city, category }));
  }

  function pickCategory(name) {
    const next = category === name ? "" : name;
    setCategory(next);
    dispatch(fetchEvents({ keyword, city, category: next }));
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> MAKE ROOM FOR MEMORIES</p>
          <h1>Find your next<br /><span>great experience.</span></h1>
          <p className="hero-description">From live music to unforgettable nights, discover events worth stepping out for.</p>
          <div className="hero-stats"><div><strong>Discover</strong><span>what's happening</span></div><div><strong>Plan</strong><span>your next outing</span></div><div><strong>Enjoy</strong><span>the moment</span></div></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
          <div className="art-ticket"><span className="ticket-top">YOUR NEXT EXPERIENCE</span><span className="ticket-star">✳</span><span className="ticket-big">LIVE<br />A LITTLE.</span><span className="ticket-bottom">GOOD TIMES AHEAD ↗</span></div>
          <div className="floating-note note-one">✦ FIND YOUR CROWD</div><div className="floating-note note-two">✧ MAKE IT A NIGHT</div>
        </div>
      </section>

      <section className="events-section">
        <div className="section-heading"><div><p className="eyebrow">THE GOOD STUFF</p><h2>Explore events<span className="heading-period">.</span></h2></div><p className="section-note">A little something for every mood.</p></div>
        <form className="search-panel" onSubmit={searchEvents}>
          <label className="search-field"><span>⌕</span><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Artist, event, or keyword" /></label>
          <label className="search-field"><span>⌖</span><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City (optional)" /></label>
          <button className="button search-button" type="submit">Find events <span>→</span></button>
        </form>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => pickCategory(c)}
              className={`button button-small ${category === c ? "" : "button-outline"}`}>{c}</button>
          ))}
        </div>

        <div className="results-row"><h3>{keyword || city || category ? "Search results" : "Coming up next"} <span>{items.length}</span></h3><p>Powered by Ticketmaster</p></div>

        {status === "loading" && <div className="status-box"><div className="spinner"></div><p>Finding something good...</p></div>}
        {status === "failed" && <div className="error-box"><strong>We couldn't load events.</strong><p>{error}</p><p>Check that your API key is set in the project's .env file.</p><button className="button" onClick={() => dispatch(fetchEvents({ keyword, city, category }))}>Try again</button></div>}
        {status === "succeeded" && items.length === 0 && <div className="empty-state"><span>✳</span><h3>No events found</h3><p>Try another keyword, city or category.</p></div>}
        {items.length > 0 && <div className="event-grid">{items.map((event) => <EventCard key={event.id} event={event} />)}</div>}
      </section>
    </>
  );
}