import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Teachers = lazy(() => import("../pages/TeacherPage/TeacherPage"));
const Favorites = lazy(() => import("../pages/FavoritesPage/FavoritesPage"));
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  redirectTo="/"
                  component={<Favorites />}
                />
              }
            />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
