// ==UserScript==
// @name           Old Photos
// @namespace      Yash
// @include        http://www.facebook.com/*
// ==/UserScript==

setInterval(function(){
    for(a in document.links) if((l = document.links[a]).href.match(/photo\.php/)) l.setAttribute("onclick", "javascript: window.location = '" + l.href + "'");
}, 0);