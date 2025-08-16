import logo from "../assets/img/logo.png";
import cart_icon from "../assets/img/cart_icon.png";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../utils/redux/cartSlice";
import { setUser } from "../utils/redux/userSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity); //getting cart quantity from redux store
  const [menuactive, setMenuactive] = useState(false); //setting dropdown menuactive state for mobile devices
  const [loaded, setLoaded] = useState(false); //using loaded flag to prevent overwriting cart in local storage
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null); // Add ref for dropdown container

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

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuactive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async() => {
    Cookies.remove("authtoken");
    const response = await fetch("./api/user/logout")
    const data = await response.json()
    toast.success(data.message)
    dispatch(setUser({ id: 0, firstName: "Guest", lastName: "", email: "" }));
  };

  return (
    // Update the main nav container
    <nav className="flex flex-wrap justify-between md:justify-around items-center border shadow-md sticky top-0 left-0 right-0 bg-slate-50 z-50 uppercase px-4 py-2">
      {/* Logo section - make it more responsive */}
      <Link to="/" className="flex-shrink-0">
        <div className="flex items-center p-1 md:p-2 cursor-pointer">
          <img src={logo} alt="logo" className="h-8 md:h-10 w-auto" />
          <h1 className="mx-2 md:mx-3 text-base md:text-lg lg:text-3xl font-sans font-extrabold truncate">
            ShoppyGlobe
          </h1>
        </div>
      </Link>

      {/* Desktop Menu - improved spacing */}
      <ul className="hidden md:flex space-x-4 lg:space-x-10 font-serif font-medium items-center">
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

      {/* Cart Icon - make it responsive */}
      <div className="flex-shrink-0 m-1 md:m-2 p-1 md:p-2 cursor-pointer relative">
        <NavLink to="/cart">
          <img 
            className="hover:scale-110 w-6 h-6 md:w-8 md:h-8" 
            src={cart_icon} 
            alt="cart icon" 
          />
          {cartQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 p-0.5 md:p-1 text-sm md:text-lg font-bold text-white rounded-full min-w-[20px] min-h-[20px] flex justify-center items-center">
              {cartQuantity}
            </span>
          )}
        </NavLink>
      </div>

      {/* Mobile Menu Button - adjust positioning */}
      <div className="block md:hidden relative ml-2" ref={dropdownRef}>
        <button
          onClick={() => setMenuactive(!menuactive)}
          className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuactive ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300 ${menuactive ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300 ${menuactive ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown - improve responsiveness */}
      <div
        className={`absolute top-full right-0 w-full md:w-48 bg-white rounded-lg shadow-lg py-2 mt-2 transition-all duration-300 transform origin-top-right
          ${menuactive ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
          mx-auto left-0 md:left-auto max-w-sm`}
      >
        <ul className="text-sm divide-y divide-gray-100">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/featured", label: "Featured" },
            { to: "/bestsellers", label: "Best Sellers" },
          ].map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-blue-50 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          
          {user.id !== 0 ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block px-4 py-2 hover:bg-blue-50 transition-colors duration-200 ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-blue-50 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
