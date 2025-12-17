import LaravelOriginal from 'devicons-react/icons/LaravelOriginal';
import PythonOriginal from 'devicons-react/icons/PythonOriginal';
import VuejsOriginal from 'devicons-react/icons/VuejsOriginal';
import PhpOriginal from 'devicons-react/icons/PhpOriginal';
import JavascriptOriginal from 'devicons-react/icons/JavascriptOriginal';
import TypescriptOriginal from 'devicons-react/icons/TypescriptOriginal';
import ReactOriginal from 'devicons-react/icons/ReactOriginal';
import NextjsOriginal from 'devicons-react/icons/NextjsOriginal';
import RustOriginal from 'devicons-react/icons/RustOriginal';
import { SkillCategory } from "../types/skills";

const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "PHP", icon: PhpOriginal },
      { name: "JavaScript", icon: JavascriptOriginal },
      { name: "TypeScript", icon: TypescriptOriginal },
      { name: "Python", icon: PythonOriginal },
      { name: "Rust", icon: RustOriginal },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Laravel", icon: LaravelOriginal },
      { name: "Vue.js", icon: VuejsOriginal },
      { name: "React", icon: ReactOriginal },
      { name: "Next.js", icon: NextjsOriginal },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Strong communication" },
      { name: "Problem-solving" },
      { name: "Teamwork" },
      { name: "Adaptability" },
    ],
  },
];

export default function Skills() {
  return (
    <section className="my-10 sm:my-14 px-4 sm:px-0">
      <h2 className="title mb-8 sm:mb-12 text-xl sm:text-2xl font-semibold">Skills</h2>

      <div className="space-y-4">
        {skills.map((skillCategory: SkillCategory) => (
          <dl
            key={skillCategory.category}
            className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-4 items-start"
          >
            <dt>
              <span className="block text-sm sm:text-base text-gray-500 dark:text-neutral-500 font-medium mb-1 sm:mb-0">
                {skillCategory.category}:
              </span>
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2 text-sm sm:text-base text-gray-800 dark:text-neutral-200">
                {skillCategory.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name} className="inline-flex items-center">
                      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />}
                      {item.name}
                      {idx !== skillCategory.items.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </dl>
        ))}
      </div>
    </section>
  );
}
