import Image from "next/image";
import { EducationItem } from "@/types/education";

const education: EducationItem[] = [
  {
    period: "2024 – Present (Expected 2027)",
    degree: "Bachelor of Information Technology",
    institution: "University of Colombo School of Computing",
    crestPath: "/images/logos/education/ucscc.png",
  },
  {
    period: "2018 – 2019",
    degree: "Diploma in Network and System Administration",
    institution: "CICRA Campus",
    crestPath: "/images/logos/education/ccc.png"
  },
  {
    period: "2005 – 2018",
    degree: "Secondary Education",
    institution: "St. Peter’s College, Colombo 04, Negombo Branch",
    crestPath: "/images/logos/education/spcc.png",
  },
];

export default function Education() {
  return (
    <section className="mt-10 sm:mt-14 px-4 sm:px-0">
      <h2 className="title mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">
        Education
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {education.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-colors
                       hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600"
          >
            {item.crestPath && (
              <div className="mb-3 w-10 h-10 relative">
                <Image
                  src={item.crestPath}
                  alt={item.institution + " Logo"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}

            <p className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
              {item.period}
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
              {item.degree}
            </p>

            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
              {item.institution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
