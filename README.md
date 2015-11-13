# Meteor Admin AssetManager

Easily upload files to [Meteor Admin (yogiben:admin)](https://github.com/yogiben/meteor-admin).

### Features

 * upload to either: 
	 * [Google Cloud Storage](https://cloud.google.com/storage) (via [Slingshot](https://github.com/CulturalMe/meteor-slingshot)) or 
	 * [Mongo GridFS](https://docs.mongodb.org/manual/core/gridfs/) (via [CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS))	
 * asset types currently supporting preview: image, audio
 * use the built-in asset lookup via an autoform param in your schemas


## Setup

Include the package:

	meteor add q42:meteor-admin-assetmanager

Create a new schema for your assets.

	Media = new Mongo.Collection('media');

Create the schema and attach it to the collection

	Schemas.Media = generateSchema('cfsUpload'); // 'assetCloudUpload' for Google Cloud

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




## Usage

	
Add an asset reference to your schema. 
	
	...
	photo: {
        type: String,
        label: 'photo (480 x 320)',
        optional: true,
        autoform: {
            type : 'assetLookup'
        }
    },
    ...
 

Retrieve the serving url of the asset. see [CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS) for options

	var url = Media.findOne(doc.photo).url();
	 
## Google Cloud
 
For storing assets in Google Cloud you must create a bucket and put the `GoogleCloudBucket` and `GoogleAccessId` in your Meteor settings:   

	{
	  "GoogleAccessId": "abc123@developer.gserviceaccount.com",
	  "GoogleCloudBucket": "my-bucket"
	}

## Contributing
Currently the setup requires quite a bit of boilerplate code. We'd like to bring that back to the minimum w/o giving up control of the collections.	i.e. We thinks
 it's a good idea that the application creates the collections, not AssetManager. If you have some ideas about that, please let us know.

Furthermore, previews for additional file types would be nice to have. Send us a PR if you'd like to help with that.

Apart from the above, we welcome any and all suggestions, and love PR's especially.