import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(logoutUser());
    navigate("/events");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/events"><span className="brand-mark">e</span> evently</NavLink>
        <nav className="nav-links">
          <NavLink to="/events">Explore</NavLink>
          {user && <NavLink to="/my-events">My Events</NavLink>}
        </nav>
        <div className="account-links">
          {user ? (
            <>
              <span className="welcome">Hi, {user.name.split(" ")[0]}</span>
              <button className="button button-small button-outline" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink className="login-link" to="/login">Log in</NavLink>
              <NavLink className="button button-small" to="/register">Sign up</NavLink>
            </>
          )}
        </div>
      </header>
      <main className="main-content"><Outlet /></main>
      <footer className="footer">Find your next great experience. <span>Made with React + Redux Toolkit.</span></footer>
    </div>
  );
}