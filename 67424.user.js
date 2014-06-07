// ==UserScript==
// @name           rslog remove music posts
// @namespace      blurg!
// @description    rslog remove music posts
// @include        http://www.rlslog.net/*
// ==/UserScript==

[].slice.call(document.querySelectorAll('#content a[href="http://www.rlslog.net/category/music/"]'), 0).forEach(function(element, index, array){
var ep=element.parentNode.parentNode;
ep.parentNode.removeChild(ep);
});
