import Lottie from 'lottie-react';
import animationData from '../assets/Lottie/myjson.json'; 

const LadyAnimation = () => {
  return (
    <div className='relative w-56 md:w-fit'>
      <Lottie animationData={animationData['animation-lady']} loop={true}  />
    </div>
  );
};

export default LadyAnimation;