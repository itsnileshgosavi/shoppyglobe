import { Link } from "react-router-dom"

function Home() {
  return (
    <main className='min-h-screen w-[95vw] flex flex-col md:flex-row items-center overflow-hidden m-0'>
      <div className='h-full md:pl-10 flex flex-col justify-center'>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 uppercase font-poppins">Discover</h2>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 uppercase font-poppins">Most Suitable</h2>
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 uppercase font-poppins">Products</h2>
        <p className="text-lg font-poppins md:text-3xl my-10">Shop for the best products at the best prices.</p>
        <Link to="/products"><button className="bg-yellow-500  hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded shadow-xl active:scale-95">Shop Now</button></Link>
      </div>
      <div className='order-first md:order-last flex flex-col md:flex-row  overflow-hidden'>
        <img className="w-52 h-52" src="https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png" alt="hero product" />
        <img className="hidden lg:inline-block w-52 h-52" src="https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png" alt="" />
        <img className="hidden lg:inline-block w-52 h-52" src="https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png" alt="" />
      </div>

    </main>
  )
}

export default Home