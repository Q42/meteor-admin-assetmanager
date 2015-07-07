

AssetManager = AssetManager || {};

AssetManager.SetGoogleSecretKey = function(key) {
    Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = key


    Slingshot.fileRestrictions("google-cloud", {
        allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "audio/mpeg", "audio/mp3", "video/mp4"],
        maxSize: 25 * 1024 * 1024 // 10 MB (use null for unlimited)
    });

    Slingshot.createDirective("google-cloud", Slingshot.GoogleCloud, {
        bucket: Meteor.settings.GoogleCloudBucket,
        "acl": "public-read",

        authorize: function () {
            //Deny uploads if user is not logged in.
            if (!this.userId) {
                var message = "Please login before posting files";
                throw new Meteor.Error("Login Required", message);
            }

            return true;
        },

        key: function (file) {
            return Meteor.uuid();
        }
    });

};


