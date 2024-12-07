import { Header } from "../header/header";
import { CreateBlock } from "./components/CreateBlock/CreateBlock";
import NoteList from "./components/NoteList/NoteList";

export const HomeModule = () => {
  return (
    <>
      <Header />
      <div>
        <CreateBlock />
        <NoteList />
      </div>
    </>
  );
};
