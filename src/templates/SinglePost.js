import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'
import Image from '../components/Image'
import ShareButton from '../components/ShareButton'
import ProfileCard from '../components/ProfileCard'
import PostSection from '../components/PostSection'
import BlogFotter from '../components/BlogFooter'
import SEO from '../components/SEO'

export const SinglePostTemplate = ({
  title,
  excerpt,
  featuredImage,
  date,
  body,
  tableOfContents,
  currentPostURL,
  categories = [],
  latestPosts,
  relatedPosts,
  postCategories = []
}) => (
  <main className="MainSingle">
    <SEO
      title={title}
      desc={excerpt}
      thumbnail={`${featuredImage}w1000`}
      pathname={`posts/${title}`}
      article
    />
    <article className="SinglePost">
      <div className="SinglePost--Grid">
        <div className="SinglePost--Content relative">
          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}
          <div className="SinglePost--Day">
            {date && (
              <time itemProp="dateCreated pubdate datePublished" date={date}>
                {`Created ${date}`}
              </time>
            )}
          </div>
          <div className="SinglePost--Categories">
            {categories && (
              <Fragment>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    className="SinglePost--Category"
                    to={`/category/${cat.toLowerCase()}`}
                  >
                    {cat}
                  </Link>
                ))}
              </Fragment>
            )}
          </div>
          {featuredImage && (
            <div className="SinglePost--Image relative">
              <Image background src={featuredImage} alt={title} />
            </div>
          )}
          <ShareButton title={title} articleUrl={currentPostURL} />
          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>
        </div>
        <div
          className="Toc--Side"
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
        <div className="PostsFooter">
          <div className="OtherPosts">
            <h2 className="Headline">関連記事</h2>
            <div className="RelatedPosts">
              <PostSection posts={relatedPosts} />
            </div>
            <h2 className="Headline">最新記事</h2>
            <div className="LatestPosts">
              <PostSection posts={latestPosts} />
            </div>
          </div>
          <ProfileCard />
        </div>
      </div>
      <BlogFotter categories={postCategories} />
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({
  data: { post, allPosts, postCategories, site },
  pageContext
}) => {
  const thisEdge = allPosts.edges.find((edge) => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        toc={post.tableOfContents}
        nextPost={_get(thisEdge, 'next.fields')}
        currentPostURL={`${site.siteMetadata.siteUrl}${post.fields.slug}`}
        latestPosts={pageContext.latestPosts}
        relatedPosts={pageContext.relatedPosts}
        postCategories={postCategories.edges.map((post) => ({
          ...post.node,
          ...post.node.frontmatter,
          ...post.node.fields
        }))}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      tableOfContents(
        absolute: false
        pathToSlugField: "frontmatter.path"
        maxDepth: 3
      )
      id
      frontmatter {
        title
        template
        date(formatString: "YYYY-MM-DD")
        featuredImage
        categories
        excerpt
      }
      fields {
        slug
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "Category" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
