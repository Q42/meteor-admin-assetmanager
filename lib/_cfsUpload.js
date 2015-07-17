var newFileId = new ReactiveVar(null);
Template.cfsUpload.events({
  'change #assetCloud': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      FileStorage.insert(files[i], function (err, fileObj) {
        if(err != undefined) {
          console.console.log(err);
        } else {
          newFileId.set(fileObj._id);
        }
      });
    }
  }
});

Template.cfsUpload.helpers({
  file: function() {
    return FileStorage.findOne(newFileId.get());
  }
})


Tracker.autorun(function() {
  if(newFileId.get() != null) {
    var newFile = FileStorage.findOne(newFileId.get());
    $('#assetFile').val(newFile.url());
    $('#filename').text(newFile.original.name);
    $('#assetType').val(newFile.original.type);

    var file = document.getElementById('assetCloud').files[0];
    if (file.type.indexOf('image') > -1) {
      var pic_real_width, pic_real_height;
      $("<img/>") // Make in memory copy of image to avoid css issues
        .attr("src", newFile.url())
        .load(function () {
          $('#imageWidth').val(this.width);
          $('#imageHeight').val(this.height);
        });
    }
  }
});

AutoForm.addInputType("cfsUpload", {
  template: "cfsUpload"
});
