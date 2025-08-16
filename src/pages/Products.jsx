import { useEffect, useState, useCallback, useRef } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import { useGetProductsQuery } from "../utils/redux/apiSlice";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchBy, setSearchBy] = useState("name");
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 20;

  const {
    data,
    error,
    isLoading: loadingApi,
    isFetching,
  } = useGetProductsQuery({ limit: LIMIT, skip }, {
    refetchOnMountOrArgChange: true,
  });

  const observer = useRef();
  const lastProductRef = useCallback((node) => {
    if (loadingApi || isFetching) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setSkip(prevSkip => prevSkip + LIMIT);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loadingApi, isFetching, hasMore]);

  useEffect(() => {
    if (data) {
      if (data.products.length < LIMIT) {
        setHasMore(false);
      }
      setFilteredProducts(data.products);
    }
  }, [data]);

  const handleSearch = (e) => {
    if (!data) return;
    
    if (searchBy === "name") {
      setFilteredProducts(
        data.products.filter((product) =>
          product.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else if (searchBy === "description") {
      setFilteredProducts(
        data.products.filter((product) =>
          product.description
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  //showing loader while the data is being fetched
  if (loadingApi)
    return (
      <div className="h-screen gap-4 w-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  //rending the list of products
  return (
    <div className="flex flex-col items-center my-5">
      <div>
        <form className="form relative" onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="searchby"
            className=" mb-2 -translate-y-1/2 top-1/2 p-1 text-black"
          >
            Search By
          </label>
          <select
            id="searchby"
            onChange={(e) => {
              setSearchBy(e.target.value);
            }}
            className="bg-slate-200 mb-2 text-black border-2 rounded-full py-2 shadow-md px-5 mx-2 focus:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          >
            <option value="name">Product Name</option>
            <option value="description">Description</option>
          </select>

          <input
            onChange={(e) => {
              handleSearch(e);
            }}
            className="w-full md:w-72 bg-slate-200 placeholder:text-gray-900 rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md placeholder:capitalize"
            placeholder={`Search Product ${searchBy}...`}
            type="text"
          />
          <button
            onClick={() => {
              setSearchBy("name");
              // setFilteredProducts(data.products);
            }}
            type="reset"
            className="absolute right-4 top-16 md:right-3 md:-translate-y-1/2 md:top-1/2 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      <div>
        {error && <p className="text-red-500 text-xl">{error.message}</p>}
        <ProductList 
          products={filteredProducts} 
          lastProductRef={lastProductRef}
        />
        {(loadingApi || isFetching) && (
          <div className="flex justify-center p-4">
            <Loading />
          </div>
        )}
        {!hasMore && (
          <p className="text-center text-gray-500 p-4">
            No more products to load
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
