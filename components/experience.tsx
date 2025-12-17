import { WorkExperience } from "@/types/experiance";

const experiences: WorkExperience[] = [
  {
    period: "Oct 2023 - Present",
    role: "Full Stack Developer",
    company: "PRAMIX IT Solutions (Pvt) Ltd",
    list: [
      "Responsible for designing, developing, and maintaining web applications using Laravel, Vue.js, and React. Manage and enhance existing systems, plan and implement new features, and ensure scalable, efficient, and high-quality solutions. Collaborate across teams to deliver end-to-end full stack development projects.",
    ],
  },
  {
    period: "Dec 2019 - July 2020",
    role: "Network Administrator",
    company: "Lanka Communication Services (Pvt) Ltd.",
    list: [
      "Assisted in managing and maintaining network infrastructure, including configuring routers, switches, and firewalls. Monitored network performance, troubleshot connectivity issues, and supported the IT team in ensuring secure and reliable network operations.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="mt-10 sm:mt-14 px-4 sm:px-0">
      <h2 className="title mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">
        Work Experience
      </h2>

      <div className="space-y-10 sm:space-y-0">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative group sm:flex sm:gap-x-6"
          >
            {/* Timeline column (desktop only) */}
            <div className="hidden sm:flex flex-col items-center relative">
              {/* Icon */}
              <div className="z-10 flex items-center justify-center w-8 h-8">
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-neutral-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12h.01" />
                  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                  <rect width="20" height="14" x="2" y="6" rx="2" />
                </svg>
              </div>

              {/* Connector line */}
              <div className="flex-1 w-0.5 bg-gray-200 dark:bg-neutral-700 group-last:hidden mt-2 mb-2" />
            </div>

            {/* Content */}
            <div className="grow pb-2 sm:pb-10 group-last:pb-0">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mb-1">
                {exp.period}
              </p>

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-neutral-200">
                {exp.role}
              </h3>

              {exp.company && (
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                  {exp.company}
                </p>
              )}

              {exp.list && (
                <ul className="mt-3 list-disc ms-5 space-y-1.5">
                  {exp.list.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 dark:text-neutral-400 text-justify"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}