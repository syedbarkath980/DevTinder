import { Link } from "react-router";
import logo from "../assets/dtl.png";
import { useState } from "react";
import { login as LoginApi } from "../api/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("adeeb@gmail.com");
  const [password, setPassword] = useState("Syed@123#");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnLogin = async () => {
    try {
      const response = await LoginApi(email, password);

      if (response) {
        dispatch(addUser(response.data)); // Storing the data in store.
        navigate("/feed", { replace: true });
      } else {
        throw new Error("Error Loggin in...");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#f6f7fb] px-4 py-6"
      style={{
        backgroundImage:
          'url("https://img.magnific.com/free-vector/colorful-triangle-shapes-banner-technical-wire-mesh-style-vector_1017-45720.jpg?semt=ais_hybrid&w=740&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute left-6 top-5 flex items-center gap-3">
        <img
          src={logo}
          alt="DevTinder logo"
          className="h-16 w-16 rounded-xl object-contain"
        />
        <span className="text-lg font-semibold text-slate-800">DevTinder</span>
      </div>

      <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="w-full max-w-88 border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-10">
            <p className="text-sm text-slate-400">Please enter your details</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
          </div>

          <div className="space-y-5">
            <label className="form-control w-full">
              <input
                type="email"
                className="input input-bordered h-11 w-full rounded-md border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <input
                type="password"
                className="mt-3 input input-bordered h-11 w-full rounded-md border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs rounded border-slate-300 mt-3"
                />
                <span className="mt-3">Remember for 30 days</span>
              </label>
              <Link
                className="mt-3 font-medium text-blue-500 hover:text-blue-600"
                to="/forgot-password"
              >
                Forgot password
              </Link>
            </div>

            <button
              className="mt-4 btn h-11 w-full rounded-md border-0 bg-blue-500 text-[16px] text-white hover:bg-blue-600"
              onClick={handleOnLogin}
            >
              Login
            </button>

            <button className="btn h-11 w-full rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="mr-2 h-5 w-5 object-contain"
              />
              Sign in with Google
            </button>

            <p className="pt-1 text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                className="font-medium text-blue-500 hover:text-blue-600"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
