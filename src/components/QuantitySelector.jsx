
function QuantitySelector({quantity, reduceQuantity, increaseQuantity}) {
  return (
    <div className='flex items-center mx-2'>
        <button onClick={reduceQuantity} className="bg-slate-400 hover:bg-slate-500 text-gray-800 font-bold py-1 md:py-2 px-4 rounded-l">-</button>
        <input type="text" value={quantity} className="w-10 h-7 md:h-10 text-center" readOnly />
        <button onClick={increaseQuantity} className="bg-slate-400 hover:bg-slate-500 text-gray-800 font-bold py-1 md:py-2 px-4 rounded-r">+</button>
    </div>
  )
}

export default QuantitySelector