import logo from "../assets/img/logo.png";
import cart_icon from "../assets/img/cart_icon.png";
import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../utils/redux/cartSlice";


const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity); //getting cart quantity from redux store
  const [menuactive, setMenuactive] = useState(false); //setting dropdown menuactive state for mobile devices
  const [loaded, setLoaded] = useState(false);//using loaded flag to prevent overwriting cart in local storage
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  //function to load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(setCart(parsedCart));
      console.log("Cart loaded from local storage");
      setLoaded(true);
    }
    
  }, []);


  //function to save cart to local storage
  useEffect(() => {
    if(loaded){
      setTimeout(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart saved to local storage");
      }, 1000);
    }
  }, [cart]);
  
  
  return (
    <nav className="flex justify-around items-center border shadow-md sticky top-0 left-0 right-0 bg-slate-50 z-50 uppercase">
      <Link to="/">
        <div
          className="flex items-center md:m-2 p-1 md:p-2 cursor-pointer"
        >
          <img src={logo} alt="logo" />
          <h1 className="mx-3 text-lg lg:text-3xl font-sans font-extrabold">
            ShoppyGlobe
          </h1>
        </div>
      </Link>
      <ul className="hidden md:flex space-x-10 font-serif font-medium items-center">
        <li className={`cursor-pointer hover:scale-105 hover:text-blue-500`}>
          <NavLink className="p-5" to="/">
            Home
          </NavLink>
        </li>
        <li className={`cursor-pointer hover:scale-105 hover:text-blue-500`}>
          <NavLink className="p-5" to="/products">
            Products
          </NavLink>
        </li>
        <li className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}>
          <NavLink className="p-5" to="/bestsellers">
            BestSellers
          </NavLink>
        </li>
        <li className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}>
          <NavLink className="p-5" to="/featured">
            Featured
          </NavLink>
        </li>
      </ul>
      <div className="m-2 p-2 cursor-pointer relative">
        <NavLink to="/cart">
          <img className="hover:scale-110" src={cart_icon} alt="cart icon" />
          {cartQuantity > 0 && (
            <span className="absolute top-0 right-[15px] bg-green-500 p-1 font-bold text-lg text-white rounded-full w-5 h-5 flex justify-center items-center">
              {cartQuantity}
            </span>
          )}
        </NavLink>
      </div>

      {/* Dropdown menu for mobile view */}
      <div
        className="block md:hidden text-6xl m-2 text-center pb-3 relative"
        onClick={() => {
          menuactive ? setMenuactive(false) : setMenuactive(true);
        }}
        onBlur={() => setMenuactive(false)}
      >
        <span>&equiv;</span>
        {menuactive && (
          <div
            id="dropdown"
            className="flex flex-col absolute top-15 right-0 bg-white p-5 rounded-md shadow-xl swing-in-top"
            
          >
            <ul className="text-xl">
              <li
                className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
              >
                <NavLink className="p-0" to="/">
                  Home
                </NavLink>
              </li>
              <li
                className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
              >
                <NavLink className="p-0" to="/products">
                  Products
                </NavLink>
              </li>
              <li
                className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
              >
                <NavLink className="p-0" to="/featured">
                  Featured
                </NavLink>
              </li>
              <li
                className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
              >
                <NavLink className="p-0" to="/bestsellers">
                  Best Sellers
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
