// ==UserScript==
// @name           http:// to https://
// @namespace      Byrne Hollander
// @description    Changes http:// to https:// so nothing gets blocked at school
// @include        http://*facebook.com*
// @include        http://www.facebook.
// @include        *digg*
// ==/UserScript==

(function(){
var url = window.location.href;

if(url.indexOf('http://')==0) {
window.location.replace(location.href.replace(url.substring(0,7), 'https://'));
}

if(url.indexOf('https://www.amazon.com')==0) {
for(var i=0; (link=document.links[i]); i++) {
if(link.href.indexOf('http://')==0) link.href = link.href.replace(link.href.substring(0,7), 'https://');
}
}
})();