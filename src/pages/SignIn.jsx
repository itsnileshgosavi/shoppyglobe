import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/redux/userSlice";
import { toast } from "sonner";
import Spinner from "../components/Spinner";
import Failure from "../components/animations/Failure";


const SignIn = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    

    useEffect(() => {
      if (user.id !== 0) {
        navigate("/");
      }
    }, [user, navigate]);
   const handleSignIn = async(e) => {
    e.preventDefault();
  try {
    setLoading(true);
    const response = await fetch("./api/user/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const d = await response.json();
      if (!response.ok) {
        throw new Error(d.message);
      }else{
          console.log(d.user);
          toast.success(d.message);
          
            dispatch(setUser(d.user));
            navigate("/");
      }
    
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
    setError(error.message); 
  }finally{
    setLoading(false);
  }
        
   }
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center w-full max-w-md">
        <div className="bg-gray-300 shadow-xl shadow-gray-700/50 rounded-2xl transition-all duration-200 w-full">
          <form onSubmit={(e) => {handleSignIn(e)}} className="mx-auto flex items-center space-y-4 py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 font-semibold text-white flex-col w-full">
            <img src={logo} alt="logo" className="w-32 sm:w-40 lg:w-48" />
            <h1 className="text-black text-lg sm:text-xl lg:text-2xl">Sign in to ShoppyGlobe</h1>
            <input
              className="w-full p-2 sm:p-3 bg-slate-300 placeholder:text-gray-600 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="Email"
              type="email" 
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 sm:p-3 bg-slate-300 placeholder:text-gray-600 rounded-md border border-gray-700 focus:border-blue-700 hover:border-red-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
            <button
              className="w-full flex items-center justify-center p-2 sm:p-3 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base"
              type="submit"
              disabled={loading} >
              {loading ? <Spinner /> : (
                <>
                {error ? <Failure message={"Sign In"} /> : "Sign In"}
                </>
              )}
            </button>
            <p className="text-black text-sm sm:text-base" >
              Don&apos;t have an account?
              <Link
                className="font-semibold text-red-500 hover:text-red-700 transition-all duration-200"
                to={"/signup"}>
                <span className="hover:text-red-500 transition-all duration-200 hover:scale-105 mx-2">Sign up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
