import ProductItem from "./ProductItem";
//eslint-disable-next-line react/prop-types
const ProductList = ({ products, lastProductRef }) => {
  //rendering the list of products
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* eslint-disable-next-line react/prop-types */}
      {products?.map((product, index) => {
      {/* eslint-disable-next-line react/prop-types */}
        if (products.length === index + 1) {
          return (
            <div ref={lastProductRef} key={product.id}>
              <ProductItem product={product} />
            </div>
          );
        }
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;