import { useSelector } from "react-redux";
import CheckoutItem from "../components/CheckoutItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../utils/redux/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Checkout() {
  const cart = useSelector((state) => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id == 0) {
      navigate("/signin");
    }
  }, [user, navigate]);

  //function to handle form submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    //checking the form data
    if (!formData.fname || !formData.fname.trim()) {
      setError("Please enter your first name");
      return;
    }

    if (!formData.lname || !formData.lname.trim()) {
      setError("Please enter your last name");
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!formData.phone || !formData.phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    if (!formData.address || !formData.address.trim()) {
      setError("Please enter your address");
      return;
    }

    if (!formData.pincode || !formData.pincode.trim()) {
      setError("Please enter your pincode");
      return;
    }

    setError("");
    setOrderPlaced(true);
    dispatch(emptyCart()); //empty cart on successful order
  };

  //conditional rendering thank you message
  if (orderPlaced) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl md:text-2xl font-bold my-5">
          Thank you {formData.fname} for your order!
        </p>
        <h1 className="text-3xl font-bold my-5">Order Placed !!</h1>
        
        <Link to="/products">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded shadow-xl active:scale-95">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-screen overflow-hidden flex-col">
      <h1 className="text-3xl font-bold my-5 order-first">Checkout</h1>
      <div className="flex justify-center flex-col md:flex-row w-full ">
      <div className="flex justify-center items-center w-full md:w-[60%]">
        <div className="cartitems flex flex-col items-center px-5 my-10 bg-red-100 rounded-lg">
          <p className="text-3xl text-gray-700 uppercase my-3 font-bold">
            Order Summary
          </p>
          <p className="text-xl my-3">Items: {cart.products.length}</p>
          <div>
            {cart.products.map((product) => (
              <CheckoutItem key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-between w-full my-10">
            <div className="w-1/2">
              <h6 className="text-xl text-black font-semibold">Cart Total:</h6>
              <h6 className="text-xl text-black font-semibold">Discount :</h6>
              <h6 className="text-xl text-black font-semibold">Shipping Charge : </h6>
              <h6 className="text-xl text-black font-semibold">Total : </h6>
            </div>
            <div className="w-1/2">
              <p className="text-xl font-medium font-mono">${cart.total.toFixed(2)}</p>
              <p className="text-xl font-medium font-mono">0</p>
              <p className="text-xl font-medium font-mono">
                <span className="">Free</span>
              </p>
              <p className="text-xl font-medium font-mono">${cart.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="checkoutForms flex flex-col w-full md:w-[40%] order-last">
        <div className="flex flex-col items-center justify-center h-screen dark">
          {!orderPlaced && (
            <div className="w-full max-w-md bg-yellow-100 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Enter Personal Details
              </h2>
              <form
                onSubmit={(e) => handlePlaceOrder(e)}
                className="flex flex-col"
              >
                <div className="flex space-x-4 mb-4">
                  <input
                    placeholder="First Name"
                    className="bg-gray-200 text-gray-900 border-0 rounded-md p-2 w-1/2 focus:bg-gray-400 focus:outline-none focus:ring-1 placeholder:text-gray-600 focus:ring-yellow-500 transition ease-in-out duration-150"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, fname: e.target.value })
                    }
                  />
                  <input
                    placeholder="Last Name"
                    className="bg-gray-200 text-gray-900 border-0 rounded-md p-2 w-1/2 focus:bg-gray-400 focus:outline-none focus:ring-1 placeholder:text-gray-600 focus:ring-yellow-500 transition ease-in-out duration-150"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, lname: e.target.value })
                    }
                  />
                </div>
                <input
                  placeholder="Email"
                  className="bg-gray-200 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-400 focus:outline-none focus:ring-1 placeholder:text-gray-600 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  placeholder="Phone"
                  className="bg-gray-200 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-400 focus:outline-none focus:ring-1 placeholder:text-gray-600 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="tel"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <textarea
                  placeholder="Address"
                  className="bg-gray-200 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-400 focus:outline-none focus:ring-1 placeholder:text-gray-600 focus:ring-blue-500 transition ease-in-out duration-150"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <input
                  placeholder="Pincode"
                  className="bg-gray-200 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-400 focus:outline-none focus:ring-1 placeholder:text-gray-600 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                  className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:from-yellow-600  hover:to-red-600 transition ease-in-out duration-300"
                  type="submit"
                >
                  Place Order
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Checkout;
