import { useState } from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const handleSignIn = async(e) => {
    e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/api/user/signin", {
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
      if (!response.ok) {
        throw new Error("Failed to fetch data from API. The Api responded with code " + response.status + " and message is " + response.statusText);
      }else{
          const data = await response.json();
          alert("Login Successful");
          navigate("/");
      }
    
  } catch (error) {
    console.log(error)
    setError("something went wrong");
  }
        
   }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center">
        <div className="bg-gray-300 border-[4px] border-yellow-500 rounded-2xl hover:border-red-500 transition-all duration-200">
          <div className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-white flex-col">
            <img src={logo} alt="logo" />
            <h1 className="text-black text-2xl">Sign in to ShoppyGlobe</h1>
            <input
              className="w-full p-2 bg-red-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 bg-red-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-red-500 transition-all duration-200"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <input
              className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-red-500 transition-all duration-200"
              type="submit"
              onClick={(e) => {handleSignIn(e)}}
            />
            <p>
              Don't have an account?
              <Link
                className="font-semibold text-green-500 hover:text-red-500 transition-all duration-200"
                to={"/signup"}
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

export default SignIn;
