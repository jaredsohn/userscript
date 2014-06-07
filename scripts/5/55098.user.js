// ==UserScript==
// @name           Direct Images
// @namespace      by Yash
// @include        http://images.google.*/*
// @include        http://www.google.com/images*
// ==/UserScript==

function directImages() {
    setInterval(function () {
        for (i = 0; i < (x = document.links).length; i++) {
            if (x[i].href.indexOf("imgurl") > -1) {
                x[i].href = x[i].href.match(/imgurl=([^&]*)/)[1];
                x[i].target = "_blank"
            }
        }
    }, 0);
}

directImages();