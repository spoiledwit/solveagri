"use client";
import { FaLinkedin } from "react-icons/fa";
import { useEffect } from "react";
import AnimateToView from "@/components/AnimateToView";
import { useState } from "react";
import qs from "qs";
import getValidImageUrl from "@/utils/getValidImageUrl";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      Name: "Haroon M. K. Lodhi",
      Designation: "Chairman & CEO",
      img: "/aboutus/team/chairman.png",
      LinkedIn: "https://www.linkedin.com/in/lodhi-haroon-65b8059/",
    },
    {
      Name:"Asif Ashfaq",
      Designation:"General Manager",
      img : "/aboutus/team/asif.png",
      LinkedIn:"https://www.linkedin.com/in/asif-ashfaq-69886a11/"
    },
    {
      Name:"Waqas Raza",
      Designation:"Marketing & Sale",
      img : "/aboutus/team/waqas.png",
      LinkedIn:"https://www.linkedin.com/in/waqas-raza-124a6270/"
    },
    {
      Name:"Waseem Shaukat",
      Designation:"Livestock Specialist",
      img : "/aboutus/team/waseem.jpg",
      LinkedIn:"https://www.linkedin.com/in/drwaseemshaukat/"
    },
    {
      Name:"Hafiz Wasi M Khan",
      Designation:"Livestock Specialist",
      img : "/aboutus/team/wasi.png",
      LinkedIn:"https://www.linkedin.com/in/hafiz-wasi-muhammad-khan-3087bb18/"
    },
    {
      Name:"Muhammad Rasheed",
      Designation:"Programs Manager",
      img : "/aboutus/team/rasheed.jpg",
      LinkedIn:""
    },
    {
      Name:"Saadia Hanif",
      Designation:"Projects Specialist",
      img : "/aboutus/team/sadia.jpg",
      LinkedIn:"https://www.linkedin.com/in/saadiahanif/"
    },
    {
      Name:"Minahal Mubashar",
      Designation:"Project Development",
      img : "/aboutus/team/minahil.jpg",
      LinkedIn:"https://www.linkedin.com/in/minahil-mubashar-86302b185/"
    },
    {
      Name:"Shabana Afreen",
      Designation:"Monitoring & Evaluation",
      img : "/aboutus/team/shabana.jpg",
      LinkedIn:"https://www.linkedin.com/in/shabana-afreen-192295327/"
    },
    {
      Name:"Arslan Ahmad",
      Designation:"Finance & Accounts",
      img : "/aboutus/team/arslan.jpg",
      LinkedIn:"https://www.linkedin.com/in/muhammad-arslan-ahmad-41191a18b/"
    },
    {
      Name:"Nayyar Lodhi",
      Designation:"Business Development",
      img : "/aboutus/team/nayyar.jpeg",
      LinkedIn:"https://www.linkedin.com/company/solveagripak"
    },
    {
      Name:"Mubashar Nazir",
      Designation:"Legal Advisor",
      img : "/aboutus/team/mubashar.jpg",
      LinkedIn:"https://www.linkedin.com/company/solveagripak"
    },
  ]

  async function getTeamMembers(): Promise<any[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const path = "/api/teammembers"; // Match your collection name exactly
    const url = new URL(path, baseUrl);
  
    url.search = qs.stringify({
      populate: {
        Image: { // Match the field name from your schema (capital 'I')
          fields: ["url"],
        },
      },
    });
  
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error("Failed to fetch team members");
    }
    const data = await res.json();
    return data.data;
  }
  

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const data = await getTeamMembers();
      setTeamMembers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-DB px-4 xl:px-40 md:px-20 pt-40 pb-20 flex flex-col gap-20">
      <div className=" flex flex-col gap-12">
        <AnimateToView>
          <h1 className="text-4xl font-medium text-LG">
            "Your Agri Partner, Forever After!"
          </h1>
        </AnimateToView>
        <div className="flex flex-col-reverse lg:flex-row items-center md:items-start gap-8">
          <div className=" ">
            <h2 className="text-3xl font-medium text-indigo-50 mb-3">
              About Us
            </h2>
            <p className="text-gray-200">
              Solve Agri Pak is a leading Dairy Livestock Company in Pakistan,
              dedicated to being your premier partner in the thriving dairy
              industry. With 12 years of experience and a commitment to
              excellence, we provide a range of high-quality products, services,
              training, and consultancy solutions to empower and support dairy
              farmers nationwide.
              <br />
              <br />
              <span className="text-LG">Products:</span> We offer tailored
              products to meet the specific needs of dairy farmers, including
              Bovine Semen, Compound Feed, Minerals, Farm Mechanized Machinery,
              TMR Wagons, and Hygiene Solutions. Our products enable clients to
              achieve optimal productivity and profitability on their farms.
              <br />
              <br />
              <span className="text-LG">Services:</span> Our comprehensive
              services cover animal health management, nutrition consulting,
              breeding assistance, and farm management solutions. We prioritize
              the well-being of farmers, employing the latest practices to
              ensure farm productivity and longevity.
              <br />
              <br />
              <span className="text-LG">Training and Consultancy:</span> We
              provide training and consultancy services to enhance farmers'
              skills and improve farm operations. Through workshops, seminars,
              and personalized consultations, we cover topics such as animal
              husbandry, feeding practices, disease management, and farm
              management techniques.
              <br />
              <br />
              <span className="text-LG">Project Development:</span> In addition
              to our core offerings, we also specialize in project development
              for the dairy industry. We provide expertise in setting up dairy
              farms, establishing efficient processes, and implementing best
              practices. Our goal is to support the development of successful
              dairy projects that contribute to the growth and prosperity of the
              industry.
              <br />
              <br />
              At Solve Agri Pak, we are committed to fostering a thriving dairy
              industry in Pakistan. We deliver top-quality products,
              comprehensive services, and expert training and consultancy
              solutions to support the growth and success of dairy farms.
              Partner with us to unlock the full potential of your dairy farm.
              Contact us today to learn more about how we can assist you in
              achieving your goals.
              <br />
              <br />
              Solve Agri Pak, Your Agri Partner forever after.
            </p>
          </div>
       
        </div>
        
      </div>

      <div className="h-0.5 w-1/2 bg-LG self-center" />

      <div className="flex flex-col gap-12">
        <h2 className="text-center text-3xl font-medium text-LG">
          Message from the chairman
        </h2>
        <div className="w-full flex flex-col lg:flex-row gap-12">
          <AnimateToView className="w-full flex flex-col items-center justify-center">
            <div className="relative h-[260px] w-[260px] border p-2 overflow-hidden">
              {/* Chairman's Image */}
              <img
                src="/aboutus/chairman.png"
                alt="chairman"
                className="w-full h-full object-cover"
              />

              {/* LinkedIn Icon inside the image at the bottom-right corner */}
              <a
                href="https://www.linkedin.com/in/lodhi-haroon-65b8059/"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 bg-LG p-2 hover:bg-white rounded-full shadow-lg"
              >
                <FaLinkedin className="text-2xl text-white hover:text-LG transition-colors duration-300" />
              </a>
            </div>

            {/* Chairman's Details */}
            <div className="flex flex-col items-center justify-center text-white mt-4">
              <p className="text-xl font-medium text-center">
                Haroon M. K. Lodhi
              </p>
              <p className="text-center text-LG text-sm">
                Chief Executive Officer
              </p>
            </div>
          </AnimateToView>

          <AnimateToView>
            <p className="w-full text-white text-center lg:text-start">
              Welcome to Solve Agri Pak! Our mission is to provide customized
              solutions for Livestock & Agriculture Value-added Enterprises. We
              are committed to the success of dairy, livestock, and
              agribusinesses.
              <br />
              <br />
              At Solve Agri Pak, we prioritize serving farmers, value chain
              players, processors, and consumers in the agribusiness sector. Our
              consultancy services support farm establishment, management, and
              value-added product development, while our agronomy support
              focuses on livestock farming.
              <br />
              <br />
              Through our Solve Agri & Dairy Institute (SADI), we offer
              comprehensive training and capacity-building services. This
              empowers livestock and dairy farmers, professionals, and
              agribusiness entrepreneurs with the latest techniques and skills.
              <br />
              <br />
              Our unique strength lies in our blend of local expertise and
              international exposure, earning the trust of renowned clients.
              <br />
              <br />
              At Solve Agri Pak, we are passionate about serving our clients.
              Together, we will drive the growth and success of the livestock
              and dairy farming industry.
              <br />
              <br />
              Thank you for choosing Solve Agri Pak.
              <br />
              <br />
              Best regards,
              <br />
              <br />
              <span className="text-LG font-medium">Haroon M. K. Lodhi</span>
            </p>
          </AnimateToView>
        </div>
      </div>

      <div className="h-0.5 w-1/2 bg-LG self-center" />

      <div className="flex flex-col items-center justify-center ">
        <AnimateToView className="flex text-white flex-col mb-10">
          <h2 className="text-3xl font-medium text-center">Our Core Team</h2>
          <h3 className="mt-2">A winning team; Our recipie for success</h3>
        </AnimateToView>
        <div className="flex flex-wrap justify-center gap-8 w-full">
  {team.map((member, index) => (
    <div key={index} className="flex flex-col items-center">
      {/* Image Container */}
      <div className="relative w-[400px] max-w-[350px] aspect-square overflow-hidden rounded-xl border-2 border-transparent hover:border-[#A8CF45] transition-all duration-300">
        <img
          src={member.img}
          className="w-full h-full object-cover"
          alt={`${member.Name}'s Image`}
        />
        {/* Properly Positioned LinkedIn Icon */}
        {member.LinkedIn && (
          <a
            href={member.LinkedIn}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 bg-LG hover:bg-white p-2 rounded-full shadow-lg"
          >
            <FaLinkedin className="text-2xl text-white hover:text-LG transition-colors duration-300" />
          </a>
        )}
      </div>
      {/* Member Details */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-medium text-white">{member.Name}</h2>
        <p className="text-[#A8CF45]">{member.Designation}</p>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default AboutUs;