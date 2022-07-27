const { createGatsbyPluginImageResolver } = require('./resolvers');

exports.createGatsbyImageDataResolver = (gatsbyUtils, pluginOptions) => {
  const { createResolvers } = gatsbyUtils;
  const { transformTypes } = pluginOptions;
  const gatsbyImageResolver = createGatsbyPluginImageResolver(
    gatsbyUtils,
    pluginOptions
  );

  if (gatsbyImageResolver) {
    const resolvers = {};

    transformTypes.forEach((type) => {
      // Add gatsbyImageData resolver
      // to all types that should be transformed
      resolvers[type] = {
        gatsbyImageData: gatsbyImageResolver,
      };
    });

    createResolvers(resolvers);
  }
};
