import styles from "./Button.module.css";

const Button = (props) => {
  const colour = props.colour;

  return (
    <button className={`${props.className} ${styles.button}`} style={{ background: colour }} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
