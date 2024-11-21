import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/all-types";
import getValidImageUrl from "@/utils/getValidImageUrl";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.productImage?.url?.startsWith("http")
    ? product.productImage.url
    : `${process.env.NEXT_PUBLIC_BASE_URL}${
        product.productImage?.url || "/default-image.jpg"
      }`;

  return (
    <Link
      href={`/product/${product.documentId}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-square">
        <div className="absolute inset-0">
          <Image
            src={getValidImageUrl(imageUrl)}
            alt={product.productTitle}
            layout="fill"
            objectFit="contain"
            className="transform transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              console.error(`Image failed to load: ${imageUrl}`);
              e.currentTarget.src = "/default-image.jpg";
            }}
          />
        </div>

        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />

        {/* Sale Badge */}
        {product.isOnSale && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded">
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        {/* Category */}
        <span className="text-sm text-gray-500 mb-1">
          {product.productCategory || "Category"}
        </span>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {product.productTitle}
        </h3>

        <div className="mt-auto">
          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-gray-900 font-semibold">
              {formatPrice(product.productPrice)}
            </span>
          </div>

          {/* SKU */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              SKU: {product.SKU || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
