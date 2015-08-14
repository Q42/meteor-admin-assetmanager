function _createAbsoluteUrl(path) {
    var assetSource = Meteor.settings.public.AssetManagerRemoteSource;
    if (assetSource)
        return assetSource + path;

    return path;
}

AssetManager = AssetManager || {};
AssetManager.createAbsoluteUrl = _createAbsoluteUrl;
