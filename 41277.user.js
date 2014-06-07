// ==UserScript==
// @name           4chan original content banners
// @namespace      underwater.dbmnd.org
// @description    Replace 4chan's banner with custom rotating ones from http://underwater.dbmnd.org/4chanbanners/
// @include        http://cgi.4chan.org/*
// @include        http://img.4chan.org/*
// @include        http://orz.4chan.org/*
// @include        http://zip.4chan.org/*
// ==/UserScript==

(function () {
    if (Math.random() > 0.05) {
        var logoDiv = document.getElementsByClassName('logo');
        // There's only one logo div, and the banner img is the second child of it.
        logoDiv[0].childNodes[1].src = 'http://underwater.dbmd.org/4chanbanners/banner.php';
    }
})();