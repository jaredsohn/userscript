// ==UserScript==
// @name          Myspace custom style remover
// @namespace     http://www.moosoft.com/greasemonkey
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @description   Hide annoying custom styles on myspace pages
// @exclude	  http://blog.myspace.com/*
// ==/UserScript==
//
// Author: Daniel Otis  http://www.moosoft.com
//  
//  Version: 1.0
//    1.1 - total rewrite
//    1.0 - first version

(function () {
    //remove user styles
    var badstyles = document.getElementsByTagName("style");
    var i = badstyles.length - 1;
    while (i >= 0) {
          badstyles[i] = badstyles[i].parentNode.removeChild(badstyles[i]);
          i--;
    }
}) ();