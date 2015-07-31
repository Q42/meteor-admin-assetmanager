
Template.registerHelper('resizeImage', _resize);

Template.registerHelper('resizeImageFullWidth', function(assetId, height) {
    return _resize(assetId, innerWidth, height, 'cover');
});

Template.registerHelper('bbox', function(assetId, w, h) {
    // bbox is square when only 1 side is given
    if (typeof  h != 'number') h = w;

   return _resize(assetId, w, h, false);
});


/*/
 This will return a new URL, pointing to the resizer app on appengine with an appended scaling parameter.

 - appengine will take one parameter (s) as a bounding box, meaning that
 1) it will look at the longest side of the image
 2) and scale the image down such that the longest side equals the s param
 - the bounding box will be calculated based on the width and height of the container of the image
 - we are assuming the use of background-size: cover in the accompanying css, meaning that the resulting url will
 cause the image to fill the container up totally and exactly, w/o showing any black borders.
 - the scale of the image will be adjusted according to the devicePixelRatio of the client (e.g. window.devicePixelRatio == 3 on an iPhone 6
 - in case the calculated size of the scaled image is larger than the original image then the original (unscaled) url is returned
 */
function _resize(assetId, width, height, cover) {
    console.log('resize', assetId, width, height);
    var asset = AssetCollection.findOne(assetId);
    if (!asset) return;
    if (!Meteor.settings.public || !Meteor.settings.public.resizeUrl) return asset.file;
    if (!asset.imageWidth || !asset.imageHeight) return asset.file;

    var containerWidth = width * (window.devicePixelRatio || 1);
    var containerHeight = height * (window.devicePixelRatio || 1);

    var scaledImage;
    if (cover && cover.toLowerCase() == 'cover')
        scaledImage = _coverContainer(asset.imageWidth, asset.imageHeight, containerWidth, containerHeight);
    else
        scaledImage = _stayInsideContainer(asset.imageWidth, asset.imageHeight, containerWidth, containerHeight);

    // take the longest side to define a bounding box
    var boundingBox = Math.max(scaledImage.width, scaledImage.height);
    var unscaledBoundingBox = Math.max(asset.imageWidth, asset.imageHeight);

    if (boundingBox > unscaledBoundingBox) // don't scale up. return original url
        return asset.file;

    return Meteor.settings.public.resizeUrl +  '/resize?url=' + asset.file + '&s=' + Math.round(boundingBox);
}

/*

 Based on the original dimensions of an image and the dimensions of the container,
 calculate new dimensions for the image such that it will completely cover the container.

 Just like background-size: cover in css.
 see: https://css-tricks.com/almanac/properties/b/background-size/

 */
function _coverContainer(ow, oh, cw, ch) {

    // compare aspect ratios
    if (cw/ch > ow/oh)
        return {
            width: cw,
            height: oh * cw / ow
        };

    return {
        width: ow * ch / oh,
        height: ch
    };
}

function _stayInsideContainer(ow, oh, cw, ch) {

    // compare aspect ratios
    if (cw/ch < ow/oh)
        return {
            width: cw,
            height: oh * cw / ow
        };

    return {
        width: ow * ch / oh,
        height: ch
    };
}
