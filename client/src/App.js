import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";

function App() {
  const { loading } = useSelector((state) => state.alerts.loading);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicRoute >
                  <HomePage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                // <ProtectedRoute>
                  <Login />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                // <ProtectedRoute>
                  <Register />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification" 
              element={
                <ProtectedRoute>
                  <NotificationPage/>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
