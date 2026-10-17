import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const image = event.images?.find((item) => item.width > 300)?.url || event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const segment = event.classifications?.[0]?.segment?.name;
  const category = segment && segment !== "Undefined" ? segment : "Live event";

  return (
    <article className="event-card">
      <Link to={`/events/${event.id}`} className="event-image-wrap">
        {image ? <img src={image} alt={event.name} className="event-image" /> : <div className="image-placeholder">EVENTLY</div>}
        <span className="category-pill">{category}</span>
      </Link>
      <div className="event-card-body">
        <p className="event-date">{date || "Date to be announced"}{time ? ` · ${time.slice(0, 5)}` : ""}</p>
        <h3><Link to={`/events/${event.id}`}>{event.name}</Link></h3>
        <p className="event-venue">{venue?.name || "Venue to be announced"}</p>
        <p className="event-location">{[venue?.city?.name, venue?.state?.stateCode || venue?.country?.countryCode].filter(Boolean).join(", ") || "Location details available"}</p>
        <Link className="text-link" to={`/events/${event.id}`}>View details <span>↗</span></Link>
      </div>
    </article>
  );
}