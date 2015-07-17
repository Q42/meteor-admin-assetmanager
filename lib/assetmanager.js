AssetManager = AssetManager || {};


var assetCollection = null;


// shared state between the (singleton!) modal dialog and the autoform helper
var lookups = {};
var currentLookupId;


AssetManager.setAssetCollection = function(collection) {
  assetCollection = collection;
};

Template.AssetManagerView.helpers({
  collectionName: function() {
    return assetCollection._name.charAt(0).toUpperCase() + assetCollection._name.slice(1);
  },
  assets: function() {
    return assetCollection.find().fetch();
  },
  isImage: function(type) {
    return type && type.indexOf('image') > -1;
  },
  assetIcon: function(type) {
    if (!type) return;
    var icon = 'file-o';

    if(type.indexOf('pdf') > -1)
      icon = 'file-pdf-o';
    if(type.indexOf('audio') > -1)
      icon = 'music';

    return icon;
  }
});

Template.afAssetLookup.helpers({
  lookupId: function () {
    return Template.instance()._lookupId;
  },
  currentValue: function() {
   return lookups[Template.instance()._lookupId].get();
  },
  currentAsset: function() {
    var lookup = lookups[Template.instance()._lookupId];
    var assetId = lookup.get();

    var asset = assetCollection.findOne( assetId );


    console.log('currentAsset', assetId, asset);
    return asset;
  },

  preview: function(asset) {
    return asset.file; // for now
  },

  isImage: typeIsImage,

  assetIcon: getAssetIcon,

  getAssetName: function (assetId) {
    var asset = assetCollection.findOne({'file': assetId});
    return asset.title + ' (' + asset.assetType + ')';
  }
});


Template.afAssetLookup.onCreated(function() {
  this._lookupId = 'lookup-' + this.data.name + '-' + Meteor.uuid();
  var initialValue = this.data && this.data.value ? this.data.value : null;
  lookups[this._lookupId] = new ReactiveVar(initialValue);
});

Template.afAssetLookup.rendered = function () {
  if ($('.AssetLookupContainer').length < 1) {
    $('body').append('<div class="AssetLookupContainer"></div>');
  }
  if ($('body .AssetLookupContainer #assetlookup').length < 1) {
    Blaze.render(Template.AssetLookup, $('.AssetLookupContainer')[0]);
  }
};

Template.afAssetLookup.events({
  'click a': function (e, templ) {
    currentLookupId = templ._lookupId;
  }
});

Template.AssetLookup.helpers({
  assets: function () {
    return assetCollection.find().fetch();
  },
  isImage: typeIsImage,
  assetIcon: getAssetIcon
});

function typeIsImage(type) {
  if (!type) return false;
  return type.indexOf('image') > -1;
}

function getAssetIcon(type) {
  if (!type) return 'file-o';

  if (type.indexOf('pdf') > -1)
    return 'file-pdf-o';

  if (type.indexOf('audio') > -1 || type.indexOf('music') > -1)
    return 'file-audio-o';

  if (type.indexOf('video') > -1)
    return 'file-video-o';

  return 'file-o';
}

Template.AssetLookup.events({

  'click li': function(e, templ) {
    var assetId = e.currentTarget.getAttribute('file');
    lookups[currentLookupId].set(assetId);

    $('#assetlookup').modal('hide');
  }
});

AutoForm.addInputType("assetLookup", {
  template: "afAssetLookup"
});

