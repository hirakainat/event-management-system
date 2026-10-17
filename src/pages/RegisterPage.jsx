import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthMessage, registerUser } from "../features/auth/authSlice";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => () => dispatch(clearAuthMessage()), [dispatch]);
  function submit(event) {
    event.preventDefault();
    dispatch(registerUser({ name: name.trim(), email: email.trim(), password }));
  }
  useEffect(() => {
    if (user) navigate("/events", { replace: true });
  }, [user, navigate]);

  return <section className="auth-page"><div className="auth-decoration"><span className="auth-symbol">✳</span><p>YOUR PEOPLE.<br />YOUR MOMENTS.</p><span className="auth-decoration-small">THERE'S MORE TO EXPERIENCE ↗</span></div><div className="auth-card"><p className="eyebrow">COME ON IN</p><h1>Make it happen<span>.</span></h1><p className="auth-subtitle">Create an account to save the events you love.</p><form onSubmit={submit} className="auth-form"><label>Your name<input value={name} onChange={(e) => setName(e.target.value)} required minLength="2" placeholder="Your full name" /></label><label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" placeholder="At least 6 characters" /></label>{message && <p className="form-message">{message}</p>}<button className="button auth-submit" type="submit">Create account <span>→</span></button></form><p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p><p className="security-note">Demo authentication only. Passwords are stored locally for this assignment.</p></div></section>;
}