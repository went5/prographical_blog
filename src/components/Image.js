import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Observer from './Observer'
import './Image.css'

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  imageSizes = [
    '320',
    '450',
    '640',
    '750',
    '800',
    '900',
    '1000',
    '1200',
    '1500',
    '1600',
    '2000'
  ] // image sizes used for image source sets

  state = {
    isIntersecting: false
  }

  handleIntersection = e => {
    if (e.isIntersecting) {
      this.setState({ isIntersecting: true })
    }
  }

  checkIsUploadGooglePhoto(src) {
    return typeof src === 'string' && src.includes('google')
  }

  getResolutionString(res) {
    /* add resolutions options for inline images */
    if (res === 'small') {
      res = 'w800'
    } else if (res === 'medium') {
      res = 'w1000'
    } else if (res === 'large') {
      res = 'w2000'
    }
    return res
  }

  render() {
    let {
      background,
      backgroundSize = 'cover',
      resolutions = 'w1000',
      className = '',
      width = '',
      src,
      secSet = '',
      fullSrc,
      smallSrc,
      title = '',
      alt = '',
      lazy = true
    } = this.props

    const isGooglePhoto = this.checkIsUploadGooglePhoto(src),
      fullImage = !isGooglePhoto || !lazy

    /* create source set for images */
    if (isGooglePhoto) {
      secSet = this.imageSizes.map(size => {
        return `${src}w${size}`
      })
    }

    fullSrc = `${src}${
      isGooglePhoto
        ? this.getResolutionString(resolutions)
        : ''
    }`
    smallSrc = `${src}${
      isGooglePhoto ? 'w800' : ''
    }`

    let style = {}
    if (background && lazy) {
      style = {
        backgroundImage: `url(${
          this.state.isIntersecting ? fullSrc : smallSrc
        })`,
        backgroundSize
      }
    } else {
      style = {
        backgroundImage: `url(${fullSrc})`,
        backgroundSize
      }
    }

    return (
      <Fragment>
        {isGooglePhoto && lazy && (
          <Observer onChange={this.handleIntersection}>
            <div
              className="BackgroundImage"
              ref={this.ref}
              style={{
                backgroundImage: `url(${smallSrc})`,
                backgroundSize: 'cover'
              }}
            >
              {!background && (
                <img
                  className={`LazyImage ${
                    className + this.state.isIntersecting ? ' faded' : ''
                  }`}
                  src={this.state.isIntersecting ? fullSrc : ''}
                  srcSet={this.state.isIntersecting ? secSet : ''}
                  sizes={'100vw'}
                  title={title}
                  alt={alt}
                />
              )}
              {background && (
                <div
                  className={`${lazy} LazyImage BackgroundImage absolute ${
                    className + this.state.isIntersecting ? ' faded' : ''
                  }`}
                  style={style}
                />
              )}
            </div>
          </Observer>
        )}
        {fullImage && (
          <Fragment>
            {background && (
              <div
                className={`BackgroundImage absolute ${className}`}
                style={style}
              />
            )}
            {!background && (
              <img
                className={`${className}`}
                src={fullSrc}
                srcSet={secSet}
                width={width}
                sizes={'100vw'}
                title={title}
                alt={alt}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image
