// ==UserScript==
// @name           Flash-free SFC
// @namespace      http://podmap.net/sfc
// @description    Makes SFC website Flash-free
// @include        http://www-new.sfc.keio.ac.jp/*
// ==/UserScript==

(function() {
    if (location.href == 'http://www-new.sfc.keio.ac.jp/') {
        location.href = 'http://www-new.sfc.keio.ac.jp/html/sitemap.html';
        return;
    }

    var left = document.getElementById("leftPhoto");
    if (left) {
        left.style.display = "none";
    }
    
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if (img.src.match(/^http:\/\/www-new.sfc.keio.ac.jp\/.*?(html\/images\/.*)$/)) img.src = "/" + RegExp.$1;
    }
    
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.href.match(/^event:(.*)/)) {
            var page = RegExp.$1;
            if ("gmenu_sfc" == page) page = "sitemap";
            link.href = "/html/" + page + ".html";
        }
    }
})();
