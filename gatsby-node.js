/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

const templatesCallback = (props) => {
  const {
    query, boundActionCreators, graphql,
  } = props;
  const {
    createPage,
  } = boundActionCreators;
  return graphql(query)
    .then((res) => {
      const {
        data: { allMarkdownRemark: { edges: data } },
        errors,
      } = res;
      if (errors) {
        return Promise.reject(errors);
      }
      data.forEach(({ node }) => {
        const { sysTemplate, sysPath } = node.frontmatter;
        const cTemplatePath = `src/templates/${sysTemplate}.jsx`;
        createPage({
          path: sysPath,
          component: path.resolve(cTemplatePath),
        });
      });
      return true;
    });
};

const templates = {
  basicPages: props => templatesCallback({
    query: `{
    allMarkdownRemark(
      filter: { frontmatter: { sysTemplate: { ne: "" } } }
     ) {
      edges {
        node {
          frontmatter {
            sysTemplate
            sysPath
          }
        }
      }
    }
  }`,
    ...props,
  }),
};

exports.createPages = props => Promise.all([
  templates.basicPages(props),
]);
