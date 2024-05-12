export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Business Loan",
      href: "/",
    },
    {
      label: "Credit Tracker",
      href: "/about",
    },
    {
      label: "Calculators",
      href: "/calculators",
    },
  ],
  navMenuItems: [
    {
      label: "Business Loan",
      href: "/",
    },
    {
      label: "Credit Tracker",
      href: "/about",
    },
    {
      label: "Calculators",
      href: "/calculators",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
