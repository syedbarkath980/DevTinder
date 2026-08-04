import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { logout as logoutApi } from "../api/auth";
import logo from "../assets/dtl.png";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutApi();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 min-h-0 px-2 py-0">
      <div className="flex-1 flex items-center">
        <Link to="/" className="ml-3 flex items-center">
          <img src={logo} alt="DevTinder logo" className="block h-24 w-auto" />
        </Link>
      </div>
      <div className="mr-5 flex items-center gap-2">
        <p className="leading-none mr-1">Welcome, {user?.firstName}</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle avatar p-0">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100">
              <img
                alt="User profile"
                src="https://static.vecteezy.com/system/resources/previews/065/460/346/non_2x/simple-black-circle-person-icon-graphic-image-for-profile-pictures-and-user-interfaces-free-vector.jpg"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
