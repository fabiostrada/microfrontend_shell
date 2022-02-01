const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
//const ExternalTemplateRemotesPlugin = require("./external.template.remote.plugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
//const { appConfig } = require("./module.config");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        // name: "shell",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './/src/app/app.component.ts',
        // },        
        
        // For hosts (please adjust)
        /*
        remotes: {
            "login": "http://localhost:" + appConfig.login.port  + "/remoteEntry.js?" + randomString(10),
            "admin": "http://localhost:" + appConfig.admin.port + "/remoteEntry.js?" + randomString(10),
            "dashboard": "http://localhost:" + appConfig.dashboard.port + "/remoteEntry.js?" + randomString(10),
        },*/

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "my-authenticator-lib": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    //new ExternalTemplateRemotesPlugin(),
    sharedMappings.getPlugin()
  ],
};

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
