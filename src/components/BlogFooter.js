import React from 'react'
import { Link } from 'gatsby'
import './BlogFooter.css'

const BlogFooter = categories => (
  <div className="BlogFooter">
    <div className="container">
      <div className="BlogFooter--Info">
        <div className="BlogFooter--Tags">
          <div className="TagButtons">
          {categories.categories.map((category, index) => (
            <Link
              exact="true"
              className="TagButton"
              key={category.frontmatter.title + index}
              to={`/category/${category.frontmatter.title.toLowerCase()}`}
            >
              {category.frontmatter.title}
            </Link>
          ))}
          </div>
          </div>
      </div>
    </div>
  </div>
)
export default BlogFooter
