import { useDispatch, useSelector } from "react-redux";
import { cancelRegistration } from "../features/registrations/registrationsSlice";
import { Link } from "react-router-dom";

function RegistrationCard({ item, onCancel, completed }) {
  const event = item.event;
  const image = event.images?.find((img) => img.width > 200)?.url || event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  return <article className="registered-card">
    {image ? <img src={image} alt={event.name} /> : <div className="registered-placeholder">✳</div>}
    <div className="registered-info"><span className="status-label">{completed ? "COMPLETED" : "UPCOMING"}</span><h3><Link to={`/events/${event.id}`}>{event.name}</Link></h3><p>{event.dates?.start?.localDate || "Date to be announced"}</p><p>{venue?.name || "Venue to be announced"}</p></div>
    {!completed && <button className="cancel-button" onClick={() => onCancel(event.id)}>Cancel registration</button>}
  </article>;
}

export default function MyEventsPage() {
  const user = useSelector((state) => state.auth.user);
  const allRegistrations = useSelector((state) => state.registrations);
  const dispatch = useDispatch();

  if (!user) return null;

  const registrations = allRegistrations.filter((item) => item.userEmail === user.email);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = registrations.filter((item) => (item.event.dates?.start?.localDate || "9999-12-31") >= today);
  const completed = registrations.filter((item) => item.event.dates?.start?.localDate && item.event.dates.start.localDate < today);

  function cancel(eventId) {
    if (window.confirm("Cancel this event registration?")) {
      dispatch(cancelRegistration({ userEmail: user.email, eventId }));
    }
  }

  return <section className="my-events-page"><p className="eyebrow">YOUR PLANS, ALL IN ONE PLACE</p><div className="section-heading"><div><h1>My Events<span className="heading-period">.</span></h1><p className="section-note">Hey {user.name.split(" ")[0]}, here's what you've got lined up.</p></div><Link className="button" to="/events">Discover more <span>→</span></Link></div>
    <section className="registration-section"><div className="subheading-row"><h2>Coming up <span>{upcoming.length}</span></h2><p>Good times ahead</p></div>{upcoming.length ? <div className="registration-list">{upcoming.map((item) => <RegistrationCard key={item.event.id} item={item} onCancel={cancel} completed={false} />)}</div> : <div className="empty-state compact"><span>✳</span><h3>Nothing on the calendar yet</h3><p>Find an event and register to see it here.</p><Link to="/events" className="text-link">Explore events →</Link></div>}</section>
    <section className="registration-section"><div className="subheading-row"><h2>Past events <span>{completed.length}</span></h2><p>Memories made</p></div>{completed.length ? <div className="registration-list">{completed.map((item) => <RegistrationCard key={item.event.id} item={item} onCancel={cancel} completed={true} />)}</div> : <p className="past-empty">Your completed events will appear here.</p>}</section>
  </section>;
}