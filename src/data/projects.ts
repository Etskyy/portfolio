import projectsData from './projects.json';

export type Project = {
  slug: string;
  name: string;
  role: string;
  status: 'active' | 'complete' | 'shelved';
  summary: string;
  description: string;
  tags: string[];
  links?: { label: string; url: string }[];
};

export const projects: Project[] = projectsData as Project[];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
