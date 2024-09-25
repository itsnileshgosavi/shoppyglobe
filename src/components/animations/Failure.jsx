import { useState } from "react";
import Lottie from "lottie-react";
import failure from "../../assets/Lottie/failure.json";

function Failure({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAnimationComplete = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return message;
  }

  return (
    <Lottie
      animationData={failure}
      loop={false}
      className="w-10 h-10"
      onComplete={handleAnimationComplete}
    />
  );
}

export default Failure;