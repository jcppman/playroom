const aliases = require('./aliases');
const merge = require('lodash/merge');
const mapValues = require('lodash/mapValues');

const modules = ['@splunk/react-ui', '@splunk/react-icons'];

// const contexts = modules.map((moduleName) => {
//   return require.context(
//     moduleName,
//     false,
//     /\.js$/,
//   );
// })

const uiContext = require.context('@splunk/react-ui', false, /\.js$/);

const iconContext = require.context('@splunk/react-icons', false, /\.js$/);

const processFilename = f => f.match(/\.\/(.*?)\.js/)[1];

const extractComponents = context => {
  return context.keys().reduce((accum, curr) => {
    let comp;
    try {
      comp = context(curr).default;
    } catch {
      // do nothing
    }

    if (comp) {
      accum[processFilename(curr)] = comp;
    }
    return accum;
  }, {});
};

const components = [uiContext, iconContext].reduce((accum, context) => {
  const component = extractComponents(context);
  return { ...accum, ...component };
}, {});

module.exports = merge(components, mapValues(aliases, (v, k) => components[v]));
