import * as React from "react"
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Listing from "../components/listing"

const IndexPage = ({location}) => (
  <Layout location={location}>
    <Seo title="Home" />
    <Listing />
  </Layout>
)

export default IndexPage
