// ==UserScript==
// @name          Wikimao
// @version		  1.1
// @namespace     https://twitter.com/#!/RedNaylor
// @description	  Replaces false prophets with True Prophets.
// @include       http://*.wikipedia.org/*
// ==/UserScript==

(function f() {
                var e = document.getElementById("centralNotice");
                if(e != null)
                {
                                e = e.getElementsByTagName("div");
                                if(e.length > 0) e = e[0]; else e = null;
                }
                if(e == null)
                {
                                setTimeout(f, 30);
                } else {
                                e.style.background = "url('http://i.imgur.com/ZBahW.png') left center no-repeat"
                }
})();