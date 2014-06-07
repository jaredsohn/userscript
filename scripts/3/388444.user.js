// ==UserScript==
// @name    	NoMobile@Wiki
// @namespace 	NoMobile@Wiki
// @description 携帯じゃないよ^o^
// @include 	http://*.atwiki.jp/*/m/*
// @version     1
// ==/UserScript==

(function (d, func) {

    var location = window.location;
    if (location.pathname.match("/*/m/pages/")) {
        var uri = location.href.replace(/m\//, '');
        location.href = uri;
    }

})();