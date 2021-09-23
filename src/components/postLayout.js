import React from 'react'
import Layout from './layout'
import { graphql } from 'gatsby'

// Static query
// Used anywhere, doesn't accept variable, can't use context

// Page query
// Must be used on pages

function postLayout({data, location}) {
    const {markdownRemark} = data

  return (
    <Layout location={location}>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{
          __html: markdownRemark.html
      }} />
    </Layout>
  )
}


export const query = graphql`
query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
        html
        frontmatter {
            title
            date
            slug
        }
    }
}
`
export default postLayout
