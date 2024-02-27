import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyNavBar from "./components/NavBar";
import Doctor from "./pages/Doctor";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main>
        <div className="flex flex-col mx-auto max-w-6xl py-10">
          <h1 className="text-3xl font-bold">Welcome to EHR System</h1>
        </div>
      </main>
    ),
  },
  {
    path: "/patient",
    element: <Home />,
  },
  {
    path: "/doctor",
    element: <Doctor />,
  },
]);

function App() {
  return (
    <NextUIProvider>
      <MyNavBar />
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;
