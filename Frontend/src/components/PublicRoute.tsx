import { useSelector } from "react-redux";
import { Navigate } from "react-router";

type UserState = {
  user: unknown;
  isAuthChecked: boolean;
};

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthChecked } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  if (!isAuthChecked) {
    return null;
  }

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return children;
}

export default PublicRoute;
