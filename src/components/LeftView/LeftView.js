import React from "react";
import { OPTIONS } from "../../constants/options";
import styles from "./leftview.module.css";
export default function LeftView() {
  return (
    <div className={styles.leftview}>
      <div className={styles.title}>Select Option</div>
      <hr />
      {Object.keys(OPTIONS).map((option,index) => {
        return <div className={styles.option} key={index}>{OPTIONS[option]}</div>;
      })}
    </div>
  );
}
