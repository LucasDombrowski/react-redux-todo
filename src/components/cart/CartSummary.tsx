import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
  const summaryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(summaryRef.current, { opacity: 0, scale: 0.9, duration: 0.6, ease: "power2.out" });
  }, []);

  return (
    <div ref={summaryRef} className="bg-white p-6 rounded-lg shadow-lg h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Résumé du panier</h2>
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Total articles :</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between text-gray-700 mb-4">
        <span>Prix total :</span>
        <span className="font-bold">{totalPrice} EUR</span>
      </div>
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        Passer la commande
      </button>
    </div>
  );
};

export default CartSummary;
