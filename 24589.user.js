// ==UserScript==
// @name        PIXNET Album Expander
// @version     20120305.0
// @namespace   http://blog.gslin.org/plugins/pixnet-album-expander
// @description Expand PIXNET album
// @homepage    http://github.com/gslin/albumexpander
// @include     http://*.pixnet.net/album/set/*
// ==/UserScript==

(function(){
    if (!document.location.href.match('/album/set/')) {
        return;
    }

    var htmlCode = '';

    var contentBody = document.getElementById('left-column-1');
    var imageThumbs = contentBody.getElementsByClassName('thumb');
    var imageThumbsLength = imageThumbs.length;

    for (var i = 0; i < imageThumbsLength; i++) {
        try {
            var el = imageThumbs[i];
            var imgLink = el.parentNode.href;
            var imgNewUrl = el.src.replace(/_[qst]\./, '.');

            htmlCode += '<a href="' + imgLink + '"><img style="max-width:100%" alt="" src="' + imgNewUrl + '"></a><br>';
        } catch(err) {
        }
    }

    contentBody.innerHTML = htmlCode;
})();
