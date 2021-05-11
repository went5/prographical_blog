import React from 'react'
import { Link } from 'gatsby'
import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'
import { FaSearch, FaPencilRuler, FaUnity, FaHome } from 'react-icons/fa'
import 'typeface-cinzel'
import MediaQuery from 'react-responsive'

const PostCategoriesNav = ({
  enableSearch,
  categories,
  title = categories === '' ? 'Programming and Graphics' : `Category:${categories}`
}) => (
  <div className="PostCategoriesNav">
    <div className="PageTitle" style={{ fontFamily: 'Cinzen,serif' }}>
      {`${title} `}
    </div>
    <div className="relative PostCategoriesNav--Format">
      {enableSearch && <BlogSearch />}
      <FaSearch className="Searchicon" />
    </div>
    <div className="PostSearchButtons">
      <Link
        className="PostButton NeumoEllipseButton"
        aria-label="home"
        exact="true"
        to={`/`}
      >
        <FaHome
          className="PostSearch--ButtonIcon"
          style={{ fontSize: '15px' }}
        />
        <MediaQuery query="(min-width:561px)">All</MediaQuery>
      </Link>
      <Link
        exact="true"
        className="PostButton NeumoEllipseButton"
        to="/category/unity"
        aria-label="unity"
      >
        <FaUnity
          className="PostSearch--ButtonIcon"
          style={{ fontSize: '20px' }}
        />
        <MediaQuery query="(min-width:561px)">Unity</MediaQuery>
      </Link>
      <Link
        exact="true"
        className="PostButton NeumoEllipseButton"
        to="/category/unrealengine"
        aria-label="ue4"
      >
        <div className="PostSearch--ButtonImage">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 2000 2000"
            fill="var(--secondary)"
            preserveAspectRatio="xMidYMid meet"
          >
            <g id="layer101" stroke="none">
              <path d="M825 1793 c-251 -53 -481 -249 -580 -490 -74 -184 -73 -430 4 -615 80 -191 256 -365 448 -443 180 -73 426 -73 606 0 192 78 368 252 448 443 78 189 78 435 0 624 -80 191 -256 365 -448 443 -133 54 -332 70 -478 38z m268 -113 c430 -62 694 -490 557 -902 -65 -194 -234 -363 -428 -428 -308 -102 -649 23 -810 296 -162 274 -120 617 103 839 152 153 368 225 578 195z" />
              <path d="M894 1480 c-40 -10 -95 -30 -124 -45 -49 -25 -140 -99 -140 -115 0 -4 20 -7 45 -8 76 -1 75 1 75 -224 0 -118 -4 -207 -10 -219 -33 -61 -164 32 -258 185 l-37 60 -3 -33 c-5 -51 42 -189 89 -261 95 -148 273 -277 432 -314 26 -6 24 -2 -27 48 -53 51 -56 57 -56 103 0 51 21 93 46 93 12 0 14 37 14 240 0 226 1 240 19 250 30 16 57 12 111 -15 l50 -25 0 -213 c0 -206 -1 -213 -25 -254 -21 -38 -22 -43 -6 -43 9 0 26 6 36 14 17 12 23 10 60 -21 43 -37 156 -95 217 -111 l36 -10 -45 62 c-86 117 -84 106 -81 373 l3 236 28 10 c40 13 100 -12 165 -69 28 -25 52 -42 52 -37 0 19 -77 122 -130 174 -32 31 -85 73 -118 93 l-61 37 -62 -31 -62 -32 -61 61 c-35 35 -70 61 -81 60 -11 0 -52 -9 -91 -19z" />
            </g>
          </svg>
        </div>
        <MediaQuery query="(min-width:561px)">UE4</MediaQuery>
      </Link>
      <Link
        exact="true"
        className="PostButton NeumoEllipseButton"
        to="/category/design"
        aria-label="design"
      >
        <FaPencilRuler className="PostSearch--ButtonIcon" />
        <MediaQuery query="(min-width:561px)">Design</MediaQuery>
      </Link>
    </div>
  </div>
)

export default PostCategoriesNav
