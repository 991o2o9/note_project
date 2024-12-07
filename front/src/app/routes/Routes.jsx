import { createBrowserRouter } from "react-router-dom";
import { NotePage } from "../../pages/notePage/NotePage";
import { HomePage } from "../../pages/home/HomePage";
import { path } from "../../utils/constants/Constants";

export const Router = createBrowserRouter([
  {
    children: [
      {
        path: path.home,
        element: <HomePage />,
      },
      {
        path: path.details,
        element: <NotePage />,
      },
    ],
  },
]);
