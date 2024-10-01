/* eslint-disable */
import Link from "next/link";
import styles from "./TopBar.module.css";
export default function TopBar() {
  return (
    <nav className={styles.topBar}>
      <Link href={"/"}>Home</Link>
      <Link href={"/Create"}>작성하기</Link>
    </nav>
  );
}
