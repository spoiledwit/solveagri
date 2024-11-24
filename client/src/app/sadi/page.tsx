"use client";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/project-components/projectCard";
import { Project } from "@/types/all-types";
import qs from "qs";
import Navbar from "@/components/navbar";
import { Loader2 } from "lucide-react";
import { motion } from 'framer-motion';

async function getProjects(
  page: number
): Promise<{ project: Project[]; total: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const path = "/api/sadis";
  
  const query = qs.stringify({
    populate: '*',
  }, {
    encodeValuesOnly: true
  });

  const url = `${baseUrl}${path}?${query}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }
  const data = await res.json();
  console.log("data", data)
  
  // Transform the data to match your Project interface
  const transformedProjects = data.data.map((item: any) => ({
    documentId: item.documentId,
    projId: item.id,
    projTitle: item.projTitle,
    projSubTitle: item.projSubTitle,
    projCategory: item.projCategory,
    projDescription: item.projDescription,
    // Handle the case where projlmage might be null
    projImage: item.projlmage?.url || '',
  }));

  const total = data.meta.pagination.total;
  return { project: transformedProjects, total };
}

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [project, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { project, total } = await getProjects(page);
      setProjects(project);
      setTotal(total);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const totalPages = Math.ceil(total / 300);

  // Animation variants
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

  console.log("saaadis", project);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Navbar />
      </div>

      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-2">
            Our Sadi Training Sessions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of our training sessions
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col mt-[-80px] items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-LG " />
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
          >
            <h3 className="text-2xl font-medium text-red-600 dark:text-red-400">
              {error}
            </h3>
          </motion.div>
        ) : (
          <>
            {project.length === 100 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
              >
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                  No sessions available
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Check back later for new sessions
                </p>
              </motion.div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {project.map((proj: Project) => (
                  <motion.div key={proj.projId} variants={item}>
                  {/* @ts-ignore */}
                    <ProjectCard project={{
                      ...proj,
                      category: "SADI",
                      projImage: {
                        //@ts-ignore
                        url: proj.projImage,
                      }
                    }} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex flex-col items-center space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg
                             shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                    disabled={page === totalPages}
                    className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg
                             shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )} */}
          </>
        )}
      </main>
    </div>
  );
}