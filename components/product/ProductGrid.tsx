import { ProductCard } from "./ProductCard";
import { Product } from "../../types/store";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">
          No products found
        </h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
