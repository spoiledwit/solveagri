import { useState, useEffect } from "react";
import Link from "next/link";
import AnimateToView from "../AnimateToView";
import { Product } from "@/types/all-types";
import qs from "qs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import getValidImageUrl from "@/utils/getValidImageUrl";

const ProductCat = () => {
  const [categories, setCategories] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:1337";
        const path = "/api/product-categories";
        const query = qs.stringify({
          populate: "*",
        });

        const url = `${baseUrl}${path}?${query}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        if (!Array.isArray(data.data))
          throw new Error("Unexpected API response structure");

        // Define custom order
        const customOrder = [
          "Animal Feed",
          "Bovine Genetics",
          "Hygiene Solutions",
          "Calf Rearing",
          "Farm Accessories",
          "Farm Machinery",
        ];

        // Sort categories based on custom order
        const sortedCategories = data.data.sort((a: Product, b: Product) => {
          //@ts-ignore
          const indexA = customOrder.indexOf(a.Title.trim());
          //@ts-ignore
          const indexB = customOrder.indexOf(b.Title.trim());

          // Items not in the customOrder will appear at the end
          return (
            (indexA === -1 ? customOrder.length : indexA) -
            (indexB === -1 ? customOrder.length : indexB)
          );
        });

        setCategories(sortedCategories); // Update state with sorted categories
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#A8CF45]" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div className="px-4 md:px-20 xl:px-20 md:py-20 py-10 w-full">
      <AnimateToView>
        <h1 className="md:text-[30px] text-[30px] mb-3 text-white">
          Our featured products.
        </h1>
      </AnimateToView>

      <div className="flex mt-5">
        <div className="w-full flex flex-col gap-12">
          <AnimateToView className="flex w-full gap-4">
            <div className="h-[1px] ml-[-30px] mt-3 w-[60px] bg-white" />
            <p className="text-white text-lg md:text-xl font-light">
            Explore our top products, specially chosen to meet your livestock needs.
            </p>
          </AnimateToView>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.length > 0 ? (
              categories.map((product) => (
                <motion.div
                  key={product.pid}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div
                    onClick={() =>
                      router.push(
                        //@ts-ignore
                        `/product/category/${product.slug}`
                      )
                    }
                    className="relative aspect-[5/4] cursor-pointer overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      //@ts-ignore
                      src={getValidImageUrl(product.Image?.url)}
                      alt={
                        product.productImage?.alternativeText ||
                        product.productTitle
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 w-12 h-0.5 bg-[#A8CF45] mx-auto transform origin-left transition-transform duration-300 group-hover:scale-x-150" />

                    <h2 className="text-xl font-semibold text-gray-900 text-center">
                      {/*@ts-ignore  */}
                      {product.Title}
                    </h2>

                    <div className="mt-4 flex items-center justify-center">
                      <span
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#A8CF45] 
                                     transition-colors duration-300"
                      >
                        View Products
                        <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center">
                <p className="text-xl text-gray-400">
                  No product categories available at the moment.
                </p>
                <p className="mt-2 text-gray-500">
                  Please check back later for updates.
                </p>
              </div>
            )}
          </motion.div>

          <div className="flex justify-center mt-8">
            <Link
              href="/product"
              className="border border-green-600 text-black bg-[#A8CF45] py-3 px-12 rounded-full 
                       transition duration-300 hover:bg-[#A8CF45]/90 group"
            >
              View All Products
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCat;
