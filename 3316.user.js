// ==UserScript==
// @name          Myspace custom style remover
// @namespace     http://www.calfinated.com
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @description   Hide annoying custom styles on myspace pages
// @exclude	  http://blog.myspace.com/*
// ==/UserScript==
//
// Author: Daniel Otis  http://www.calfinated.com  eekmale@hotmail.com
//  
//  Version: 1.3
//    1.3 - moved to new domain
//    1.2 - updated contact and namespace info
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
