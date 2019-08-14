const removeSlash = /^\/|\/$/g;

module.exports = {
  makeURLWithPathname: (pathName, pageSysPath = '') => {
    const pathData = pathName.replace(removeSlash, '').split('/');
    pathData.push(pageSysPath);
    return `/${pathData.join('/')}`;
  },
};
