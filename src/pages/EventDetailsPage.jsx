import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById } from "../features/events/eventsSlice";
import { registerForEvent, cancelRegistration } from "../features/registrations/registrationsSlice";

export default function EventDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { items, selected, selectedStatus } = useSelector((state) => state.events);
  const registrations = useSelector((state) => state.registrations);
  const event = items.find((item) => item.id === id) || (selected?.id === id ? selected : null);
  const registered = user && registrations.some((item) => item.userEmail === user.email && item.event.id === id);

  useEffect(() => {
    if (!event) dispatch(fetchEventById(id));
  }, [dispatch, id, event]);

  if (!event && selectedStatus !== "failed") return <div className="status-box"><div className="spinner"></div><p>Loading event details...</p></div>;
  if (!event) return <div className="empty-state"><h2>Event not found</h2><p>Go back to explore events.</p><Link className="button" to="/events">Explore events</Link></div>;

  const image = event.images?.find((item) => item.width > 500)?.url || event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const start = event.dates?.start || {};
  const category = event.classifications?.[0]?.segment?.name || "Live event";

  function register() {
    if (!user) {
      navigate("/login", { state: { from: `/events/${id}` } });
      return;
    }
    if (registered) return;
    dispatch(registerForEvent({ userEmail: user.email, event }));
    window.alert("You're registered for this event!");
  }

  function cancel() {
    if (window.confirm("Cancel this registration?")) {
      dispatch(cancelRegistration({ userEmail: user.email, eventId: id }));
    }
  }

  return (
    <section className="details-page">
      <Link to="/events" className="back-link">← Back to events</Link>
      <div className="details-layout">
        <div className="details-image">{image ? <img src={image} alt={event.name} /> : <div className="image-placeholder">EVENTLY</div>}</div>
        <div className="details-content">
          <span className="category-pill detail-pill">{category}</span>
          <p className="eyebrow">YOUR NEXT EXPERIENCE</p>
          <h1>{event.name}</h1>
          <div className="detail-info"><span>▦</span><div><strong>Date & time</strong><p>{start.localDate || "Date to be announced"}{start.localTime ? ` at ${start.localTime.slice(0, 5)}` : ""}</p></div></div>
          <div className="detail-info"><span>⌖</span><div><strong>Venue</strong><p>{venue?.name || "Venue to be announced"}</p><p>{[venue?.city?.name, venue?.state?.stateCode, venue?.country?.name].filter(Boolean).join(", ")}</p></div></div>
          {event.priceRanges?.[0] && <div className="detail-info"><span>$</span><div><strong>Price range</strong><p>{event.priceRanges[0].currency} {event.priceRanges[0].min} – {event.priceRanges[0].max}</p></div></div>}
          {event.info && <div className="event-description"><strong>About this event</strong><p>{event.info}</p></div>}
          {event.url && <a className="external-link" href={event.url} target="_blank" rel="noreferrer">View on Ticketmaster ↗</a>}
          <button className="button register-button" onClick={register} disabled={Boolean(registered)}>{registered ? "✓ You're registered" : "Register for event →"}</button>
          {registered && <button className="button button-outline register-button" onClick={cancel}>Cancel registration</button>}
          {!user && <p className="helper-text">You'll need to log in before registering.</p>}
        </div>
      </div>
    </section>
  );
}