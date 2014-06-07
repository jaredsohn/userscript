// ==UserScript==
// @name           éMbed
// @namespace      userscripts.org
// @description    Replaces the standard youtube flash player with the "embed" flash player.
// @version        1.0
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/w*
// ==/UserScript==

var href = window.location.href;
var vidin = href.indexOf('=');
var vid = href.substring(vidin+1, vidin+12);

document.getElementById('playerDiv').innerHTML = '<embed src="http://www.youtube.com/v/'+vid+'&autoplay=1" type="application/x-shockwave-flash" wmode="transparent" width="480" height="395"></embed>';