// ==UserScript==
// @name          CrunchyRoll video zoom
// @namespace     http://agarren.myopenid.com
// @description   increase the crunchyroll showmedia embed object
// @include       http://www.crunchyroll.com/showmedia?id=*
// ==/UserScript==
["width","height"].forEach( function(it) {
  $('embed_vid').style[it] = parseInt($('embed_vid').style[it], 10) * 1.5 + 'px';
} );