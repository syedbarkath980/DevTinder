const Navbar = () => {
  return (
    <div className="navbar bg-base-100 min-h-0 px-2 py-0">
      <div className="flex-1 flex items-center">
        <a className="ml-3 flex items-center" href="/">
          <img
            src="src/assets/dtl.png"
            alt="DevTinder logo"
            className="block h-24 w-auto"
          />
        </a>
      </div>
      <div className="mr-5 flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle avatar -mt-6 p-0"
          >
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
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
