Template.assetCloudUpload.onCreated(function(){
  this.uploader = new Slingshot.Upload("google-cloud");

});

Template.assetCloudUpload.onRendered(function(){

  var currentAsset = Session.get('admin_doc');
  if (!currentAsset) return;


  $('#assetType').val(currentAsset.assetType);

  if (currentAsset.assetType && currentAsset.assetType.indexOf('image') > -1) {
    $('#imageWidth').val(currentAsset.imageWidth);
    $('#imageHeight').val(currentAsset.imageHeight);
  }
});

Template.assetCloudUpload.events({
  'change #assetCloud': function(evt, templ) {
    var file = document.getElementById('assetCloud').files[0];

    templ.uploader.send(file, function (error, downloadUrl) {
      if (error) {
        // Log service detailed response
        //console.error('Error uploading', templ.uploader.xhr.response);
        alert (error);
      }
      else {
        $('#assetFile').val(downloadUrl);

        if (file.type.indexOf('image') > -1) {
          var pic_real_width, pic_real_height;
          $("<img/>") // Make in memory copy of image to avoid css issues
            .attr("src", downloadUrl)
            .load(function () {
              $('#imageWidth').val(this.width);
              $('#imageHeight').val(this.height);
            });
        }
      }
    });

    $('#filename').text(file.name);
    $('#assetType').val(file.type);
  }
});

Template.assetCloudUpload.helpers({
  'toJSON': function(val) {
    return JSON.stringify(val);
  },
  'previewurl': function(value) {
    if(value)
      return value;
    else
      return Template.instance().uploader.url(true);
  }
});

AutoForm.addInputType("assetCloudUpload", {
  template: "assetCloudUpload"
});
