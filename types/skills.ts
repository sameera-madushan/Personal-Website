import type { FC, SVGProps } from "react";

export type SkillItem = {
  name: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};