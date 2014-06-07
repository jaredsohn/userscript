// ==UserScript==
// @name           Fullscreenable Youtubes
// @namespace      ameboide
// @description    Enables the fullscreen button in all embedded youtube videos
// @include        *
// ==/UserScript==

var elems = document.querySelectorAll('embed[src*="youtube.com/v/"]:not([allowfullscreen="true"])');
for(var i = 0; i < elems.length; i++) {
	elems[i].setAttribute('allowfullscreen', 'true');
	elems[i].src += '&amp;fs=1';
}