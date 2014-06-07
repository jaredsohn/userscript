// ==UserScript==
// @name           Something Awful Image-Domain On Hover
// @namespace      http://www.mathemaniac.org
// @include        http://forum.somethingawful.com/showthread.php?*
// @include        http://forums.somethingawful.com/showthread.php?*
// @include        http://archives.somethingawful.com/showthread.php?*
// @description    Displays the domain of images on hover.
// @version        1.1.0
// ==/UserScript==

// Change for v1.1.0, December 9th, 2012: Handle attachments.
// Change for v1.0.1, August 6th, 2011: Handle timgs.

var imgs = document.getElementsByTagName('img');
for (var i = 0; i < imgs.length; i++) {
    var curImg = imgs[i];
    if (curImg.classList.contains('img') || curImg.classList.contains('timg')) {
        var domain = curImg.getAttribute('src').match(/https?:\/\/([^\/]+)\//);
        if (domain) {
            curImg.setAttribute('title', domain[1]);
        } else {
            console.log("SA Image-Domain On Hover: Couldn't determine location of '" + curImg.getAttribute('src') + "'.");
        }
    } else if (curImg.parentNode.classList.contains('attachment')) {
        curImg.setAttribute('title', '[attachment]');
    }
}