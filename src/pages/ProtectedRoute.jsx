import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthenticateContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLogged) navigate("/");
    },
    [isLogged, navigate]
  );

  return isLogged ? children : null;
  // return children;
}

export default ProtectedRoute;
