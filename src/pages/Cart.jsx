import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import cart_image from "../assets/img/empty-cart.png";

function Cart() {
  const cart = useSelector((state) => state.cart); //gettting cart from redux store
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        {cart.products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      {cart.products.length > 0 && (
        <div className="m-5 w-full flex justify-end flex-col bg-slate-200 items-end pr-10 py-10">
          <div className="flex gap-10">
            <div>
              <h6 className="text-xl text-black font-semibold">Cart Total:</h6>
            </div>
            <div>
              <p className="text-xl font-mono font-medium">${cart.total.toFixed(2)}</p>
            </div>
          </div>
          <Link to="/checkout">
            <button
              className={` p-3 shadow-xl rounded-lg text-white my-2 transition-all hover:scale-105 ease-in-out duration-500 ${
                cart.products.length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500"
              }`}
              disabled={cart.products.length === 0}
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
      {/* if the cart is empty showing the following to user */}
      {cart.products.length === 0 && (
        <div className="text-xl flex-col text-black min-h-screen flex items-center">
          <img src={cart_image} alt="cart" className="w-1/2" />
          <p>Your cart is empty</p>
          <Link to={"/products"}>
            <button className="bg-yellow-500 my-4 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded shadow-xl active:scale-95">
              Browse Products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
