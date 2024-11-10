'use client';

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/all-types";
import { toast } from "react-hot-toast";
import qs from "qs";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Tag, Package2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const getImageUrl = (imageUrl: string | undefined): string =>
  imageUrl?.startsWith("http")
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl || "/default-image.jpg"}`;

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};


export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const sliderRef = useRef<Slider | null>(null);

  const productId = Array.isArray(params?.documentId) ? params.documentId[0] : params?.documentId;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [description, setDescription] = useState<any | null>(null);

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId]);

  async function fetchProduct(id: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const path = `/api/products/${id}`;

      const url = new URL(path, baseUrl);
      url.search = qs.stringify({
        populate: {
          productImage: { fields: ["url", "alternativeText"] },
        },
      });

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      setProduct(data.data);
      setDescription(data.data.description || null);

      fetchRelatedProducts(data.data.productCategory, data.data.documentId);
    } catch (error) {
      console.error("Error fetching the product:", error);
      toast.error("Error fetching the product.");
    }
  }

  async function fetchRelatedProducts(category: string, currentProductId: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const path = `/api/products`;

      const url = new URL(path, baseUrl);
      url.search = qs.stringify({
        filters: { productCategory: { $eq: category } },
        populate: {
          productImage: { fields: ["url", "alternativeText"] },
        },
      });

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch related products");

      const data = await res.json();
      const filteredProducts = data.data.filter(
        (p: Product) => p.documentId !== currentProductId
      );

      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(relatedProducts.length, 3),
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(relatedProducts.length, 2) } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="pt-24">
        {product ? (
          <>
            {/* Breadcrumb */}
            <div className="bg-white border-b">
              <div className="container mx-auto px-4 py-3">
                <nav className="text-sm text-gray-500">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <Link href={`/product/category/${product.productCategory}`} className="hover:text-[#A8CF45]">{product.productCategory}</Link>
                    </li>
                    <ChevronRight className="h-4 w-4" />
                    <li className="text-gray-900">{product.productTitle}</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Image */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-square">
                    <img
                      src={getImageUrl(product.productImage?.url)}
                      alt={product.productImage?.alternativeText || product.productTitle}
                      className="w-full h-full object-contain p-8"
                      onError={(e) => (e.currentTarget.src = "/default-image.jpg")}
                    />
                  </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="flex flex-col space-y-6">
                  {/* Title and Category */}
                  <div>
                    <div className="flex items-center gap-2 text-[#A8CF45] text-sm font-medium mb-2">
                      <Tag className="h-4 w-4" />
                      {product.productCategory}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {product.productTitle}
                    </h1>
                    <p className="text-gray-600 text-lg">
                      {product.productDescription}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="bg-gray-50 rounded-lg py-6 space-y-4">
                    <div className="flex justify-between items-baseline border-b border-gray-200 pb-4">
                      <span className="text-gray-600 font-medium">Price</span>
                      <span className="text-3xl font-semibold text-[#A8CF45]">
                        {formatPrice(product.productPrice)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <span className="text-gray-500 block mb-1">SKU</span>
                        <span className="font-medium text-gray-900">{product.SKU}</span>
                      </div>
                     
                    </div>
                  </div>

                  

                  {/* Additional Info */}
                  {description && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="prose prose-lg max-w-none">
                        {renderDescription(description)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A8CF45]" />
          </div>
        )}
      </main>
    </div>
  );
}


function renderDescription(blocks: any[]) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4">
            {renderChildren(block.children)}
          </p>
        );

      case "heading":
        const HeadingTag = (`h${block.level || 2}` as keyof JSX.IntrinsicElements); // Dynamically set heading level
        return (
          <HeadingTag key={index} className="mt-6 mb-2 font-semibold">
            {renderChildren(block.children)}
          </HeadingTag>
        );

      case "list":
        return (
          <ul key={index} className="">
            {block.children.map((listItem: any, listItemIndex: number) => (
              <li key={listItemIndex}>
                {renderChildren(listItem.children)}
              </li>
            ))}
          </ul>
            
        );

      default:
        return <p key={index}>Unsupported block type: {block.type}</p>;
    }
  });
}

/* Helper function to render children elements */
function renderChildren(children: any[]) {
  return children.map((child, childIndex) => (
    <p
      key={childIndex}
      style={{ fontWeight: child.bold ? "bold" : "normal" }}
    >
      {child.text}
    </p>
  ));
}
