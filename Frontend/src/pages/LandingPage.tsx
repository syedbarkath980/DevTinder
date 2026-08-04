// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">DevTinder</h1>
          <p className="py-6">
            Swipe, connect, and collaborate with developers who share your
            stack.
          </p>

          {user ? (
            <Link to="/feed" className="btn btn-primary">
              Go to Feed
            </Link>
          ) : (
            <div className="flex gap-3 justify-center">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
