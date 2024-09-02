import { useRouteError } from "react-router-dom"
import { Link } from "react-router-dom";
import error_image from "../assets/img/error.jpg";

function NotFound() {
  const error = useRouteError(); // returns an object with error data
  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <img src={error_image} alt="error" className="w-96"/>
      <p className="text-xl md:text-3xl font-bold text-gray-500 my-5">Oops... Something went wrong</p>
      <h1 className="text-3xl md:text-5xl lg:text-9xl font-bold text-red-500 my-5">{error.status} {error.statusText}</h1>
      <p className="text-xl md:text-3xl font-bold text-gray-500 my-5">{error.data}</p>
      <Link to={"/"}>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Back to Home</button>
      </Link>
    </div>
  )
}

export default NotFound