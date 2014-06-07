// ==UserScript==
// @name           The HotFixShare Direct Download
// @namespace      #aVg
// @description    Directly download from site.
// @include        http://thehotfixshare.net/*
// @version        0.1
// ==/UserScript==
for(var i=document.links.length - 1; i >= 0; --i) {
	var elem = document.links[i];
	if(elem.href.match(/showfile=(\d+)/))
		elem.href = "http://thehotfixshare.net/board/index.php?autocom=downloads&req=download&code=do_download&id=" + RegExp.$1;
}