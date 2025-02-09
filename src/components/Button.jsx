import styles from "./Button.module.css";
function Button({ type, handleFunc, children }) {
  if (type === "primary") {
    return (
      <button className={`btn ${styles.primary}`} onClick={handleFunc}>
        {children}
      </button>
    );
  }
  if (type === "position") {
    return (
      <button className={`btn ${styles.position}`} onClick={() => handleFunc()}>
        {children}
      </button>
    );
  }
  return (
    <button className={`btn ${styles.back}`} onClick={handleFunc}>
      {children}
    </button>
  );
}

export default Button;
