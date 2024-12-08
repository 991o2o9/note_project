import { createContext, useContext, useState, useEffect } from "react";

export const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (noteData) => {
    const formData = new FormData();
    formData.append("title", noteData.title);
    formData.append("content", noteData.content);
    formData.append("color", noteData.color);
    if (noteData.image) {
      formData.append("image", noteData.image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes((prevNotes) => [...prevNotes, newNote]);
        return newNote;
      } else {
        throw new Error("Ошибка при сохранении заметки");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${updatedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedData.id ? updatedData : note
          )
        );
      } else {
        throw new Error("Ошибка при обновлении заметки");
      }
    } catch (error) {
      console.error("Ошибка при обновлении заметки", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        throw new Error("Ошибка при удалении заметки");
      }
    } catch (error) {
      console.error("Ошибка при удалении заметки", error);
    }
  };

  const closeModal = () => setSelectedNote(null);

  const values = {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    selectedNote,
    setSelectedNote,
    closeModal,
  };

  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
};
