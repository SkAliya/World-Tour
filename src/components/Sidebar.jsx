import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy;CopyRight 2025, World-Tour.</p>
    </footer>
  );
}
