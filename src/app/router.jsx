import React from 'react'
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../components/App";
import EventsPage from "../pages/EventsPage";
import EventDetailsPage from "../pages/EventDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyEventsPage from "../pages/MyEventsPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/events" replace /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "my-events",
        element: <ProtectedRoute><MyEventsPage /></ProtectedRoute>
      },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);