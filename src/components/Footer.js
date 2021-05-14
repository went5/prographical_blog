import React from 'react'
import './Footer.css'

const Footer =() => (
  <div className="credit">
    <div className="container taCenter">
      <span>
        © Copyright {new Date().getFullYear()} All rights reserved. Created by
        Newto.
      </span>
    </div>
  </div>
)
export default Footer