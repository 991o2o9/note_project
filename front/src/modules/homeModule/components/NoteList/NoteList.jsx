import styles from "./NoteList.module.scss";
import { NoteCards } from "../../../../ui/noteCards/NoteCards";
import { useNote } from "../../context/NoteContextProvider";

export const NoteList = ({ searchTerm }) => {
  const { notes, loading, error } = useNote();

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chunkedNotes = [];
  for (let i = 0; i < filteredNotes.length; i += 2) {
    chunkedNotes.push(filteredNotes.slice(i, i + 2));
  }

  return (
    <div className={styles.noteList}>
      {chunkedNotes.length > 0 ? (
        chunkedNotes.map((chunk, index) => (
          <div key={index} className={styles.noteChunk}>
            {chunk.map((note) => (
              <NoteCards key={note.id} note={note} />
            ))}
          </div>
        ))
      ) : (
        <div className={styles.noNotes}>Заметок пока нет</div>
      )}
    </div>
  );
};

export default NoteList;
