// ==UserScript==
// @name           QSS Link Fixer
// @version        2
// @namespace      http://ipb.quicksilverscreen.im/
// @description    fixes broken qss forum links
// @include        http://ipb.quicksilverscreen.*
// ==/UserScript==

if(location.href.match = ('ipb.quicksilverscreen')){
var a = document.location.href.match(/topic\/(.*)-(.*)-/i);
var b = 'http://ipb.quicksilverscreen.com/index.php?showtopic='+a[1];
if(document.getElementsByTagName("head")[0].innerHTML.match(/Board Message/i)){
window.location = b;
}
if(location.href.match = ('ipb.quicksilverscreen.im/index.php?//topic/')){
var c = location.href.replace("//topic/", "/topic/");
if(document.getElementsByTagName("head")[0].innerHTML.match(/Board Message/i)){
window.location = c;
}
}
}