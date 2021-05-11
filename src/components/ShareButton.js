import React from 'react'
import Helmet from 'react-helmet'
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from 'react-share'
import './ShareButton.css'
import { FaTwitter, FaPinterestP, FaFacebookF } from 'react-icons/fa'
// SNSシェアボタンセクション
// title : 記事タイトル
// articleUrl : 記事URL
const ShareButton = ({ title, articleUrl }) => (
  <div className="Share">
    <FacebookShareButton url={articleUrl} className="ShareFaceBook">
      <FaFacebookF size={20}  />
    </FacebookShareButton>
    <PinterestShareButton url={articleUrl} className="SharePintarest">
      <FaPinterestP size={20} />
    </PinterestShareButton>

    <TwitterShareButton title={title} url={articleUrl} className="ShareTwitter" via="prograhical">
      <FaTwitter size={20} />
    </TwitterShareButton>
    <Helmet>
      <script
        type="text/javascript"
        src="//b.st-hatena.com/js/bookmark_button.js"
        charset="utf-8"
        async="async"
      />
    </Helmet>
      <a className="ShareHatebu" aria-label="sharehatebu" href={"http://b.hatena.ne.jp/add?mode=confirm&url=" + articleUrl + "&title=" + title} >
    </a>
  </div>
)
export default ShareButton
