// ==UserScript==
// @name          Honcast.com SD
// @description   Sets the default video resolution to SD for slower internet connections. Note: It affects ALL blip.tv streams.
// @include        http://a.blip.tv/scripts/*
// ==/UserScript==

var embed_url;

embed_url = window.location.href.replace('shoggplayer.html','flash/stratos.swf');
embed_url = embed_url.replace('Blip+HD+720','Blip+SD');
document.body.innerHTML = '<div style="height:100%; overflow:hidden"><embed src="' + embed_url + '" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true" wmode="transparent"></embed></div>';