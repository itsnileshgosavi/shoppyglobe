import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import cart_image from "../assets/img/empty-cart.png";


function Cart() {
  const cart = useSelector((state) => state.cart); //gettting cart from redux store
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        {cart.products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      {cart.products.length > 0 && (
        <div className="m-3 sm:m-5 w-full flex justify-end flex-col bg-slate-200 items-end px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 rounded-lg">
          <div className="flex gap-4 sm:gap-6 lg:gap-10 items-center">
            <div>
              <h6 className="text-base sm:text-lg lg:text-xl text-black font-semibold">Cart Total:</h6>
            </div>
            <div>
              <p className="text-base sm:text-lg lg:text-xl font-mono font-medium">${cart.total.toFixed(2)}</p>
            </div>
          </div>
          {user.id !== 0 ? (
            <Link to="/checkout" className="w-full sm:w-auto">
              <button
                className={`w-full sm:w-auto p-2 sm:p-3 shadow-xl rounded-lg text-white my-2 transition-all hover:scale-105 ease-in-out duration-500 text-sm sm:text-base ${
                  cart.products.length === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                disabled={cart.products.length === 0}
              >
                Checkout
              </button>
            </Link>
          ):(
            <Link to="/signin" className="w-full sm:w-auto">
              <button
                className={`w-full sm:w-auto p-2 sm:p-3 shadow-xl rounded-lg text-white my-2 transition-all hover:scale-105 ease-in-out duration-500 text-sm sm:text-base ${
                  cart.products.length === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                disabled={cart.products.length === 0}
              >
               Sign In to Checkout
              </button>
            </Link>
          )}
        </div>
      )}
      {/* if the cart is empty showing the following to user */}
      {cart.products.length === 0 && (
        <div className="text-base sm:text-lg lg:text-xl flex-col text-black min-h-[50vh] sm:min-h-[60vh] lg:min-h-screen flex items-center justify-center">
          <img src={cart_image} alt="cart" className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" />
          <p className="mt-4">Your cart is empty</p>
          <Link to={"/products"}>
            <button className="bg-yellow-500 my-4 hover:bg-yellow-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded shadow-xl active:scale-95 text-sm sm:text-base transition-all duration-300">
              Browse Products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
