import { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "./EditNoteModal.module.scss";
import { useOutsideClick } from "../../../../utils/hooks/UseOutsideClick";
import AOS from "aos";
import "aos/dist/aos.css";

export const EditModal = ({ isModalOpen, closeModal, note, updateNote }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [color, setColor] = useState(note ? note.color : "#ffffff");

  const modalRef = useRef(null);

  useOutsideClick(modalRef, isModalOpen ? closeModal : null);

  useEffect(() => {
    document.body.style.overflowY = isModalOpen ? "hidden" : "scroll";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    AOS.init({ duration: 600 });
    AOS.refresh();
  }, []);

  const handleSaveChanges = () => {
    const updatedNote = { ...note, title, content, color };
    updateNote(updatedNote);
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.modal}>
      <div
        data-aos="zoom-in-right"
        ref={modalRef}
        className={styles.modalContent}
      >
        <h2>Edit Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <div className={styles.colorPart}>
          <div
            style={{ backgroundColor: color }}
            className={styles.example}
          ></div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button onClick={handleSaveChanges}>Save</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};
