
createAssetSchema = function () {

    return new SimpleSchema({
        createdAt: {
            type: Date,
            autoValue: function () {
                if (this.isInsert) {
                    return new Date();
                }
            },
            autoform: {
                omit: true,
            }
        },

        updatedAt: {
            type: Date,
            optional: true,
            autoValue: function () {
                if (this.isUpdate) {
                    return new Date();
                }
            },
            autoform: {
                omit: true,
            }
        },

        title: {
            type: String,
            label: 'Titel'
        },
        description: {
            type: String,
            optional: true,
            label: 'Omschrijving'
        },
        file: {
            type: String,
            autoform: {
                type: 'assetCloudUpload'
            }
        },
        assetType: {
            type: String,
            autoform: {
                omit: true
            }
        },
        imageWidth: {
            type: String,
            optional: true,
            autoform: {
                omit: true
            }
        },
        imageHeight: {
            type: String,
            optional: true,
            autoform: {
                omit: true
            }
        }
    });

}

