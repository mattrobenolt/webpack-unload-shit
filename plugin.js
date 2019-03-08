const Template = require('webpack/lib/Template')
const ParserHelpers = require('webpack/lib/ParserHelpers')

class MattUnloaderTemplatePlugin {
  apply(mainTemplate) {
    mainTemplate.hooks.localVars.tap("MattUnloaderTemplatePlugin", (source, chunk, hash) => {
      return Template.asString([source, "// MATT WAS HERE"]);
    })
  }
}

class MattUnloaderRequireParserPlugin {
  apply(parser) {
    parser.hooks.expression
      .for("matt.cache")
      .tap(
        "MattUnloaderRequireParserPlugin",
        ParserHelpers.toConstantDependencyWithWebpackRequire(
          parser,
          "__webpack_require__.matt"
        )
      );
  }
}

class MattTemplatePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("MattTemplatePlugin", compilation => {
      new MattUnloaderTemplatePlugin().apply(compilation.mainTemplate);
    });

    compiler.hooks.compilation.tap("MattTemplatePlugin", (compilation, { normalModuleFactory }) => {
      const handler = (parser, parserOptions) => {
        new MattUnloaderRequireParserPlugin().apply(parser);
      };
      normalModuleFactory.hooks.parser
        .for("javascript/auto")
        .tap("MattTemplatePlugin", handler);
      normalModuleFactory.hooks.parser
        .for("javascript/dynamic")
        .tap("MattTemplatePlugin", handler);
    })
  }
}


module.exports = MattTemplatePlugin;
