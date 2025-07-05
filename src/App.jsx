import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import MovieDetails from "./pages/movieDetails";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie-details/:imdbID",
    element: <MovieDetails/>
  }
];
const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;
