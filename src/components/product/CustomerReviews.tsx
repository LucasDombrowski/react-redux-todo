import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const reviewsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(reviewsRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" });
  }, []);

  return (
    <div ref={reviewsRef} className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Avis clients</h2>
      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-4 shadow">
              <p className="font-semibold text-gray-700">{review.reviewerName}</p>
              <p className="text-gray-600 italic">{review.comment}</p>
              <p className="text-yellow-500">★ {review.rating} / 5</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun avis pour ce produit.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
