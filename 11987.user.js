// ==UserScript==
// @name           Facebook defluffer
// @namespace      pickle.me.uk
// @description    Removes annoying fluff from news feed.
// @include        http://facebook.com/home.php*
// @include        http://*.facebook.com/home.php*
// ==/UserScript==

var links = document.links;
var toRemove = new Array();
for(var i = 0; i < links.length; i++) {
    if (links[i].href.indexOf('stories.php?filter=27') != -1) {
	var outer = links[i].parentNode.parentNode;
	toRemove.push(outer);
    }
}
for(var i = 0; i < toRemove.length; i++) {
    var outer = toRemove[i];
    outer.parentNode.removeChild(outer);
}
