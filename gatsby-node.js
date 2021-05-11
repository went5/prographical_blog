const _ = require('lodash')
const path = require('path')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              template
              title
              date(formatString: "YYYY-MM-DD")
              featuredImage
              categories
            }
            fields {
              slug
              contentType
              relatedFileAbsolutePaths
            }
            fileAbsolutePath
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const mdFiles = result.data.allMarkdownRemark.edges
    const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')

    _.each(contentTypes, (pages, contentType) => {
      const pagesToCreate = pages.filter(page =>
        // get pages with template field
        _.get(page, `node.frontmatter.template`)
      )
      if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

      console.log(`Creating ${pagesToCreate.length} ${contentType}`)

      if (contentType === 'posts') {
        const allPostNodes = _.map(pages, ({ node }) => node)
        pagesToCreate.forEach((page, index) =>
        {
          //関連度　絶対パスからpostsを取り出す
          let relatedPosts = allPostNodes.filter(all =>
          {
            if (page.node.fields.relatedFileAbsolutePaths)
            {
              return page.node.fields.relatedFileAbsolutePaths.includes(all.fileAbsolutePath)
            } else{
              return false
            }
          })
          if(relatedPosts)relatedPosts= relatedPosts.slice(0, 6)
          const id = page.node.id
          const latestPosts = allPostNodes.slice(0, 6)
          createPage({
            // page slug set in md frontmatter
            path: page.node.fields.slug,
            component: path.resolve(
              `src/templates/${String(page.node.frontmatter.template)}.js`
            ),
            // additional data can be passed via context
            context: {
              id,
              latestPosts,
              relatedPosts
            }
          })
        })
      } else {
        pagesToCreate.forEach((page, index) => {
          const id = page.node.id
          createPage({
            // page slug set in md frontmatter
            path: page.node.fields.slug,
            component: path.resolve(
              `src/templates/${String(page.node.frontmatter.template)}.js`
            ),
            // additional data can be passed via context
            context: {
              id
            }
          })
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // convert frontmatter images
  fmImagesToRelative(node)

  // Create smart slugs
  // https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-node.js
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (
      // home page gets root slug
      parsedFilePath.name === 'blog' &&
      parsedFilePath.dir === 'pages'
    ) {
      slug = `/`
    } else if (parsedFilePath.dir === 'pages') {
      //info contact
      slug = `/${node.frontmatter.slug.toLowerCase()}/`
    } else if (parsedFilePath.dir === 'Category') {
      slug = `/${_.kebabCase(
        parsedFilePath.dir
      )}/${node.frontmatter.title.toLowerCase()}/`
    } else if (parsedFilePath.dir === 'posts') {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
        node.frontmatter.slug
      )}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir
    })
  }
}

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json']
