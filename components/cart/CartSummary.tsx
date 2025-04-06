import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriceTag } from "@/components/ui/price-tag";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/contexts/StoreContext";
import Link from "next/link";

export function CartSummary() {
  const { totalItems, totalAmount } = useStore();

  // Calculate shipping and taxes
  const shipping = totalAmount > 100 ? 0 : 10;
  const tax = totalAmount * 0.08; // 8% tax
  const orderTotal = totalAmount + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({totalItems} items)
          </span>
          <PriceTag price={totalAmount} />
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 dark:text-green-400 font-medium">
              Free
            </span>
          ) : (
            <PriceTag price={shipping} />
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (estimated)</span>
          <PriceTag price={tax} />
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Order Total</span>
          <PriceTag price={orderTotal} size="lg" />
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Add{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(100 - totalAmount)}{" "}
            more to qualify for free shipping
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          asChild
          disabled={totalItems === 0}
        >
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
