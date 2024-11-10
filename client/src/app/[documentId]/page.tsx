"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ServiceData } from "@/types/all-types";
import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Loader2, ScrollText } from "lucide-react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import qs from "qs";

export default function ServicePage() {
  const [service, setService] = useState<ServiceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [content, setContent] = useState<BlocksContent | null>(null);
  const [about, setAbout] = useState<BlocksContent | null>(null);
  const [advertisement, setAdvertisement] = useState<BlocksContent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const router = useRouter();
  const serviceId = Array.isArray(params?.documentId)
    ? params.documentId[0]
    : params?.documentId;

  useEffect(() => {
    if (serviceId) {
      fetchServices(serviceId);
      fetchAllServices();
    }
  }, [serviceId]);

  async function fetchServices(id: string) {
    try {
      setIsLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const path = `/api/services/${id}`;
      const url = new URL(path, baseUrl);
  
      url.search = qs.stringify({
        populate: '*'  // This will populate all relations
      });
  
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Failed to fetch service with id ${id}`);
  
      const data = await res.json();
      
      setService(data.data);
      setContent(data.data.serviceContent || null);
      setAdvertisement(data.data.serviceAd || null);
      setAbout(data.data.serviceAbout || null);
  
    } catch (error: any) {
      console.error("Error fetching service:", error);
      setError(error.message || "An error occurred while fetching the service.");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAllServices() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const path = `/api/services`;
  
      const url = new URL(path, baseUrl);
      url.search = qs.stringify({
        populate: '*',  // This will populate all relations
        filters: {
          id: {
            $ne: serviceId
          }
        },
        pagination: {
          page: 1,
          pageSize: 6
        }
      });
  
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch services");
  
      const data = await res.json();
      
      if (data.data && Array.isArray(data.data)) {
        const shuffledServices = [...data.data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
        setServices(shuffledServices);
      } else {
        setServices([]);
      }
  
    } catch (error: any) {
      console.error("Error fetching services:", error);
      setError(error.message || "An error occurred while fetching services.");
    }
  }


  // Helper function to format image URL
  const getImageUrl = (
    imageUrl: string | undefined,
    defaultImage: string = "/default-image.jpg"
  ): string => {
    if (!imageUrl) return defaultImage;
    return imageUrl.startsWith("http")
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#A8CF45]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-8 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <main>
        {/* Hero Section - More subtle and professional */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={getImageUrl(service?.heroImage?.url)}
              alt={service?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <h1 className="text-3xl md:text-4xl text-white font-medium leading-tight mb-4">
                  {service?.name}
                </h1>
                <div className="h-1 w-20 bg-[#A8CF45] mb-6" />
                <p className="text-lg text-white/90">
                {/* @ts-ignore */}
                  {service?.heroHeading}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content Section - Clean and organized */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - About */}
              <div className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm">
                <div className="prose max-w-none">
                  {about && <BlocksRenderer content={about} />}
                </div>
              </div>

              {/* Right Column - Quick Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-gray-900">
                    Key Features
                  </h3>
                  <div className="prose-sm">
                    {content && <BlocksRenderer content={content} />}
                  </div>
                </div>

                <div className="bg-[#A8CF45]/10 rounded-lg p-8">
                  <h3 className="text-lg font-medium mb-4 text-gray-900">
                    Special Offers
                  </h3>
                  <div className="prose-sm">
                    {advertisement && <BlocksRenderer content={advertisement} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Related Services - Subtle and elegant */}
        <section className="pb-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-medium mb-8 text-center">
              All Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service:any) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Link href={`/${service.documentId}`}>
                    <div className="aspect-[4/3] relative">
                      <img
                        src={getImageUrl(service?.heroImage?.url)}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2">{service.name}</h3>
                      <div className="flex items-center text-[#A8CF45]">
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
);
}
