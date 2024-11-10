'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/product-component.tsx/productCard';
import { Product } from '@/types/all-types';
import qs from 'qs';
import Navbar from '@/components/navbar';
import { Loader2, Package } from 'lucide-react';

export default function ProductsByCategoryPage() {
  const { productCategory } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const path = "/api/products";
        
        const query = qs.stringify({
          filters: {
            productCategory: productCategory,
          },
          populate: {
            productImage: {
              fields: ["url", "alternativeText"],
            },
          },
        });

        const url = `${baseUrl}${path}?${query}`;
        const res = await fetch(url);
        
        if (!res.ok) throw new Error("Failed to fetch products");
        
        const data = await res.json();
        if (!Array.isArray(data.data)) throw new Error("Unexpected API response structure");
        
        setProducts(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-5 w-5 text-[#A8CF45]" />
            <h1 className="text-2xl font-semibold text-gray-900">
              {productCategory}
            </h1>
          </div>
          <p className="text-gray-600">
            Browse our collection of products in {productCategory}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#A8CF45]" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg p-8">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-600">
              We couldn't find any products in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.pid} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}