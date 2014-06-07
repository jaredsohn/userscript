// ==UserScript==
// @name           NicoNico Framerate Fix
// @namespace      http://shak.homelinux.net
// @description    sets Flash attribute: 'wmode'='opaque' and add alternative comment input area for multibyte garble.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==


(function(){
	var b = document.getElementById('PAGETOP');
	document.getElementById('flvplayer').setAttribute('wmode', 'opaque');
	b.innerHTML = b.innerHTML
	
	var c = document.createElement('input');
	c.setAttribute('size','40');
	c.setAttribute('id', 'altComm');
	c.setAttribute('onKeyUp', "document.getElementById('flvplayer').ext_setInputMessage(document.getElementById('altComm').value, '')");
	var f = document.getElementById("WATCHFOOTER");
	f.insertBefore(c, f.firstChild); //Comment out this line　if you don't need alternative comment input area.
})();