// ==UserScript==
// @name           Enlarge Twitter Profile Image
// @namespace      http://twitter.com/cxx
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.0.3.20100602
// ==/UserScript==

(function() {
    var img = document.querySelector('#profile-image, .profile-img');
    if (img) {
        img.src = img.src.replace(/_bigger(\.\w+)$/, '$1');
        var style = img.style;
        style.width = style.height = 'auto';
        style.minWidth = style.minHeight = '73px';
    }
})();
