// ==UserScript==
// @name           reddit new tab
// @namespace      com.reddit.newTab
// @description    opens reddit links in new tab
// @include        *www.reddit.com*
// ==/UserScript==
(function(){
var i;
for (i=0; i<document.links.length; i++) {
		document.links[i].target="_blank";
}
})()