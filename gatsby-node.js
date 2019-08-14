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
      data.forEach(({
        node: {
          id, fields, frontmatter, parent,
        },
      }) => {
        const { langKey, slug } = fields;
        const { sysTemplate, sysPath } = frontmatter;
        const { id: fileId, name } = parent;
        const markdownFilenameData = name.split('.');
        const envDataAdaptation = process.env.ACN_ADAPTATION || '';
        const envDataAdaptationList = envDataAdaptation.split(',');
        if (envDataAdaptationList.length) {
          envDataAdaptationList.forEach((adaptation) => {
            const cleanedUpAdaptation = adaptation.trim();
            const pageDataComponentPath = `src/templates/${sysTemplate}.jsx`;
            const pageDataPathData = [];
            const pageDataContextRootPathData = [];
            if (cleanedUpAdaptation) {
              pageDataPathData.push(cleanedUpAdaptation);
              pageDataContextRootPathData.push(cleanedUpAdaptation);
            }
            if (langKey) {
              pageDataPathData.push(langKey);
              pageDataContextRootPathData.push(langKey);
            }
            if (sysPath) {
              pageDataPathData.push(sysPath);
            }
            const createPageData = {
              path: `/${pageDataPathData.join('/')}`,
              component: path.resolve(pageDataComponentPath),
              context: {
                ...fields,
                refAdaptation: cleanedUpAdaptation,
                refContentId: id,
                relativeURL: `/${pageDataContextRootPathData.join('/')}`,
              },
            };
            if (name.split('.').includes('index')) {
              /*
               * The markdown filename match case:
               * -> index.__LangKey__.md
               * */
              createPage(createPageData);
            } else if (
              markdownFilenameData.length
              && markdownFilenameData[0] === cleanedUpAdaptation
            ) {
              /*
               * The markdown filename match case (A and B):
               * -> __Adaptation__ is equal to adaptation
               * -> __Adaptation__.__LangKey__.md
               * */
              createPage(createPageData);
            }
          });
        }
      });
      return true;
    });
};

const templates = {
  basicPages: (props) => templatesCallback({
    query: `
{
  allMarkdownRemark(
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
  templates.basicPages(props),
]);
