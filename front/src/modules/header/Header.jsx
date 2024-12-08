import { Search } from "../../ui/Search/Search";
import styles from "./Header.module.scss";
import { LuNotepadText } from "react-icons/lu";

export const Header = ({ onSearch }) => {
  return (
    <header>
      <div className={styles.logoPart}>
        <LuNotepadText className={styles.logo} />
        <span>NoteKeeper</span>
      </div>
      <Search onSearch={onSearch} />
    </header>
  );
};
