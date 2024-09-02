import { useDispatch } from "react-redux";
import {
  removeProduct,
  increaseCartQuantity,
  decreaseCartQuantity,
  addProduct,
} from "../utils/redux/cartSlice";
import QuantitySelector from "./QuantitySelector";
import { Link } from "react-router-dom";
import { useRef } from "react";

function CartItem({ product }) {
  const ref = useRef(null);
  const dispatch = useDispatch();// Initializing useDispatch hook
  return (
    <div ref={ref} className="w-full md:w-full mx-0 lg:w-[70vw] h-fit md:h-[200px] p-5 flex flex-col md:flex-row items-center overflow-hidden bg-slate-200 my-3 md:m-5 rounded-2xl justify-between">
      <Link to={`/products/${product.id}`} className="w-full md:w-[30%]">
      <div className="flex justify-center items-center">
        <img
          src={product.thumbnail}
          alt="thumbnail"
          className="md:w-60 w-auto h-20 md:h-60 p-2 hover:scale-105 transition-all duration-300"
        />
      </div>
      </Link>
      <Link to={`/products/${product.id}`} className="w-full md:w-[30%]">
      <div className="flex flex-col justify-start">
        <p className="font-bold md:text-xl text-sm hover:text-blue-500">{product.title}</p>
        <p className="text-sm md:text-xl my-3 font-semibold">${product.price}</p>
      </div>
      </Link>  
      <div className="flex flex-col items-center justify-center space-y-1 md:space-y-3 w-[20%]">
        <p className="text-sm md:text-xl">Quantity</p>
        <QuantitySelector
          quantity={product.quantity}
          reduceQuantity={() => {if(product.quantity === 1) {ref.current.classList.add("fade-out-left"); setTimeout(() => dispatch(removeProduct(product)), 700)} else {dispatch(decreaseCartQuantity(product))}}}
          increaseQuantity={() =>
            dispatch(increaseCartQuantity({ ...product, quantity: 1 }))
          }
        />
      </div>
      <div className="flex items-center justify-center w-[20%]">
        <button
          className="bg-red-500 px-5 h-7 md:h-10 block shadow-xl text-sm md:text-xl rounded-lg text-white my-3 hover:scale-105 transition-all duration-300"
          onClick={() => {ref.current.classList.add("fade-out-left"); setTimeout(() => dispatch(removeProduct(product)), 700)} }
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
