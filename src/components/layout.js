/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Header from './header'
import Archive from './archive'
import './layout.css'

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      file(relativePath: { regex: "/freestocks/" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1000
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const image = getImage(data.file)

  const props = useSpring({to: {height: location.pathname === '/' ? 200 : 100}, from: {height: location.pathname === '/' ? 100 : 200}})

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      {/* <Spring from={{ height: 100 }} to={{ height: 200 }}>
        {styles => (
          <div style={{ overflow: 'hidden', width: '100%', ...styles }}>
            <GatsbyImage
              image={image}
              alt=""
              loading="eager"
              style={{ width: '100%' }}
            />
          </div>
        )}
      </Spring> */}
      <animated.div style={{overflow: 'hidden', width: '100%', ...props}}>
      <GatsbyImage
              image={image}
              alt=""
              loading="eager"
              style={{ width: '100%' }}
            />
      </animated.div>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        {/* {location.pathname === '/' && (
          
        )} */}
        <MainLayout>
          <div>{children}</div>
          <Archive />
        </MainLayout>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  location: {},
}

export default Layout
