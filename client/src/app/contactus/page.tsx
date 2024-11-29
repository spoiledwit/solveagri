'use client'
import Contact from '@/components/contact-page-components/contactus'
import React from 'react'
import { useEffect,useState } from 'react'
import Navbar from '@/components/navbar'
import { Skeleton } from "@/components/ui/skeleton";
import { Facebook, FacebookIcon, LinkedinIcon, TwitterIcon , } from 'lucide-react';
import ContactComp from '@/components/contact-page-components/contactComp'

const ContactPage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  const [isMapLoaded, setIsMapLoaded] = useState(false); // State to track map loading

  useEffect(() => {
    // Simulate map loading time (you can adjust this delay)
    const timeout = setTimeout(() => setIsMapLoaded(true), 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
    <div className="fixed w-full" style={{ zIndex: "999" }}>
      <Navbar/>
          
      </div> 
    <div className="bg-DB w-full min-h-screen ">
      <Contact/>
    </div>



    <div className="flex justify-center px-[24px] py-[24px] w-full lg:w-screen h-[682px]  lg:px-[20px] lg:py-[40px]">
        <div className="relative w-full lg:w-[98%] lg:mx-6 md:h-96 lg:h-[550px] rounded-xl overflow-hidden">
          {/* Conditional rendering to show Skeleton while map is loading */}
          {!isMapLoaded ? (
            <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1206.8449961015385!2d74.3227363281018!3d31.50594203191079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190404d0ffafd1%3A0x6cf6fd3a9a8f7676!2sSolve%20Agri%20Pak%20(Private)%20Limited!5e0!3m2!1sen!2s!4v1732884149626!5m2!1sen!2s"
              className="absolute inset-0 w-full h-full"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}

      
        </div>
      </div>
    </>
  )
}

export default ContactPage;
