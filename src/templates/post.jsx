import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SEO from '../components/seo';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Template(props) {
  const { data } = props;
  const { markdownRemark: post } = data;
  if (!post) {
    return null;
  }
  const classes = useStyles();
  return (
    <Container fixed>
      <SEO title={post.frontmatter.title} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <Button variant="contained" color="primary" className={classes.button}>
          Primary
        </Button>
      </div>
    </Container>
  );
}

Template.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

Template.defaultProps = {
  data: {},
};

export const postQuery = graphql`
  query BlogPostByPath($refContentId: String!) {
    markdownRemark(
      id: { eq: $refContentId }
    ) {
      html
      frontmatter {
        sysPath
        title
      }
    }
  }
`;
