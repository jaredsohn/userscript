// ==UserScript==
// @name           Google search results links rewrite disabler
// @namespace      mitar.tnode.com
// @description    Disables Google search results links rewrite used for link click tracking.
// @include        http://www.google.tld/
// @include        http://www.google.tld/search*
// @include        http://www.google.tld/webhp*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function disableRewrite(context) {
	$("a[onmousedown^='return rwt(this']", context).each(function () {
		// We have to remove attribute in this way as elements are wrapped in XPCNativeWrapper and removeAttr does not work
		this.removeAttribute("onmousedown");
	});	
}

$(document).bind("DOMNodeInserted", function () {
	disableRewrite(this);
});

disableRewrite(document);
