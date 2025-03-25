import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../redux/authSlice"; // Redux se user ko fetch karna

const RedirectIfLoggedIn = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  console.log("Protected Route - User:", user);

  //Agar user login hai, tho admin dashboard pe redirect kar do
  if (user) {
    return <Navigate to="/admin-dashboard" />;
  }
  //Agar user login nahi hai,tho login/register page dikhayenge
  return children;
};

export default RedirectIfLoggedIn;
