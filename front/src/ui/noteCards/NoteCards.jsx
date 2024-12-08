import { useState } from "react";
import styles from "./NoteCards.module.scss";

import { useNote } from "../../modules/homeModule/context/NoteContextProvider";
import { EditModal } from "../../modules/homeModule/components/EditNoteModal/EditNoteModal";
import { ModalDetails } from "../../modules/homeModule/components/ModalDetails/ModalDetails";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

export const NoteCards = ({ note }) => {
  const { updateNote, deleteNote } = useNote();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (!isModalInfoOpen) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalInfo = () => {
    setIsModalInfoOpen(false);
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (!isModalOpen) {
      setIsModalInfoOpen(true);
    }
  };

  const truncate = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + "...";
  };

  return (
    <>
      <div style={{ backgroundColor: note.color }} className={styles.noteCard}>
        <div onClick={handleCardClick}>
          {note.imagePath && (
            <img
              src={`http://localhost:5000/${note.imagePath}`}
              alt={note.title}
              className={styles.noteImage}
            />
          )}
          <div className={styles.desc}>
            <h3 className={styles.noteTitle}>{note.title}</h3>
            <p className={styles.noteContent}>{truncate(note.content, 120)}</p>
            <p className={styles.createdAt}>
              Создано: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <FaEdit onClick={handleEditClick} />
          <MdDeleteSweep
            onClick={() => {
              deleteNote(note.id);
            }}
          />
        </div>
      </div>
      <EditModal
        isModalOpen={isModalOpen}
        closeModal={handleCloseModal}
        note={note}
        updateNote={updateNote}
      />
      <ModalDetails
        isOpen={isModalInfoOpen}
        onClose={(e) => {
          e.stopPropagation();
          handleCloseModalInfo();
        }}
        note={note}
      />
    </>
  );
};
