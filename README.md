Meteor Admin AssetManager
========



## Setup

Include the package:

	meteor add q42:meteor-admin-assetmanager

Create a new schema for your assets.

	Media = new Mongo.Collection('media');

Create the schema (Cfs or Cloud) and attach it to the collection

	Schemas.Media = createCfsSchema();

	Media.attachSchema(Schemas.Media);

Create a GridFS file storage. This is a FS.Collection, not a regular Mongo.Collection.

	FileStorage = new FS.Collection("fileStorage", {
		stores: [new FS.Store.GridFS("fileStorage")]
	});

Once you have set it up, tell the AssetManager about your collections:
	
	if (Meteor.isClient && !Meteor.isCordova) {
		AssetManager.setCfsCollection(Media, FileStorage);
	}
	  
The FileStorage also needs to have permissions set. Note there is a `download` permission now too.

	FileStorage.allow({
		insert : () => true,
		update : () => true,
		remove : () => true,
		download : () => true
	});

Publish both the Media collection and the FileStorage collection. The latter is only needed for the upload form. If you have a separate Meteor instance that connects to this data you will most likely only need Media.

	Meteor.publish('assets', function() {
	  return [
	    Media.find(),
	    FileStorage.find()
	  ];
	});



Add the Media collection to Meteor Admin's config:

    Media: {
      icon: 'image',
      label: 'Media',
      tableColumns: [
        {label: 'Titel', name: 'title'}
      ],
      templates: {
        view: {
          name: 'AssetManagerView'
        }
      }
    },




## usage

Retrieve the serving url of the asset. see [CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS) for options

	var url = Media.findOne().url()