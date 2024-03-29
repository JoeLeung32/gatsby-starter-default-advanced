import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import JS from '../../static/javascripts/globle';

const IndexPage = ({ data }) => {
  const { allMarkdownRemark: edges } = data;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>


      <h2>Index</h2>
      <ul>
        {edges.edges.map((post) => {
          const nextUrl = JS.makeURLWithPathname(
            post.node.fields.langKey,
            post.node.frontmatter.sysPath,
          );
          return (
            <li key={post.node.id}>
              <Link
                key={post.node.id}
                to={nextUrl}
              >
                {post.node.frontmatter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

IndexPage.defaultProps = {
  data: {},
};

export const pageQuery = graphql`
  query IndexQuery {  
    allMarkdownRemark(
      limit: 10 
      filter: { frontmatter: { draft: { eq: false } } }
      sort: {fields: frontmatter___date order: DESC}
    ) {
      edges {
        node {
          id
          fields {
            langKey
            slug
          }
          frontmatter {
            title
            sysPath
            draft
            date
          }
        }
      }
    }
  }
`;

export default IndexPage;
