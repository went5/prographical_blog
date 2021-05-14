import React from 'react'
import { navigate } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

const BlogSearch= () => {
  return (
    <Location>
      {({ location }) => {
        return (
          <input
            type="text"
            placeholder=""
            aria-label="検索"
            onChange={e => {
              let search = {}
              search.s = e.target.value
              search = qs.stringify(search)
              const url = location.href
                .replace(location.origin, '')
                .replace(location.search, '')
              navigate(`${url}?${search}`)
            }}
          />
        )
      }}
    </Location>
  )
}

export default BlogSearch;