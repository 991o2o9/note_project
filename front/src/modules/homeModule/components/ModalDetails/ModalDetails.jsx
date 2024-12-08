import { useEffect, useRef } from "react";
import styles from "./ModalDetails.module.scss";
import { useOutsideClick } from "../../../../utils/hooks/UseOutsideClick";
import AOS from "aos";
import "aos/dist/aos.css";

export const ModalDetails = ({ isOpen, onClose, note }) => {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, isOpen ? onClose : null);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "scroll";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div
        data-aos="zoom-in-right"
        style={{ backgroundColor: note.color }}
        className={styles.modalContent}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <div className={styles.modalBody}>
          {note.imagePath && (
            <img
              src={`http://localhost:5000/${note.imagePath}`}
              alt={note.title}
              className={styles}
            />
          )}
          <div className={styles.desc}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>Создано: {new Date(note.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
