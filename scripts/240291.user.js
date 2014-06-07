// ==UserScript==
// @name        bug tracker image viewer
// @namespace   ifree.common
// @description view image inside old version bug tracker
// @include     http://bugtracker/bugtracker/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    var a = document.createElement("script");
    a.src = "http://slideshow.triptracker.net/slide-bookmark.js";
    a.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(a);
    a.onload = function() {
        var b = new PhotoViewer();
        var c = Array.prototype.filter.call(document.links, 
        function(d) {
            if (/\.((jpg)|(png)|(gif)|(bmp))/i.test(d.innerText||d.textContent)) {
                b.add(d.href);
                return true
            }
            return false
        });
        document.onclick = function(f) {
            var d = c.indexOf(f.target);
            if (d > -1) {
                b.show(d);
                return false
            }
        };
        b.show(0)
    }
})();