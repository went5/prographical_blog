import React from 'react'
import PostCard from '../components/PostCard'
import './PostSection.css'

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visiblePosts.length && visiblePosts[0].title !== undefined && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard key={post.fields.slug+index} {...post} />
            ))}
          </div>
        )}
        {!!visiblePosts.length && visiblePosts[0].title === undefined && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard
                key={post.frontmatter.title+index}
                featuredImage={post.frontmatter.featuredImage}
                date={post.frontmatter.date}
                title={post.frontmatter.title}
                slug={post.fields.slug}
                categories={post.frontmatter.categories}
                excerpt=""
              />
            ))}
          </div>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default PostSection
