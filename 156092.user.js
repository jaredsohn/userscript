// ==UserScript==
// @id             imgur.com-f496f72b-d177-4d34-899f-2d3b5e94f260@imgur
// @name           imgur gallery jump
// @version        1.0
// @namespace      imgur
// @author         David
// @description    Skips the first 10 images in a gallery with more images if you've already seen the first 10 (clicked the "Viewing the first 10 images of a large album. View all ##."-link)
// @include        http://imgur.com/*
// @run-at         document-end
// ==/UserScript==
var truncatedLinks = document.querySelectorAll('#album-truncated a');
if (truncatedLinks.length == 2) {
    truncatedLinks[1].href += '#jump';
}
if (window.location.hash == '#jump') {
    var imageAnchors = document.querySelectorAll('#image-container a[name]');
    if (imageAnchors.length > 10) {
        window.location.hash = '#' + imageAnchors[10].name;
    }
}