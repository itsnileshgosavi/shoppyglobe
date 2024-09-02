import star_filled from "../assets/img/starfilled.png"
import star from "../assets/img/star.png"

const RatingStars = ({ rating }) => {
    const arr =new Array(5).fill(0); //creating dummy array of length 5 to render stars
  return (
    <div className='flex justify-start items-center my-2'>
      {arr.map((x, i) => i < Math.round(rating) ? <img className='w-5 h-5' key={i} src={star_filled} alt="star filled" /> : <img key={i} src={star} alt="star" className='w-4 h-4' />)}
    </div>
  )
}

export default RatingStars