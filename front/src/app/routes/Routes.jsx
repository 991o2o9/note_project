import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { path } from "../../utils/constants/Constants";

export const Router = createBrowserRouter([
  {
    children: [
      {
        path: path.home,
        element: <HomePage />,
      },
    ],
  },
]);
