import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { addProduct } from "../utils/redux/cartSlice";
import {
  removeProduct,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../utils/redux/cartSlice";
import { useSelector } from "react-redux";
import RatingStars from "../components/RatingStars";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "../components/QuantitySelector";
import useFetch from "../utils/helper/useFetch";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();// getting id from url
  const [product, setProduct] = useState({});
  const dispatch = useDispatch(); //initializing dispatch
  const cart = useSelector((state) => state.cart);//getting cart from redux store
  const Navigate = useNavigate();

  const {data, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);//fetching data from api using custom hook

  //using use effect to set product whenever the data changes
  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);
 
console.log(data)
  //function to handle Buy now click
  const handleBuyNow = () => {
    if (!cart.products.some((p) => p.id === product.id)) {
      dispatch(addProduct({ ...product, quantity: 1 }));
    }
    Navigate("/checkout");
  };
  //showing error to the user in case of an error
  if (error)
    return (
      <div className="text-red-500 min-h-screen flex justify-center items-center text-5xl">
        {error.message}
      </div>
    );
//Rendering loader while the data is being fetched from api
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-center min-h-[70vh]">
        <img src={product.thumbnail} alt="" className="w-full md:w-1/2" />
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-2xl md:text-3xl uppercase my-5 font-bold">
            {product.title}
          </h1>
          <RatingStars rating={product.rating} />
          <p className="text-lg capitalize font-semibold my-5">
            {product.description}
          </p>
          <div className="flex justify-start flex-col md:flex-row items-center my-2">
            <p className="text-3xl font-extrabold my-5">${product.price}</p>
            {cart.products.some((p) => p.id === product.id) ? (
              <>
                <QuantitySelector
                quantity={
                  cart.products.find((p) => p.id === product.id).quantity
                }
                reduceQuantity={() => dispatch(decreaseCartQuantity(product))}
                increaseQuantity={() => dispatch(increaseCartQuantity(product))}
              />
               <Link to="/cart">
                <button className="bg-green-500 my-5 hover:bg-green-700 rounded-md shadow-lg text-white font-bold px-5 mx-5 py-2 active:scale-95">Go to cart </button>
               </Link>
              </>
            ) : (
              <button
                onClick={() =>
                  dispatch(addProduct({ ...product, quantity: 1 }))
                }
                className="bg-green-500 hover:bg-green-700 my-5 rounded-md shadow-lg text-white font-bold px-5 mx-5 py-2 active:scale-95"
              >
                Add To Cart
              </button>
            )}
          </div>
          <div className="flex justify-start w-full">
            <button
              onClick={handleBuyNow}
              className="bg-yellow-500 hover:bg-yellow-700 rounded-md shadow-lg text-white font-bold px-5 py-2 w-full md:w-1/2 active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mx-auto my-5">
        <h5 className="text-3xl font-bold">Product Details</h5>
        <div className="grid grid-cols-2 my-5 capitalize">
          <div>
            {product.brand && <p className="text-sm md:text-xl font-medium">Brand:</p>}
            <p className="text-sm md:text-xl font-medium">Category:</p>
            <p className="text-sm md:text-xl font-medium">Shipping:</p>
            <p className="text-sm md:text-xl font-medium">Weight:</p>
            <p className="text-sm md:text-xl font-medium">Width:</p>
            <p className="text-sm md:text-xl font-medium">Height:</p>
            <p className="text-sm md:text-xl font-medium">Depth:</p>
            <p className="text-sm md:text-xl font-medium">Warranty:</p>
            <p className="text-sm md:text-xl font-medium">Return Policy:</p>
          </div>
          <div>
            {product.brand && <p className="text-sm md:text-xl font-semibold">{product.brand}</p>}
            <p className="text-sm md:text-xl font-semibold">{product.category}</p>
            <p className="text-sm md:text-xl font-semibold">{product.shippingInformation}</p>
            <p className="text-sm md:text-xl font-semibold">{product.weight}</p>
            {product.dimensions ? <p className="text-sm md:text-xl font-semibold">{product.dimensions.width}</p>: 'NA'}
            {product.dimensions ? <p className="text-sm md:text-xl font-semibold">{product.dimensions.height}</p> : 'NA'} 
            {product.dimensions ? <p className="text-sm md:text-xl font-semibold">{product.dimensions.depth}</p> : 'NA'}
            <p className="text-sm md:text-xl font-semibold">{product.warrantyInformation}</p>
            <p className="text-sm md:text-xl font-semibold">{product.returnPolicy}</p>
          </div>
            
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
