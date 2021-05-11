import React from 'react'
import { Link } from 'gatsby'
import Image from './Image'
import './PostCard.css'
import MediaQuery from 'react-responsive'

const PostCard = ({
  featuredImage,
  title,
  date,
  excerpt,
  slug,
  categories = [],
  className = ''
}) => (
  <div className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Day">{date}</div>
      <div className="PostCard--Categories">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={`/category/${cat}`}
            className="PostCard--Category"
            aria-label={`category { cat }`}
          >
            {cat}
          </Link>
        ))}
      </div>
      <MediaQuery query="(min-width:561px)">
        {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}
      </MediaQuery>
        <Link to={slug} className="PostCard--Link" aria-label={`${slug} link`} />
    </div>
  </div>
)

export default PostCard
