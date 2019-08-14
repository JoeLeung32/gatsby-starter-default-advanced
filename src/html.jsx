import React from 'react';
import PropTypes from 'prop-types';

const HTML = (props) => {
  const {
    headComponents,
    body,
    postBodyComponents,
  } = props;
  return (
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Accenture Project</title>
        {headComponents}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  );
};

HTML.propTypes = {
  headComponents: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  postBodyComponents: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

HTML.defaultProps = {
  headComponents: {},
  body: '',
  postBodyComponents: {},
};

export default HTML;
