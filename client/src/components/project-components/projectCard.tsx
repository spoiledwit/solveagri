import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProjectCard = ({ project }:{
  project: {
    documentId: string;
    projHeader: string;
    projTitle: string;
    projSubTitle: string;
    projImage: {
      url: string;
    };
    category: string;
    html: string;
  };
}) => {
  console.log(project);
  const [imageError, setImageError] = useState(false);

  const truncatedSubtitle = project.projSubTitle?.length > 30
    ? `${project.projSubTitle.substring(0, 30)}...`
    : project.projSubTitle;

  const truncatedTitle = project.projHeader?.length > 40
    ? `${project.projTitle.substring(0, 40)}...`
    : project.projTitle;




  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
     
      <Link 
      
      href={`/${project.category?"sadi" : "projects"}/${project.documentId}`} 
      className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
          <img
          //@ts-ignore
            src={project.projImage.url}
            alt={project.projTitle || 'Project thumbnail'}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            // priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-white text-sm">{truncatedSubtitle}</p>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>{project.category || 'Project'}</span>
            </div>
          </div>

          <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {truncatedTitle}
          </h2>

          <div className="prose prose-sm text-gray-600 dark:text-gray-300 line-clamp-2" 
               dangerouslySetInnerHTML={{ __html: project.projSubTitle }} />

          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            Read more
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProjectCard;