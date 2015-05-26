Package.describe({
  name: 'q42:meteor-admin-assetmanager',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('aldeed:autoform');
  api.use('aldeed:simple-schema');

  api.use('edgee:slingshot');

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
    'lib/assetCloudUpload.css',
    'lib/assetLookup.html',
    'lib/assetLookup.js',
    'lib/assetLookup.css',
    'lib/assetmanager.html',
    'lib/assetmanager.js',
    'lib/assetmanager.css'
  ], 'client');


  api.export('createAssetSchema');
  api.export('AssetManager');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('q42:meteor-admin-assetmanager');
  api.addFiles('meteor-admin-assetmanager-tests.js');
});
