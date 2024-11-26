"use client";

import { FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import qs from "qs";
import AnimateToView from "@/components/AnimateToView";
import { Loader2 } from "lucide-react";
import getValidImageUrl from "@/utils/getValidImageUrl";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Define custom order
  const customOrder = [
    "Haroon M. K. Lodhi",
    "Asif Ashfaq",
    "Mian Waqas Raza",
    "Waseem Shaukat",
    "Hafiz Wasi Muhammad Khan",
    "Muhammad Rasheed",
    "Sadia",
    "Minahal Mubashar",
    "Shahbana",
    "Muhammad Arslan Ahmad",
    "Nayyar",
    "Mubashar",
  ];

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const path = "/api/teammembers";

        const url = new URL(path, baseUrl);
        url.search = qs.stringify({
          populate: {
            Image: {
              fields: ["url"],
            },
          },
        });

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const data = await response.json();

        // Sort team members by custom order
        const sortedMembers = [...data.data].sort((a, b) => {
          const indexA = customOrder.indexOf(a.Name.trim());
          const indexB = customOrder.indexOf(b.Name.trim());

          // Items not found in customOrder are placed at the end
          return (
            (indexA === -1 ? customOrder.length : indexA) -
            (indexB === -1 ? customOrder.length : indexB)
          );
        });

        setTeamMembers(sortedMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-DB px-4 xl:px-40 md:px-20 pt-40 pb-20 flex flex-col gap-20">
      <div className="flex flex-col items-center justify-center xl:px-40">
        <AnimateToView className="flex text-white flex-col mb-10">
          <h2 className="text-3xl font-medium text-center">Our Core Team</h2>
          <h3 className="mt-2">A winning team, Our recipe for success</h3>
        </AnimateToView>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-LG" />
          </div>
        ) : error ? (
          <p className="text-white text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 justify-between gap-16">
            {teamMembers.map((member, index) => {
              const imageUrl = member.Image?.url
                ? getValidImageUrl(member.Image.url)
                : "/default-image.png";

              return (
                <AnimateToView
                  key={index}
                  className="flex flex-col  justify-center items-center"
                >
                  <div className="relative flex flex-wrap w-full overflow-hidden rounded-md">
                    <div className="w-[300px] h-[300px] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Picture of ${member.Name || "Team Member"}`}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {member.LinkedIn && (
                      <a
                        href={member.LinkedIn}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 right-4 bg-LG hover:bg-white p-2 rounded-full shadow-lg"
                        aria-label={`LinkedIn profile of ${member.Name}`}
                      >
                        <FaLinkedin className="text-2xl text-white hover:text-LG transition-colors duration-300" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center text-white mt-4">
                    <h2 className="text-xl font-medium text-center whitespace-nowrap">
                      {member.Name}
                    </h2>
                    <p className="text-center whitespace-nowrap">
                      {member.Designation}
                    </p>
                  </div>
                </AnimateToView>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
