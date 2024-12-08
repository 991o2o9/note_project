import { createRoot } from "react-dom/client";
import "./app/styles/global.scss";
import "./app/styles/normalize.scss";
import { RouterProvider } from "react-router-dom";
import { Router } from "./app/routes/Routes.jsx";
import { NoteContextProvider } from "./modules/homeModule/context/NoteContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <NoteContextProvider>
    <RouterProvider router={Router} />
  </NoteContextProvider>
);
