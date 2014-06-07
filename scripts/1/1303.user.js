// ==UserScript==
// @name          Javascript In New Tab
// @namespace     http://www.arantius.com/misc/greasemonkey/
// @description	  When you middle-click a javascript: link, it will still work.
// @include       *
// ==/UserScript==

(function() {
var url=null, js=null;
//load originating page if we trapped a click before
if (url=GM_getValue('jsint-url', false)) {
	GM_setValue('jsint-url', false);
	document.location.assign(url);
	//document.location.href=url;
	return;
}
//run originating JS if we trapped a click before
if (js=GM_getValue('jsint-js', false)) {
	GM_setValue('jsint-js', false);
	window.addEventListener('load', function(){eval(js)}, true);
}

//function to notice when the mouse comes up
function trapMouseUp(ev) {
	//we only want to continue if the middle button was clicked
	if (1!=ev.button) return;

	var el=ev.target;
	GM_setValue('jsint-url', document.location.href);
	GM_setValue('jsint-js', el.href);
}

//attach trap to all javascript links
var els = document.evaluate('//a[starts-with(@href, "javascript:")]', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var el,i=0;
while (el=els.snapshotItem(i++)) {
	el.addEventListener('mouseup', trapMouseUp, false);
}
})();