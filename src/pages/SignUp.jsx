import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Spinner from "../components/Spinner";
import Failure from "../components/animations/Failure";


const SignUp = () => {
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.id !== 0) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
      if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {
        toast.error("All fields are required");
        setError("All fields are required");
        return;
      }else if(!emailRegex.test(email)){
        toast.error("Invalid email address");
        setError("Invalid email address");
        return;
      }else if(!passwordRegex.test(password)){
        toast.error("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number");
        setError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number");
        return;
      }
      setLoading(true);
      const response = await fetch("https://shoppyglobe-backend.nileshgosavi.tech/api/user/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
        setError(data.message);
        throw new Error(data.message);
      } else {
        const data = await response.json();
        toast.success(data.message);
        navigate("/signin");
      }

    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center">
        <div className="bg-gray-400  rounded-2xl  transition-all duration-200">
          <form onSubmit={(e) => {handleSignUp(e);}} className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-900 flex-col">
            <img src={logo} alt="logo" />
            <h1 className="text-black text-xl">Register to ShoppyGlobe</h1>
            <input
              className="w-full p-2 bg-slate-300 rounded-md border border-gray-700 focus:border-blue-700 placeholder:text-gray-600 hover:border-blue-500 transition-all duration-200"
              placeholder="First Name"
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-full p-2 bg-slate-300 rounded-md border border-gray-700 focus:border-blue-700 placeholder:text-gray-600 hover:border-blue-500 transition-all duration-200"
              placeholder="Last Name"
              type="text"
              name="firstName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="w-full p-2 bg-slate-300 rounded-md border border-gray-700 focus:border-blue-700 placeholder:text-gray-600 hover:border-blue-500 transition-all duration-200"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 bg-slate-300 rounded-md border border-gray-700 focus:border-blue-700 placeholder:text-gray-600  transition-all duration-200"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-wrap">{error}</p>}
            <button
              className="w-full p-2 flex items-center justify-center bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : (
                <>
                {error ? <Failure message={"Sign Up"} /> : "Sign Up"}
                </>
              )}
            </button>
            <p className="text-black">
              Already have an account?
              <Link
                className="font-semibold text-red-500 hover:text-red-700 transition-all duration-200"
                to={"/signin"}
              >
                <span className="hover:text-red-500 transition-all duration-200 hover:scale-105 mx-2">Sign in</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
