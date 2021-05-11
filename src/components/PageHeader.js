import React from 'react'
import PropTypes from 'prop-types'
import './PageHeader.css'
import "typeface-cinzel"

const PageHeader = ({
  title,
  subtitle,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  if(title === "") return null
  return (
    <div className={`PageHeader relative ${className}`}>
      <div className="container relative">
        <h1 className="PageHeader--Title" style={{ fontFamily: "Cinzen, serif" }} >{title}</h1>
        <div className="PageHeader--Subtitle" style={{ fontFamily: "Cinzen, serif" }} >{subtitle}</div>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
