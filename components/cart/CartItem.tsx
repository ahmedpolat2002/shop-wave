"use client";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { useStore } from "@/contexts/StoreContext";
import { CartItem as CartItemType } from "@/types/store";
import { Trash, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useStore();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const subtotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-b-0 gap-4">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        <Link
          href={`/products/${product.id}`}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          {product.name}
        </Link>

        {/* Price and Quantity Controls */}
        <div className="flex flex-col sm:flex-row justify-between mt-2 gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="h-8 px-3 flex items-center justify-center border-y">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <PriceTag price={subtotal} />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
