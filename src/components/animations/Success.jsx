import Lottie from "lottie-react"
import success from "../../assets/Lottie/success.json"

function Success({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAnimationComplete = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return message;
  }

  return (
    <Lottie
      animationData={success}
      loop={false}
      className="w-10 h-10"
      onComplete={handleAnimationComplete}
    />
  );
}

export default Success