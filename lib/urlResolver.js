function _createAbsoluteUrl(path) {
    var assetHost = Meteor.settings.public.AssetHost;
    if (assetHost)
        return assetHost + path;

    return path;
}

AssetManager = AssetManager || {};
AssetManager.createAbsoluteUrl = _createAbsoluteUrl;
