const postcssPresetEnv = require('postcss-preset-env')
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `./.env.${env}`}); 

module.exports = {
  siteMetadata: {
    title: 'Prographical',
    titleAlt: 'Prographical',
    shortName: 'Prograhical',
    url: 'https://prographical.jp',
    siteUrl: 'https://prographical.jp',
    author: 'newto',
    pathPrefix: '/',
    description: 'Programming And Graphics Blog',
    twitter: '@prograhical',
    profileIcon: `static/images/profileicon.png`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
        head: true,
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        /*id: 'GTM-add_your_tag_here',*/
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'prographical',
        short_name: 'prograhical',
        start_url: '/',
        background_color: '#f0f2f3',
        theme_color: '#6aa3ec',
        description: 'Programming And Graphics Blog',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: `${__dirname}/static/images/favicon.svg` // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`
          },
          {
            // Add runtime caching of various other page resources
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`
          },
          {
            // google photo
            urlPattern: /^https?:..lh3.googleusercontent.com[\w/:%#\$&\?\(\)~\.=\+\-]+/,
            handler: `staleWhileRevalidate`
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      }
    },
    `gatsby-plugin-robots-txt`,

    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          'gatsby-remark-code-titles',
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `30`,
              icon: false,
              className: `remark-autolink-headers`,
              maintainCase: false
            }
          },
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-prismjs`
        ]
      }
    },

    // css (replace with gatsby-plugin-sass for v2)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    {
      resolve: 'gatsby-remark-related-posts',
      options: {
        posts_dir: `${__dirname}/content`,
        doc_lang: 'ja'
      }
    }
  ]
}
