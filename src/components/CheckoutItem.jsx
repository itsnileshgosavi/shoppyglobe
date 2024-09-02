//Component to display the checkout items

const CheckoutItem = ({product}) => {
  return (
    <div className='flex flex-row h-30 w-full md:w-[500px] bg-yellow-50 my-2 rounded-md'>
        <div className='flex items-center w-[20%]'>
           <img src={product.thumbnail} alt="" className='w-30 h-30' />
        </div>
        <div className='flex flex-col justify-center w-[60%]'>
            <p className="text-sm md:text-lg font-bold">{product.title}</p>
            <p className="text-sm md:text-lg">Quantity: {product.quantity}</p>
            <p className="text-sm md:text-lg font-medium">Price: ${product.price.toFixed(2)}</p>
        </div>
        <div className='flex flex-col justify-center items-center w-[20%]'>
            <p className="text-sm md:text-lg font-semibold">SubTotal</p>
            <p className="text-sm md:text-lg font-medium">${(product.price * product.quantity).toFixed(2)}</p>
        </div>
    </div>
  )
}

export default CheckoutItem