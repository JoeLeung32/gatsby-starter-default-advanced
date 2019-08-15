/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require('dotenv').config(
  { path: `./.env.${process.env.NODE_ENV}` },
);
const path = require('path');

const templateFolder = (templateFilename) => {
  const templateFolderpath = 'src/templates/';
  return path.resolve(`${templateFolderpath}${templateFilename}.jsx`);
};

const templatesCallback = (props) => {
  const {
    query,
    boundActionCreators: { createPage },
    graphql,
  } = props;
  return graphql(query)
    .then((res) => {
      const { data: { mdPages: { edges: data = null } }, errors } = res;
      if (errors) return Promise.reject(errors);
      if (!data) return Promise.reject(new Error('gatsby_node_no_page_data'));
      data.forEach(({ node }) => {
        const {
          id, fields, frontmatter, parent,
        } = node;
        const { sysTemplate, sysPath } = frontmatter;
        const { langKey } = fields; // const { langKey, slug } = fields;
        const { name: parentName } = parent; // const { id: fileId, name } = parent;
        (process.env.ACN_ADAPTATION || '').split(',').forEach((adaptation) => {
          const createPageData = {
            path: null,
            component: templateFolder(sysTemplate),
            context: {
              contentId: id,
              relativeURL: null,
            },
          };
          const pageDataPathData = [];
          if (adaptation) {
            pageDataPathData.push(adaptation);
          }
          if (langKey) {
            pageDataPathData.push(langKey);
          }
          if (pageDataPathData) {
            createPageData.path = `/${[...pageDataPathData, sysPath].join('/')}`;
            createPageData.context.relativeURL = `/${pageDataPathData.join('/')}`;
          }
          switch (true) {
            case parentName.split('.').includes('index'):
            case parentName.split('.').includes(adaptation):
              /*
               * The markdown filename match case:
               * -> index.__LangKey__.md
               * -> __adaptation__.__LangKey__.md
               * */
              createPage(createPageData);
              break;
            default:
              break;
          }
        });
      });
      return true;
    });
};

const pages = {
  mdPages: (props) => templatesCallback({
    query: `
{
  mdPages: allMarkdownRemark(
    filter: {
      frontmatter: {sysTemplate: {ne: ""}}
    }, 
    sort: {fields: frontmatter___sysPath}
  ) {
    edges {
      node {
        id
        fields {
          langKey
          slug
        }
        frontmatter {
          sysTemplate
          sysPath
        }
        parent {
          ... on File {
            id
            name
          }
        }
      }
    }
  }
}
  `,
    ...props,
  }),
};

exports.createPages = (props) => Promise.all([
  pages.mdPages(props),
]);
