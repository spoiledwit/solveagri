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
  const path = "/api/projects";
  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      projImage: {
        fields: ["alternativeText", "url"],
      },
    },
    pagination: {
      page: page,
      pageSize: 3,
    },
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  const total = data.meta.pagination.total;
  return { project: data.data, total };
}

export default function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [project, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async (page: number) => {
    setLoading(true);
    try {
      const { project, total } = await getProjects(page);
      console.log(project);
      setProjects(project);
      setTotal(total);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const totalPages = Math.ceil(total / 3);

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
            Our Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our latest work and creative endeavors
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col mt-[-80px] items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-LG " />
            {/* <p className="text-gray-600 dark:text-gray-400">Loading projects...</p> */}
          </div>
        ) : (
          <>
            {project.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
              >
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                  No projects found
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Check back later for new projects
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
                    <ProjectCard project={proj} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {totalPages > 1 && (
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
            )}
          </>
        )}
      </main>
    </div>
  );
}