const { setPluginOptions, getPluginOptions } = require('./options');
const {
  createAssetNodesFromData,
  createAssetNodeFromFile,
} = require('./node-creation');
const {
  createGatsbyImageResolvers,
  addFragments,
  createGatsbyImageTypes,
} = require('./gatsby-image');

// Here is step 3. Global State of our Gatsby v4 plugin upgrade code with emojis
// yarn add gatsby-plugin-utils inside packages/gatsby-transformer-cloudinary
// gatsby-plugin-utils will help you keep backwards compatibility with Gatsby 3 while moving forward to a Gatsby 4 world

// let emojisRepresent = {
//   // swap out some of the emojis with code
//   'on🔌👸': onPluginInit,
//   '💩🐸On🔌👸': coreSupportsOnPluginInit,
//   // how: 💩🐸: coreSupports
//   // how: on🔌👸: OnPluginInit
//   '🚴‍♀️⛵': isGatsbyNodeLifecycleSupported,
//   // how: 🚴‍♀️  Lifecycle your ⛵, not much wind in our Labyrinth
//   '🐲👑': 'unstable',
//   // how: 🐲👑: is .... mentally 'unstable'
//   '🏴‍☠️👸': 'stable',
//   // how: 🏴‍☠️👸: is mentally 'stable'
//   '🌐🌀': initializeGlobalState,
//   // how: 🌐: initializeGlobal 🌀: State = laby
// };

let coreSupportsOnPluginInit = undefined;

// 1. try {coreSupportsOnPluginInit = "🏴‍☠️👸" or "un🏴‍☠️👸"} catch

try {
  const { isGatsbyNodeLifecycleSupported } = require(`gatsby-plugin-utils`);

  // 3. else if
  if (isGatsbyNodeLifecycleSupported(`onPluginInit`)) {
    console.log('💩🐸On🔌👸 = stable 👍');
    coreSupportsOnPluginInit = 'stable';
  } else if (isGatsbyNodeLifecycleSupported(`unstable_onPluginInit`)) {
    console.log('💩🐸On🔌👸 = unstable 👉');
    coreSupportsOnPluginInit = 'unstable';
  }
} catch (error) {
  console.error(
    `Could not check if Gatsby supports onPluginInit lifecycle on🔌👸 🚴‍♀️ 👎`
  );
}

// const
const pluginOptions = getPluginOptions();

// 4. const 👸🌐🌀
const initializeGlobalState = (pluginOptions, { reporter }) => {
  console.log('Plugin Options are 👍');
  setPluginOptions({ pluginOptions, reporter });
};

// 5.  if (💩🐸On🔌👸 === 'stable') {} else if (💩🐸On🔌👸 === 'unstable') {} else {}

if (coreSupportsOnPluginInit === 'stable') {
  console.log('on🔌👸 = stable 👍');
  exports.onPluginInit = initializeGlobalState;
} else if (coreSupportsOnPluginInit === 'unstable') {
  console.log('on🔌👸 = unstable 👉');
  exports.unstable_onPluginInit = initializeGlobalState;
} else {
  console.log('onPreInit 👸');
  exports.onPreInit = initializeGlobalState;
}

//import plugin options, used to check for API key before uploading assets to Cloudinary
// I promise to delete this code soon
// const pluginOptions = getPluginOptions();

// exports.onPreInit = ({ reporter }, pluginOptions) => {
//   setPluginOptions({ pluginOptions, reporter });
// };

exports.onPreExtractQueries = async (gatsbyUtils) => {
  // Fragments to be used with gatsby-image
  await addFragments(gatsbyUtils);
};

exports.createSchemaCustomization = (gatsbyUtils) => {
  // Types to be used with gatsby-image
  createGatsbyImageTypes(gatsbyUtils);
};

exports.createResolvers = (gatsbyUtils) => {
  // Resolvers to be used with gatsby-image
  createGatsbyImageResolvers(gatsbyUtils);
};

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  // Create nodes from existing cloudinary data
  createAssetNodesFromData({
    node,
    actions,
    createNodeId,
    createContentDigest,
    reporter,
  });

  // Create nodes for files to be uploaded to cloudinary
  if (
    pluginOptions.apiKey &&
    pluginOptions.apiSecret &&
    pluginOptions.cloudName
  ) {
    await createAssetNodeFromFile({
      node,
      actions,
      createNodeId,
      createContentDigest,
      reporter,
    });
  }
};
