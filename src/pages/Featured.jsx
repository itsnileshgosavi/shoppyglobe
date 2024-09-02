import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import useFetch from "../utils/helper/useFetch";

const Featured = () => {
  const [products, setProducts] = useState([]);

  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products?limit=8&skip=108"
  ); //fetching data from api using custom hook

  //using useeffect to setproducts whenever the data changes
  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  //showing loader while the data is being fetched
  if (loading)
    return (
      <div className="h-screen gap-4 w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  return (
    <div className="flex flex-col items-center my-5">
      {error && <p className="text-red-500 text-xl">{error.message}</p>}
      <ProductList products={products} />
    </div>
  );
};

export default Featured;
