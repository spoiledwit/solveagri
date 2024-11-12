'use client';
import { AiOutlineMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import qs from "qs";

// Define the structure of a product
interface Product {
  id: number;
  productCategory: string;
}

// Define the structure of a service
interface ServiceData {
  documentId: string;
  name: string;
}

// Define the structure of contact data
interface ContactData {
  id: number;

    Address: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    linkedIn?: string;

}

// Define the structure of the API responses
interface ApiResponse {
  data: Product[];
}

interface ServiceApiResponse {
  data: ServiceData[];
}

interface ContactApiResponse {
  data: ContactData;
}

const Footer = () => {
  // State to store unique categories and services
  const [categories, setCategories] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [contactInfo, setContactInfo] = useState<any>(null);

  // Fetch contact information
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const path = "/api/contact";

        const query = qs.stringify({
          populate: '*'
        }, {
          encodeValuesOnly: true
        });

        const url = `${baseUrl}${path}?${query}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch contact information");
        }

        const data = await response.json();
        console.log(data);
        setContactInfo(data.data);
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchContactInfo();
  }, []);

  // Fetch products and extract unique categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await fetch(`${baseUrl}/api/products`);
        const data: ApiResponse = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        const uniqueCategories = Array.from(
          new Set(
            data.data.map(
              (product) => product.productCategory || "Uncategorized"
            )
          )
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const path = "/api/services";

        const query = qs.stringify({
          populate: '*',
          pagination: {
            pageSize: 5
          }
        }, {
          encodeValuesOnly: true
        });

        const url = `${baseUrl}${path}?${query}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data: ServiceApiResponse = await response.json();

        if (!data || !data.data) {
          throw new Error("Invalid data structure received");
        }

        setServices(data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);



  return (
    <div className="bg-[#000517] flex flex-col items-center justify-center w-full px-4 md:px-20 xl:px-20 gap-12  pb-8">
      <div className="h-0.5 w-1/2 bg-[#000517]" />
      <div className="flex flex-col lg:flex-row w-full gap-12">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">About</h1>
          <img className="w-[12%] lg:w-[30%]" src="/logo.png" alt="Company Logo" />
          <div className="flex flex-col gap-1">
            {contactInfo?.Address && (
              <p className="text-white">{contactInfo.Address}</p>
            )}
            {contactInfo?.phone1 && (
              <p className="text-white">{contactInfo.phone1}</p>
            )}
            {contactInfo?.phone2 && (
              <p className="text-white">{contactInfo.phone2}</p>
            )}
            {contactInfo?.email && (
              <a 
              href={"mailto:"+contactInfo.email}
              target="_blank"
              className="text-white">{contactInfo.email}</a>
            )}
          </div>
          <div className="flex gap-4 w-full justify-start flex-wrap">
           
            {contactInfo?.facebook && (
              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF className="text-2xl text-LG hover:text-LLG" />
              </a>
            )}
            {contactInfo?.instagram && (
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="text-2xl text-LG hover:text-LLG" />
              </a>
            )}
            {contactInfo?.linkedIn && (
              <a
                href={contactInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-2xl text-LG hover:text-LLG" />
              </a>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">Products</h1>
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/product/category/${category}`}
                className="text-white hover:text-LG"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-white text-3xl font-medium">Services</h1>
          <div className="flex flex-col gap-1">
            {services.map((service) => (
              <Link
                key={service.documentId}
                href={`/${service.documentId}`}
                className="text-white hover:text-LG"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:flex justify-start flex-col items-start lg:items-center">
          <h1 className="text-white text-2xl whitespace-nowrap w-[200px] font-medium">
            Other Companies
          </h1>
          <div className="flex flex-col justify-start items-start">
            <img
              src="/footer/agridairy.png"
              alt="agridairy"
              className="w-[30%] lg:w-[60%] mr-5 mt-1"
            />
            <img
              src="/footer/agrifeeds.png"
              alt="agrifeeds"
              className="w-[30%] lg:w-[60%] mt-2 mr-5"
            />
            <img
              src="/footer/agrifoundation.png"
              alt="agrifoundation"
              className="w-[30%] lg:w-[60%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;