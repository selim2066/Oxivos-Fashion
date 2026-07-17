import { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductDetailsClient } from "./ProductDetailsClient";
import { EmptyState } from "@/components/ui/EmptyState";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === parseInt(resolvedParams.id, 10));

  return {
    title: product ? `${product.name} | ELEVATE` : "Product Not Found | ELEVATE",
    description: product
      ? product.description
      : "Premium technical apparel at the intersection of high fashion and the natural world.",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === parseInt(resolvedParams.id, 10));

  if (!product) {
    return (
      <main className="flex-grow pt-32 pb-section-gap">
        <EmptyState
          title="Product Not Found"
          description="The product you are looking for does not exist or may have been removed."
          actionLabel="Return to Shop"
          actionHref="/products"
        />
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 md:pt-32">
      <ProductDetailsClient product={product} />
    </main>
  );
}
