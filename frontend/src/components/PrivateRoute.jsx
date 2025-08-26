// PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);// check user
  const userData = user?.currentUser;

  if (!userData) {
    // Not logged in, redirect to sign-in
    return <Navigate to="/sign-in" replace />;
  }

  // Logged in, render the requested page
  return children;
};

export default PrivateRoute;