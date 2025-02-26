import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Product {
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  description: string;
  brand: string;
  rating: number;
  stock: number;
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(infoRef.current, { opacity: 0, x: -50, duration: 0.8, ease: "power2.out" });
  }, []);

  return (
    <div ref={infoRef} className="md:w-1/2">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
      <p className="text-gray-500 text-sm mb-4">Catégorie : {product.category}</p>
      <p className="text-xl font-semibold text-red-600 mb-4">
        Prix : {product.price} EUR <span className="text-sm text-gray-500">(-{product.discountPercentage}%)</span>
      </p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-gray-500 text-sm mb-2">Marque : {product.brand}</p>
      <p className="text-gray-500 text-sm mb-2">Évaluation : {product.rating} / 5</p>
      <p className="text-gray-500 text-sm mb-4">Stock restant : {product.stock}</p>
    </div>
  );
};

export default ProductInfo;
