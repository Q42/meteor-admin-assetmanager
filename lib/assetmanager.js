
Template.AssetManagerView.helpers({
  assets: function() {
    return MuseumAssets.find().fetch();
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
