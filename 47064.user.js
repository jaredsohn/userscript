// ==UserScript==
// @name           MovShare.net Download Link
// @namespace      Aaron Russell
// @include        http://www.movshare.net/video/*
// ==/UserScript==

if(document.getElementById('watch')){
document.getElementById('watch').submit();
}

var dlink = document.createElement('a');
dlink.setAttribute('href', document.getElementById('embedmvshre').src);
var sometext = document.createTextNode('Download Video');
var h4 = document.getElementsByTagName('h4')[0];
h4.innerHTML='';
h4.appendChild(dlink);
h4.firstChild.appendChild(sometext);