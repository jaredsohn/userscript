// ==UserScript==
// @name           mobile9 autostart download
// @author         Fedmich
// @description    Bypasses the waiting timer to automatically start the download.
// @namespace      http://www.fedmich.com/tools/
// @include        http://gallery.mobile9.com/f/*/?view=download
// ==/UserScript==

var url_red = unsafeWindow['red'];
if(url_red){
	window.location = url_red;
}