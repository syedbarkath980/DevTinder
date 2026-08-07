import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import { viewProfile } from "./api/profile";
import { addUser, removeUser } from "./store/userSlice";

type UserState = {
  user: unknown;
  isAuthChecked: boolean;
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(
    (state: { user: UserState }) => state.user.isAuthChecked,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await viewProfile();
        dispatch(addUser(res.data));
      } catch (error) {
        dispatch(removeUser());
        console.error(error);
      }
    };

    if (!isAuthChecked) {
      fetchUser();
    }
  }, [dispatch, isAuthChecked]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Nested Routes with Layout*/}
        <Route path="/" element={<Layout />}>
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
    </>
  );
};

export default App;
