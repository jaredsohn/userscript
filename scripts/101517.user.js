// ==UserScript==
// @name           AtTask Description Links
// @namespace      none.com
// @description    AtTask Description Links
// @include        http://*.attask-ondemand.com/attask/opTaskView.cmd?ID=*
// @include        https://*.attask-ondemand.com/attask/opTaskView.cmd?ID=*
// ==/UserScript==

NodeList.prototype.toArray = function() {
	var ary = [];
	for (var i = 0, len = this.length; i < len; i++) {
		ary.push(this[i]);
	}
	return ary;
};

window.addEventListener("load", function() {
	var query = "#condition-container div.subtitle-description";
	var elements = document.querySelectorAll.call(document, query).toArray();
	elements.forEach(function(el, i) {
		el.innerHTML = el.innerHTML.replace(/(https?:\/\/[^\s|<|&]+)/g, "<a href=\"$1\" target=\"_blank\">$1</a>");
	});
});
