Package.describe({
  name: 'q42:meteor-admin-assetmanager',
  version: '1.0.0',

  summary: 'Asset manager for Meteor Admin',
  git: 'https://github.com/Q42/meteor-admin-assetmanager',

  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('aldeed:autoform@5.5.1');
  api.use('aldeed:simple-schema@1.3.3');


  api.use('cfs:standard-packages@0.0.2');
  api.use('cfs:gridfs@0.0.0');

  api.use('edgee:slingshot@0.6.3');

  api.use('blaze');
  api.use('spacebars');
  api.use('templating');
  api.use('reactive-var');
  api.use('tracker');
  api.use('mongo');

  api.addFiles([
    'both/collection.js'
  ]);

  api.addFiles([
    'server/filesize.js',
    'server/assetCloudUpload.js'
  ], 'server');

  api.addFiles([
    'lib/resize.js',
    'lib/urlResolver.js',
    'lib/_cfsUpload.html',
    'lib/_cfsUpload.js',
    'lib/assetCloudUpload.html',
    'lib/assetCloudUpload.js',
    'lib/assetCloudUpload.css',
    'lib/assetLookup.html',
    'lib/assetLookup.css',
    'lib/assetmanager.html',
    'lib/assetmanager.js',
    'lib/assetmanager.css'
  ], 'client');

  api.export('createCfsSchema');
  api.export('createAssetSchema');
  api.export('FS');
  api.export('AssetManager');
});

