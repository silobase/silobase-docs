import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Silobase",
  description: "An open-source Backend-as-a-Service (BaaS) that turns your database and file system into instant REST APIs — configurable via .env, no backend code required.",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation  ', link: '/introduction/what-is-silobase' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is Silobase?', link: '/introduction/what-is-silobase' }
        ]
      },
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Quick Start', link: '/getting-started/quick-start' },
           { text: 'Project Structure', link: '/getting-started/project-structure' },
           { text: 'Configuration via .env', link: '/getting-started/configuration-via-env' },
           { text: 'Example Requests', link:'/getting-started/example-requests'}
        ]
      },
      {
        text: 'Deployment',
        collapsed: false,
        items: [
          { text: 'Connect Your Database',
            collapsed: true,
            items: [
              { text: 'PostgreSQL', link: '/deployment/database-connection/postgres' },
              { text: 'MSSQL', link: '/deployment/database-connection/mssql' }
            ]
          },
          {
            text: 'Cloud Deployment',
            collapsed: true,
            items: [
              { text: 'Render', link: '/deployment/cloud-deployment/render' },
              { text: 'AWS Elastic Beanstalk', link: '/deployment/cloud-deployment/aws' },
              { text: 'Azure Web Service', link: '/deployment/cloud-deployment/azure' }
            ]
          },
          {
            text: 'CI/CD',
            collapsed: true,
            items: [
              { text: 'Azure CI/CD with GitHub Actions', link: '/deployment/ci-cd/azure-ci-cd' },
              { text: 'AWS CI/CD with GitHub Actions', link: '/deployment/ci-cd/aws-ci-cd' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/silobase/silobase' } // replace with actual repo if needed
    ]
  }
})
