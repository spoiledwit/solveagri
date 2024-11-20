export default () => ({
    'strapi-neon-tech-db-branches': {
    enabled: true,
    config: {
      neonApiKey: "rlen131bdcbnn6p68ijlh0p31wtg1tzk040w58fsok6ez9sefvoylwrjv6m3jca2", // get it from here: https://console.neon.tech/app/settings/api-keys
      neonProjectName: "solveagri", // the neon project under wich your DB runs
      neonRole: "neondb_owner", // create it manually under roles for your project first
      //(gitBranch: "main") // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
    }
  },
});
