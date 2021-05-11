import React from 'react'
import { graphql } from 'gatsby'
import FormSimpleAjax from '../components/FormSimpleAjax'
import Layout from '../components/Layout'
import './ContactPage.css'
import 'typeface-cinzel'

// Export Template for use in CMS preview
export const ContactPageTemplate = () => (
  <main className="Contact">
    <section className="section thin">
      <div className="container">
        <div className="Contact--Header">
          <div
            className="PageTitle"
            style={{ fontFamily: 'Cinzen,serif' }}
          >
            Contact
          </div>
        </div>
      </div>
    </section>
    <section className="Contact--Section">
      <div className="container Contact--Section--Container">
          <FormSimpleAjax name="Simple Form Ajax" />
      </div>
    </section>
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
      }
    }
  }
`
