import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthenticateContext";
import styles from "./User.module.css";

const FAKE_USER = {
  name: "Aliya",
  email: "aliya@example.com",
  password: "qwerty",
  // avatar: "https://i.pravatar.cc/100?u=zz",
  avatar: "../../public/eyes-2.jpg",
};

function User() {
  const { user, userLogout } = useAuthContext();
  const navigate = useNavigate();
  // const user = FAKE_USER;

  function handleClick() {
    userLogout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
