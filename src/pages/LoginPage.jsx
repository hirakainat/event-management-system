import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthMessage, loginUser } from "../features/auth/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => () => dispatch(clearAuthMessage()), [dispatch]);

  function submit(event) {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  useEffect(() => {
    if (user) navigate(location.state?.from || "/events", { replace: true });
  }, [user, navigate, location.state]);

  return <section className="auth-page"><div className="auth-decoration"><span className="auth-symbol">✳</span><p>GOOD THINGS<br />HAPPEN OUT THERE.</p><span className="auth-decoration-small">DISCOVER YOUR NEXT FAVOURITE THING ↗</span></div><div className="auth-card"><p className="eyebrow">WELCOME BACK</p><h1>Good to see you<span>.</span></h1><p className="auth-subtitle">Log in and pick up where the fun begins.</p><form onSubmit={submit} className="auth-form"><label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" /></label>{message && <p className="form-message">{message}</p>}<button className="button auth-submit" type="submit">Log in <span>→</span></button></form><p className="auth-switch">New around here? <Link to="/register">Create an account</Link></p><p className="security-note">Frontend demo only. Don't use a real password.</p></div></section>;
}