import { Review } from "@prisma/client";
import { calculateRatingsReviewAverage } from "../../../utils/calculateRatingsReview";
import Stars from "../../Stars";

export default function Rating({reviews} :{reviews: Review[]}) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ? "Review" : "s"}</p>
      </div>
    </div>
  );
}
