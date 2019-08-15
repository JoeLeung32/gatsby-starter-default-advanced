require('dotenv').config(
  { path: `./.env.${process.env.NODE_ENV}` },
);

const envGoogleAnalyticsTrackingID = process.env.GA_TRACKING_ID || '';
const envPathPrefix = process.env.ACN_PATH_PREFIX || '';
const envSiteMetadata = {
  title: process.env.ACN_HEAD_META_TITLE || '',
  description: process.env.ACN_HEAD_META_DESCRIPTION || '',
  author: process.env.ACN_HEAD_META_AUTHOR || '',
  googleAnalyticsTrackingId: envGoogleAnalyticsTrackingID,
};
const pluginList = [
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-offline',
  'gatsby-plugin-sass',
  'gatsby-transformer-remark',
];

module.exports = {
  pathPrefix: envPathPrefix,
  siteMetadata: envSiteMetadata,
  plugins: [
    ...pluginList,
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          envGoogleAnalyticsTrackingID,
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: [
          'develop',
        ],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-remark-video',
      options: {
        width: 800,
        height: 'auto',
        preload: 'auto',
        muted: false,
        autoplay: false,
        loop: false,
      },
    }, {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: 'zh',
        useLangKeyLayout: false,
      },
    },
  ],
};
