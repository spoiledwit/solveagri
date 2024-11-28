"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/project-components/projectCard";
import { Project } from "@/types/all-types";
import qs from "qs";
import Navbar from "@/components/navbar";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

async function getProjects(): Promise<{ project: Project[]; total: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const path = "/api/sadis";

  const query = qs.stringify(
    {
      populate: "*",
      pagination: { page: 1, pageSize: 100 }, // Adjusted to fetch up to 100 projects
    },
    { encodeValuesOnly: true }
  );

  const url = `${baseUrl}${path}?${query}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }

  const data = await res.json();
  console.log("API Response:", data);

  const transformedProjects = data.data.map((item: any) => ({
    documentId: item.documentId,
    projId: item.id,
    projTitle: item.projTitle,
    projSubTitle: item.projSubTitle,
    projCategory: item.projCategory,
    projDescription: item.projDescription,
    projImage: item.projlmage?.url || "",
  }));

  const total = data.meta.pagination.total;
  return { project: transformedProjects, total };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const { project, total } = await getProjects();
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
    fetchProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
            Our Sadi Training Sessions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of our training sessions
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col mt-[-80px] items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-LG" />
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
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
          >
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
              No sessions available
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check back later for new sessions.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((proj: Project) => (
              <motion.div key={proj.projId} variants={item}>
                <ProjectCard
                  project={{
                    ...proj,
                    category: "SADI",
                    //@ts-ignore
                    projImage: { url: proj.projImage },
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
