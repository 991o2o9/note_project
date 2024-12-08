import { useState } from "react";
import { Header } from "../header/header";
import { CreateBlock } from "./components/CreateBlock/CreateBlock";
import NoteList from "./components/NoteList/NoteList";

export const HomeModule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div>
        <CreateBlock />
        <NoteList searchTerm={searchTerm} />
      </div>
    </>
  );
};
