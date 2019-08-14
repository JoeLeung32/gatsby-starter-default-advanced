import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SEO from '../components/seo';

export default function Template(props) {
  const { data } = props;
  const { markdownRemark: post } = data;
  if (!post) {
    return null;
  }
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
  query BlogPostByPath($langKey: String!, $refPath: String!) {
    markdownRemark(
      fields: { langKey: { eq: $langKey } },
      frontmatter: { sysPath: { eq: $refPath } },
    ) {
      html
      frontmatter {
        sysPath
        title
      }
    }
  }
`;
