const Template = require('webpack/lib/Template')

class MattUnloaderTemplatePlugin {
  apply(mainTemplate) {
    console.log(Object.keys(mainTemplate.hooks))
    mainTemplate.hooks.localVars.tap("MattUnloaderTemplatePlugin", (source, chunk, hash) => {
      return Template.asString([source, "// MATT WAS HERE"]);
    })
  }
}

class MattTemplatePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("MattTemplatePlugin", compilation => {
      new MattUnloaderTemplatePlugin().apply(compilation.mainTemplate);
    });
  }
}


module.exports = MattTemplatePlugin;
