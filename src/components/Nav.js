import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { FaHome, FaEnvelope } from 'react-icons/fa'
import 'typeface-cinzel'
import './Nav.css'

class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      NavLink = ({ to, className, children,label, ...props }) => (
        <Link
          aria-label={label}
          to={to}
          className={`NavLinkButton NeumoCircleButton ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''} `}>
        <div className="Nav--Container container ">
          <Link
            className="NavTitle"
            style={{ fontFamily: 'Cinzen, serif' }}
            to="/"
          >
            Prographical
          </Link>
          <div className="Nav--Links">
          <NavLink to="/" label="home">
              <FaHome />
            </NavLink>
            <NavLink to="/contact/" label="">
              <FaEnvelope />
            </NavLink>
          </div>
        </div>
      </nav>
    )
  }
}

const Nav= ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
export default Nav
