import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ProjectMetadata } from "@/types/projects";

export default async function CvProjects() {

  const projects: ProjectMetadata[] = await getProjects();

  return (
    <section className="mt-10 sm:mt-14 px-4 sm:px-0">
      <h2 className="title mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">
        Projects
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {projects.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${project.slug}`}
            className="group block relative overflow-hidden rounded-lg"
          >
            <div className="relative w-full h-40 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              <Image
                src={project.image || "/images/projects/personal-website/cover.png"}
                alt={project.title || "Project cover image"}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>

            <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition">
              <div className="flex items-center gap-x-1 py-1 px-2 bg-white border border-gray-200 text-gray-800 rounded-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
                <svg
                  className="shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="text-xs">View</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
