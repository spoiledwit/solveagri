"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Project } from "@/types/all-types";
import qs from "qs";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams();
  const projId = Array.isArray(params?.documentId)
    ? params.documentId[0]
    : params?.documentId;
  const [project, setProject] = useState<Project | null>(null);
  const [description, setDescription] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (projId) fetchProject(projId);
  }, [projId]);

  async function fetchProject(id: string) {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const path = `/api/sadis/${id}`;
      const url = new URL(path, baseUrl);

      url.search = qs.stringify({
        populate: "*",
      });

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch project");

      const data = await res.json();
      setProject(data.data);
      setDescription(data.data.projDescription || null);
    } catch (error) {
      console.error("Error fetching the project:", error);
      toast.error("Error fetching the project.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-LG " />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Sadi Training Session not found
          </h2>
          <Link 
            href="/sadi"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </div>
    );
  }

  console.log("sadi", project);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Navbar />
      </div>
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link 
            href="/sadi"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <section className="mb-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              {project.projTitle}
            </motion.h1>
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              {project.projSubTitle}
            </motion.h3>
          </section>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-12"
          >
          
            <img
            //@ts-ignore
              src={project.projlmage.url  || "/default-image.jpg"}
              alt={project.projImage?.alternativeText || project.projTitle}
              className={`w-full h-[500px] object-cover object-center transition-opacity duration-300`}
             
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            {description ? renderDescription(description) : (
              <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">No content available.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

function renderDescription(blocks: any[]) {
  return blocks.map((block, index) => {
    const fadeIn = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1 }
    };

    switch (block.type) {
      case "paragraph":
        return (
          <motion.p 
            key={index} 
            {...fadeIn}
            className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {renderChildren(block.children)}
          </motion.p>
        );

      case "heading":
        const HeadingTag = (`h${block.level || 2}` as keyof JSX.IntrinsicElements);
        return (
          <motion.div key={index} {...fadeIn}>
            <HeadingTag className="font-bold text-gray-900 dark:text-white my-6">
              {renderChildren(block.children)}
            </HeadingTag>
          </motion.div>
        );

      case "list":
        return (
          <motion.ul 
            key={index} 
            {...fadeIn}
            className="space-y-2 my-6 list-disc list-inside text-gray-700 dark:text-gray-300"
          >
            {block.children.map((listItem: any, listItemIndex: number) => (
              <li key={listItemIndex} className="leading-relaxed">
                {renderChildren(listItem.children)}
              </li>
            ))}
          </motion.ul>
        );

      default:
        return (
          <motion.p 
            key={index} 
            {...fadeIn}
            className="text-gray-500 dark:text-gray-400 italic"
          >
            Unsupported block type: {block.type}
          </motion.p>
        );
    }
  });
}

function renderChildren(children: any[]) {
  return children.map((child, childIndex) => (
    <span
      key={childIndex}
      className={`${child.bold ? 'font-semibold' : 'font-normal'}`}
    >
      {child.text}
    </span>
  ));
}