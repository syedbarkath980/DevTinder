import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import Connections from "./pages/Connections";

const App = () => {
  return (
    <Routes>
      // No Layout
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      // With Layout
      <Route element={<Layout />}>
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
