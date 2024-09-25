import logo from "../assets/img/logo.png";
import cart_icon from "../assets/img/cart_icon.png";
import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../utils/redux/cartSlice";
import { setUser } from "../utils/redux/userSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity); //getting cart quantity from redux store
  const [menuactive, setMenuactive] = useState(false); //setting dropdown menuactive state for mobile devices
  const [loaded, setLoaded] = useState(false); //using loaded flag to prevent overwriting cart in local storage
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const AuthToken = Cookies.get("authtoken");
    if (AuthToken) {
      const payload = jwtDecode(AuthToken);
      dispatch(setUser(payload.user));
    }
  }, [dispatch]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch(setCart(parsedCart));
        console.log("Cart loaded from local storage");
      }
      setLoaded(true);
    }
  }, [dispatch]); // Added dispatch as a dependency for safety

  // Save cart to localStorage when cart or loaded changes
  useEffect(() => {
    if (loaded) {
      const saveCartToLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart saved to local storage");
      };

      const timeoutId = setTimeout(saveCartToLocalStorage, 1000);
      return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or before the next effect
    }
  }, [cart, loaded]); // Depend on both cart and loaded to trigger correctly

  const handleLogout = () => {
    Cookies.remove("authtoken");
    dispatch(setUser({ id: 0, firstName: "Guest", lastName: "", email: "" }));
  };

  return (
    <nav className="flex justify-around items-center border shadow-md sticky top-0 left-0 right-0 bg-slate-50 z-50 uppercase">
      <Link to="/">
        <div className="flex items-center md:m-2 p-1 md:p-2 cursor-pointer">
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

        {user.id !== 0 ? (
          <>
            <li
              className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
            >
              <NavLink className="p-5" to="/profile">
                Profile ({user.firstName})
              </NavLink>
            </li>
            <li
              className={`cursor-pointer text-red-500 hover:scale-105 hover:text-red-700 `}
              onClick={() => { handleLogout() }}
            >
              LogOut
            </li>
          </>
        ) : (<li
          className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
        ><NavLink to="/signin">
            Login
          </NavLink>
        </li>)}
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
            className="flex flex-col absolute top-15 right-2 bg-white px-5 py-2 rounded-md shadow-xl swing-in-top"
          >
            <ul className="text-sm space-y-2">
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
              
              {user.id !== 0 ? (
                <>
                  <li
                    className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
                  >
                    <NavLink className="p-0" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li
                    className={`cursor-pointer text-red-500 hover:scale-105 hover:text-red-700 `}
                    onClick={() => { handleLogout()}}
                  >
                    LogOut
                  </li>
                </>
              ) : (<li
                className={`cursor-pointer hover:scale-105 hover:text-blue-500 `}
              ><NavLink to="/signin" className="p-0">
                  Login
                </NavLink>
              </li>)}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
