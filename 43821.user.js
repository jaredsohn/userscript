// ==UserScript==
// @name           The Big Picture
// @namespace      http://thomas-rosenau.de/
// @description    Show the biggest picture of a HTML page only
// ==/UserScript==

var MINWIDTH = 500;
var MINHEIGHT = 500;
var MINSIZE = 400000; // width * height

var resizeImage = function(theImage, clickedX, clickedY) {
    var viewportWidth = document.body.clientWidth;
    var viewportHeight = document.body.clientHeight;
    var bs = window.getComputedStyle(document.body, null);
    var maxWidth = viewportWidth - parseInt(bs.marginLeft) - parseInt(bs.marginRight);
    var maxHeight = viewportHeight - parseInt(bs.marginTop) - parseInt(bs.marginBottom);
    if (theImage.naturalWidth <= maxWidth && theImage.naturalHeight <= maxHeight) {// no need to resize image
        theImage.style.setProperty('max-width', 'none', 'important');
        theImage.style.setProperty('max-height', 'none', 'important');
        theImage.style.setProperty('cursor', 'auto', 'important');
        document.title = window.imagefinderTitle;
        return;
    }
    if (typeof clickedY == 'number') { // image has been clicked
        if (/\bshrinkToFit\b/.test(theImage.className)) {
            var zoomFactor = parseFloat(window.getComputedStyle(theImage, null).width) / theImage.naturalWidth;
            var requestedX = (clickedX - parseInt(bs.marginLeft)) / zoomFactor;
            var requestedY = (clickedY - parseInt(bs.marginTop)) / zoomFactor;
            theImage.className = '';
            theImage.style.setProperty('cursor', '-moz-zoom-out', 'important');
            theImage.style.setProperty('max-width', 'none', 'important');
            theImage.style.setProperty('max-height', 'none', 'important');
            theImage.style.setProperty('margin-bottom', '8px', 'important');
            window.scrollTo(parseInt(requestedX - viewportWidth/2), parseInt(requestedY - viewportHeight/2));
            document.documentElement.style.setProperty('height', 'auto', 'important');
            document.title = window.imagefinderTitle;
        } else {
            theImage.className = 'shrinkToFit';
            theImage.style.setProperty('cursor', '-moz-zoom-in', 'important');
            theImage.style.setProperty('max-width', maxWidth + 'px', 'important');
            theImage.style.setProperty('max-height', maxHeight + 'px', 'important');
            document.documentElement.style.setProperty('height', '100%', 'important');
            document.title = window.imagefinderTitle + ' - ' + parseInt(100 * Math.min(maxWidth / theImage.naturalWidth, maxHeight / theImage.naturalHeight) + .5) + '%';
        }
        return;
    } else { // initial call or window has been resized
        if (/\bshrinkToFit\b/.test(theImage.className)) {
            theImage.style.setProperty('max-width', maxWidth + 'px', 'important');
            theImage.style.setProperty('max-height', maxHeight + 'px', 'important');
            theImage.style.setProperty('cursor', '-moz-zoom-in', 'important');
            document.documentElement.style.setProperty('height', '100%', 'important');
            document.title = window.imagefinderTitle + ' - ' + parseInt(100 * Math.min(maxWidth / theImage.naturalWidth, maxHeight / theImage.naturalHeight) + .5) + '%';
        } else {
            theImage.style.setProperty('cursor', '-moz-zoom-out', 'important');
            document.documentElement.style.setProperty('height', 'auto', 'important');
            document.title = window.imagefinderTitle;
        }
        return;
    }
}

var showImage = function(urlString) {
    var newImage = document.createElement('img');
    newImage.src = urlString;
    newImage.className = 'shrinkToFit';
    var newBody = document.createElement('body');
    newBody.appendChild(newImage);
    var defaultStyle = [['margin', '0'], ['padding', '0'], ['border', 'none'], ['display', 'block'], ['text-align', 'left'], ['vertical-align', 'baseline'], ['background', 'transparent none'], ['top', '0'], ['right', '0'], ['bottom', '0'], ['left', '0'], ['position', 'static'], ['visibility', 'visible'], ['float', 'none'], ['cursor', 'auto'], ['width', 'auto'], ['height', 'auto']];
    for (var i in defaultStyle) {
        var prop = defaultStyle[i][0];
        var val = defaultStyle[i][1];
        newImage.style.setProperty(prop, val, 'important');
        newBody.style.setProperty(prop, val, 'important');
    }
    newBody.style.setProperty('margin', '8px', 'important');
    document.documentElement.style.setProperty('overflow', 'visible', 'important');
    document.documentElement.style.setProperty('background', 'transparent none', 'important');
    document.documentElement.style.setProperty('width', '100%', 'important');
    document.documentElement.style.setProperty('height', '100%', 'important');
    var originalBody = document.body;
    var originalTitle = document.title;
    document.body.parentNode.replaceChild(newBody, document.body);
    window.imagefinderTitle = newImage.src.replace(/.*\//, '') + ' (' + newImage.naturalWidth + 'x' + newImage.naturalHeight +  ')';
    document.title = window.imagefinderTitle;
    resizeImage(newImage);
    document.documentElement.addEventListener('click', function() {
        if (originalBody.parentNode) return;
        document.body.parentNode.replaceChild(originalBody, document.body);
        document.title = originalTitle;
    }, false);
    window.addEventListener('resize', function() {
        resizeImage(newImage);
    }, true);
    newImage.addEventListener('click', function(e) {
        e.stopPropagation();
        resizeImage(this, e.clientX, e.clientY);
    }, false);
}

var main = function() {
    var im = document.images;
    var foundImage = null;
    label0: for (var i = 0; i < im.length; i++) {
        var w = im[i].naturalWidth || im[i].width;
        var h = im[i].naturalHeight || im[i].height;
        if ((w > MINWIDTH || h > MINHEIGHT) && w*h > MINSIZE && window.getComputedStyle(im[i], null).display != 'none') {
            if (foundImage) {
                foundImage = null;
                break label0;
            }
            foundImage = im[i];
        }
    }

    if (foundImage) {
        showImage(foundImage.src);
    }
}

var im = document.images;
var sizesKnown = true;
for (var i = 0; i < im.length; i++) {
    if (window.getComputedStyle(im[i], null).display != 'none' && !(im[i].hasAttribute('width') && im[i].hasAttribute('height'))) {
        sizesKnown = false;
        break;
    }
}
if (sizesKnown) {
    main();
} else {
    window.addEventListener('load', main, false);
}
