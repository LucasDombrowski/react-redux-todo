import { useEffect, useRef } from "react";
import { Product } from "../../store/productSlice";
import ProductCard from "./ProductCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductListingProps {
  items: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.15, // Délai progressif entre chaque carte
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListing;
