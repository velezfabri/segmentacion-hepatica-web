export interface SiteConfig {
  formspreeUrl: string;
  dropboxUrl: string;
  githubUrl: string;
  turnaroundTime: string;
  contactEmail?: string;
}

export const siteConfig: SiteConfig = {
  // Formspree endpoint for request registration.
  formspreeUrl:
    (import.meta.env.VITE_FORMSPREE_URL as string | undefined) ||
    "https://formspree.io/f/xkjgvveq",

  // Dropbox File Request URL for the study upload step.
  dropboxUrl:
    (import.meta.env.VITE_DROPBOX_URL as string | undefined) ||
    "https://www.dropbox.com/request/5723u6dj19l0y0p1qlxh",

  githubUrl: "https://github.com/velezfabri/PI-Velez-Final",
  turnaroundTime: "habitualmente dentro de las siguientes 24 horas",
};
