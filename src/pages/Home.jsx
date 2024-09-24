import { Link } from "react-router-dom"
import LadyAnimation from "../components/HeroAnimation"

function Home() {
  return (
    <main className='min-h-screen w-[95vw] flex flex-col md:flex-row gap-16 items-center overflow-hidden m-0'>
      <div className='h-full md:pl-10 flex flex-col justify-center mb-10 flex-grow'>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500  font-poppins">Discover</h2>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500  font-poppins">Most Suitable</h2>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500  font-poppins">Products</h2>
        <p className="text-lg font-serif md:text-3xl my-10">Shop for the best products at the best prices.</p>
        <Link to="/products"><button className="bg-yellow-500  hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded shadow-xl active:scale-95">Shop Now</button></Link>
      </div>
      <div className='order-first md:order-last flex-grow-0 w-1/2 flex justify-center items-center  overflow-hidden'>
        <LadyAnimation />
      </div>

    </main>
  )
}

export default Home