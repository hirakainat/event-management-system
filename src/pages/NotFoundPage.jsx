import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return <div className="empty-state not-found"><span>404</span><h2>This page wandered off.</h2><p>Let's get you back to the good stuff.</p><Link className="button" to="/events">Explore events</Link></div>;
}