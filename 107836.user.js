// ==UserScript==
// @name           Quoted images are annoying we saw them the first time
// @namespace      http://www.com
// @description    Turns full-sized images into 50px thumbnails on edition38.
// @include        http://www.edition38.com/forums/*
// ==/UserScript==
(function () {
    function killbigimg() {
        this.append_stylesheet('.quote .bbc_img { width:50px; height:50px; }');
    };
    killbigimg.prototype.append_stylesheet = function (css) {
        var styletag = document.createElement("style");
        styletag.setAttribute('type', 'text/css');
        styletag.setAttribute('media', 'screen');
        styletag.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(styletag);
    };
    var killbigimg = new killbigimg();
})();