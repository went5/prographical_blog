import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const Seo = ({ title, desc, thumbnail, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        buildTime,
        siteMetadata: {
          defaultTitle,
          titleAlt,
          shortName,
          author,
          profileIcon,
          siteUrl,
          pathPrefix,
          defaultDescription,
          twitter
        }
      }
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: desc || defaultDescription,
        image: `${thumbnail || ''}`,
        url: `${siteUrl}${pathname || '/'}`
      }
      const realPrefix = pathPrefix === '/' ? '' : pathPrefix
      let schemaOrgJSONLD = [
        {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          '@id': siteUrl,
          url: siteUrl,
          name: defaultTitle,
          alternateName: titleAlt || ''
        }
      ]
      if (article) {
        schemaOrgJSONLD = [
          {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            '@id': seo.url,
            url: seo.url,
            name: title,
            alternateName: titleAlt || '',
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: seo.image
            },
            description: seo.description,
            datePublished: buildTime,
            dateModified: buildTime,
            author: {
              '@type': 'Person',
              name: author
            },
            publisher: {
              '@type': 'Organization',
              name: author,
              profileIcon: {
                '@type': 'ImageObject',
                url: siteUrl + realPrefix + profileIcon
              }
            },
            isPartOf: siteUrl,
            mainEntityOfPage: {
              '@type': 'WebSite',
              '@id': siteUrl
            }
          }
        ]
      }
      return (
        <>
          <Helmet title={seo.title}>
            <html lang="ja" />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="apple-mobile-web-app-title" content={shortName} />
            <meta name="application-name" content={shortName} />
            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJSONLD)}
            </script>

            {/* OpenGraph  */}
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={article ? 'article' : null} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
          </Helmet>
        </>
      )
    }}
  />
)
//   }
// }

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  thumbnail: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool
}

Seo.defaultProps = {
  title: null,
  desc: null,
  thumbnail: null,
  pathname: null,
  article: false
}

const query = graphql`
  query Seo {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        titleAlt
        shortName
        author
        profileIcon
        siteUrl: url
        pathPrefix
        defaultDescription: description
        twitter
      }
    }
  }
`
