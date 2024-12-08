import { useState } from "react";
import styles from "./CreateBlock.module.scss";
import { FaImage, FaPalette } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";
import { useNote } from "../../context/NoteContextProvider";

export const CreateBlock = () => {
  const { createNote } = useNote();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveNote = async () => {
    const noteData = {
      title,
      content,
      color: selectedColor,
      image: selectedFile,
    };

    try {
      await createNote(noteData);
      setTitle("");
      setContent("");
      setSelectedColor("#ffffff");
      setSelectedFile(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Ошибка при создании заметки:", error.message);
    }
  };

  return (
    <div
      className={styles.createBlock}
      style={{ backgroundColor: selectedColor }}
    >
      {!isOpen ? (
        <div className={styles.noteInput} onClick={handleToggle}>
          <span>Заметка...</span>
          <div className={styles.icons}>
            <MdAdsClick className={styles.icon} />
          </div>
        </div>
      ) : (
        <div className={styles.expandedBlock}>
          <input
            type="text"
            placeholder="Введите заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
          <textarea
            placeholder="Заметка..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.noteTextarea}
          ></textarea>
          <div className={styles.footer}>
            <div className={styles.footerIcons}>
              <label>
                <FaPalette className={styles.icon} />
                <input
                  type="color"
                  onChange={handleColorChange}
                  style={{ display: "none" }}
                />
              </label>
              <label>
                <FaImage className={styles.icon} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <button onClick={handleSaveNote} className={styles.saveButton}>
              Сохранить
            </button>
            <button onClick={handleToggle} className={styles.closeButton}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
