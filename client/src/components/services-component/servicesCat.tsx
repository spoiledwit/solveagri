"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AnimateToView from "../AnimateToView";
import { ServiceData } from "@/types/all-types";
import qs from "qs";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ServiceCat = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const path = "/api/services";
  
        const query = qs.stringify(
          {
            populate: "*",
            pagination: {
              pageSize: 100, // Adjust based on your needs
            },
          },
          {
            encodeValuesOnly: true, // Helps with encoding
          }
        );
  
        const url = `${baseUrl}${path}?${query}`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch services");
        }
  
        const data = await response.json();
  
        if (!data || !data.data) {
          throw new Error("Invalid data structure received");
        }
  
        const servicesData = Array.isArray(data.data) ? data.data : [];
  
        // Define your custom order
        const customOrder = [
          "Farm Inputs & Supplies",
          "Community Development Projects",
          "Consultancy Services",
          "Training & Development",
        ];
  
        // Sort the services based on the custom order
        const sortedServices = servicesData.sort((a: ServiceData, b: ServiceData) => {
          //@ts-ignore
          const indexA = customOrder.indexOf(a.name.trim());
          //@ts-ignore
          const indexB = customOrder.indexOf(b.name.trim());
  
          // Items not in the customOrder will appear at the end
          return (
            (indexA === -1 ? customOrder.length : indexA) -
            (indexB === -1 ? customOrder.length : indexB)
          );
        });
  
        setServices(sortedServices); // Update state with sorted services
      } catch (error: any) {
        console.error("Service fetch error:", error);
        setError(error.message || "An error occurred while fetching services");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchServices();
  }, []);
  

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="px-4 md:px-20 xl:px-20 md:py-20 py-10 w-full">
      {/* Original Title and Description - Preserved */}
      <AnimateToView>
        <h1 className="md:text-[30px] text-[30px] mb-3 text-DG">
          Our Services.
        </h1>
      </AnimateToView>

      <div className="flex flex-col gap-12 mt-5">
        <AnimateToView className="flex w-full gap-4">
          <div className="h-[1px] ml-[-30px] mt-3 w-[180px] bg-DG" />
          <p className="text-DG text-justify md:text-xl font-light">
          We provide solutions for sustainable livestock and dairy production to help farmers and businesses succeed.
          </p>
        </AnimateToView>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-DG" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="group relative overflow-hidden rounded-xl h-[280px] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Link href={`/${service.documentId}`} className="block h-full">
                    {/* Image Container */}
                    <div className="absolute inset-0">
                      <img
                        src={service.heroImage?.url?.startsWith("http")
                          ? service.heroImage.url
                          : `${process.env.NEXT_PUBLIC_BASE_URL}${service.heroImage?.url}`
                        }
                        alt={service.heroImage?.alternativeText || service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          console.error("Image failed to load:", service.heroImage?.url);
                          e.currentTarget.src = "/fallback-image.jpg";
                        }}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-300" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h2 className="text-white text-xl font-medium mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {service.name}
                      </h2>
                      <div className="flex items-center gap-2 text-white/0 group-hover:text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-sm">Learn more</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-DG">No services available at the moment.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* View All Services Button - Preserved Styling */}
        <div className="flex justify-center mt-8">
          <Link
            href={services.length > 100 ? `/${services[0].documentId}` : "/"}
            className="border flex items-center gap-2 border-green-600 text-white bg-[#000C36] py-3 px-12 rounded-full 
                     hover:bg-[#a8cf45] hover:text-white transition-all duration-300 group"
          >
            Learn More 
            <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCat;