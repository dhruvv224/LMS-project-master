import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  console.log(authenticated, user, "RouteGuard Debug");

  // Allow unauthenticated users to access the root ("/") route
  if (!authenticated && location.pathname === "/") {
    return <Fragment>{element}</Fragment>;
  }

  // Redirect unauthenticated users to the /auth page (except when already on /auth or "/")
  if (!authenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth" />;
  }

  // Redirect authenticated non-instructors away from instructor pages
  if (
    authenticated &&
    user?.role !== "instructor" &&
    location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/home" />;
  }

  // Redirect authenticated instructors to instructor pages by default
  if (
    authenticated &&
    user?.role === "instructor" &&
    !location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  // For all valid cases, render the element
  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
