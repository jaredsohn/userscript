// ==UserScript==
// @name           World Domination Auto refresh
// @namespace      http://userscripts.org/users/23652
// @description    World Domination Auto refresh
// @include        http://api.msappspace.com/apprendering/116013/*
// ==/UserScript==

var seconds = 10;

window.setInterval(function() {
var delcache=unsafeWindow.Site.deleteCache,
	reload=unsafeWindow.Site.reload;
var ref=document.evaluate("//a[contains(.,'Refresh') and contains(@href, 'Site.deleteCache') and contains(@href, 'Site.reload')]", document, null, 8, null).singleNodeValue;
if(ref && delcache && reload) {
delcache();
reload();
}
}, seconds*1000);