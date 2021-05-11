import React from 'react'
import './ProfileCard.css'
import Img from './StaticImage'
import { FaTwitter, FaGithub } from 'react-icons/fa'
import { Link } from 'gatsby'
import MediaQuery from 'react-responsive'

const ProfileCard = () => (
  <div className="Profile">
    <div className="ProfileCard">
      <div className="ProfileImage relative">
        <Img filename={'profileicon.png'} className="ProfileImage--Circle" />
      </div>
      <div className="ProfileBody">
        <div className="Name">丹生ト / Newto</div>
        <div className="Job">Front-end Game Engineer</div>
        <MediaQuery query="(min-width:561px)">
          <p className="Body">
            都内のゲーム会社で働きつつ、個人でゲームを作ってます。最近はテクニカルアーティストになるために絵作りの勉強もしています！
          </p>
        </MediaQuery>
      </div>
      <div className="ProfileSNS">
        <Link
          className="NeumoCircleLightButton SNSButton"
          to={'https://twitter.com/prograhical'}
        >
          <FaTwitter size={20} className="TwitterButton" />
        </Link>
        <Link
          className="NeumoCircleLightButton SNSButton"
          to={'https://github.com/newto-cg'}
        >
          <FaGithub size={20} className="GithubButton" />
        </Link>
      </div>
    </div>
  </div>
)

export default ProfileCard
