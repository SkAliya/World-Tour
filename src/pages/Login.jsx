import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuthContext } from "../contexts/AuthenticateContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("aliya@example.com");
  const [password, setPassword] = useState("qwerty");
  const { checkUserDetails, isLogged, errMessage } = useAuthContext();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // if (!email && !password) return;
    if (email && password) checkUserDetails(email, password);
  }
  useEffect(
    function () {
      if (isLogged) navigate("/app", { replace: true });
    },
    [isLogged, navigate]
  );

  return (
    <main className={styles.login}>
      <Logo />
      {/* <PageNav /> */}
      {errMessage && <Message message={errMessage} />}
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
