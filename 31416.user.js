// ==UserScript==
// @name           google label direct
// @namespace      http://userscripts.org/users/33073/scripts
// @include        http://*.google.*/*
// ==/UserScript==

GM_addStyle("label { cursor: pointer; }");
var labels = document.evaluate("//label[@for='cty' or @for='lgr']", document, null, 6, null), i, input;
for (i=0; i<labels.snapshotLength; i++) {
	labels.snapshotItem(i).addEventListener("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		var input = document.getElementById(this.getAttribute("for"));
		input.checked = !input.checked;
		if (input.checked) {
			document.getElementById("tsf").submit();
		}
	}, false);
}