/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `).then(results => {
        results.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: `/posts${node.frontmatter.slug}`,
                component: path.resolve('./src/components/postLayout.js'),
                context: {
                    slug: node.frontmatter.slug,
                }
              })
        })
        resolve()
    })
  })
}
