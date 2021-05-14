import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

// 画像ファイルパスをプロパティに取るようなコンポーネントを定義
const StaticImage = ({ filename, className }) => (
  // ページじゃないコンポーネントでもGraphQLが使えるように
  // StaticQueryタグを使う
  <StaticQuery
    // GraphQLのクエリ引数には何も指定しない！
    query={graphql`
      query {
        images: allFile(filter: {absolutePath: {regex: "/.+.(png|jpeg)/"}}) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 125) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    // 全画像情報がdataに代入されている
    render={data => {
      // 指定した画像ファイルパス（コンポーネントのプロパティ）と
      // 一致するgatsby-image用の情報を取得
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(filename)
      })

      if (!image) return

      // Imgタグでgatsby-imageで最適化された画像を表示する
      return <Img className={className} fluid={image.node.childImageSharp.fluid}/>
    }}
  />
)
export default StaticImage