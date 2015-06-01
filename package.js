Package.describe({
  name: 'q42:meteor-admin-assetmanager',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'assetmanager for meteor admin',
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('aldeed:autoform@4.2.2');
  api.use('aldeed:simple-schema@1.3.3');

  api.use('edgee:slingshot@0.6.3');

  api.use('blaze');
  api.use('spacebars');
  api.use('templating');
  api.use('reactive-var');
  api.use('mongo');

  api.addFiles([
    'both/collection.js'
  ]);

  api.addFiles([
    'server/filesize.js',
    'server/assetCloudUpload.js'
  ], 'server');

  api.addFiles([
    'lib/assetCloudUpload.html',
    'lib/assetCloudUpload.js',
    'lib/assetCloudUpload.styl',
    'lib/assetLookup.html',
    'lib/assetLookup.js',
    'lib/assetLookup.styl',
    'lib/assetmanager.html',
    'lib/assetmanager.js',
    'lib/assetmanager.styl'
  ], 'client');


  api.export('createAssetSchema');
  api.export('AssetManager');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('q42:meteor-admin-assetmanager');
});
