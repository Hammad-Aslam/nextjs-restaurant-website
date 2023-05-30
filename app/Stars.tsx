// import full-star from "../../public/"
import fullStar from "../../next-app-13/public/icons/full-star.png";
import halfStar from "../../next-app-13/public/icons/half-star.png";
import emptyStar from "../../next-app-13/public/icons/empty-star.png";
import Image from "next/image";
import { calculateRatingsReviewAverage } from "../utils/calculateRatingsReview";
import { Review } from "@prisma/client";
export default function Stars({ reviews, rating }: { reviews: Review[], rating ?: number }) {
  const reviewRating = rating || calculateRatingsReviewAverage(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }

    return stars.map((star) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" />;
    });
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
