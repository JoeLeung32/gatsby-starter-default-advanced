import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SEO from '../components/seo';

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <>
      <SEO title={post.frontmatter.title} />
      <div>
        <h1>{post.frontmatter.title}</h1>
      </div>
    </>
  );
}

Template.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

Template.defaultProps = {
  data: {},
};

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { sysPath: { eq: $path } }) {
      html
      frontmatter {
        sysPath
        title
      }
    }
  }
`;
