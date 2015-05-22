var currentModalScope = new ReactiveVar('');

Template.afAssetLookup.helpers({
  scope: function (scope) {
    return scope.replace(/\./g, '');
  },
  asset : function(assetId) {
    return MuseumAssets.findOne({file: assetId});
  },
  isImage: function (assetType) {
    return typeIsImage(assetType);
  },
  assetIcon: function (assetType) {
    return getAssetIcon(assetType);
  },
  getAssetName: function (assetId) {
    var asset = MuseumAssets.findOne({'file': assetId});
    return asset.title + ' (' + asset.assetType + ')';
  }
});

Template.afAssetLookup.rendered = function () {
  if ($('body .AssetLookupContainer #assetlookup').length < 1) {
    Blaze.render(Template.AssetLookup, $('.AssetLookupContainer')[0]);
  }
};

Template.afAssetLookup.events({
  'click a': function (e, t) {
    currentModalScope.set($(e.target).attr('scope'));
  }
});

Template.AssetLookup.helpers({
  assets: function () {
    return MuseumAssets.find().fetch();
  },
  isImage: function (type) {
    return typeIsImage(type);
  },
  assetIcon: function (type) {
    return getAssetIcon(type);
  }
});

function typeIsImage(type) {
  return type.indexOf('image') > -1;
}

function getAssetIcon(type) {
  var icon = 'file-o';

  if (type.indexOf('pdf') > -1)
    icon = 'file-pdf-o';
  if (type.indexOf('audio') > -1)
    icon = 'music';

  return icon;
}

Template.AssetLookup.events({

  'click img': function(e, t) {
    var fileUrl = $(e.target).attr('file');

    var scope = '#' + currentModalScope.get();
    $(scope + ' input')[0].value = fileUrl;

    $(scope + ' img.assetpreview').attr('src', fileUrl);


    $('#assetlookup').modal('hide');
  }
});

AutoForm.addInputType("assetLookup", {
  template: "afAssetLookup"
});