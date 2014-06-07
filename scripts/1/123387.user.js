// ==UserScript==
// @name           can i has mikroblog expand, plz?
// @namespace      can i has mikroblog expand, plz?
// @include        http://www.wykop.pl/mikroblog*
// @version        1.02
// ==/UserScript==

if (typeof $ == 'undefined') {
		if (unsafeWindow.jQuery) {
			var $ = unsafeWindow.jQuery;
			main();
		} else {
			addJQuery(main);
		}
	} else {
		main();
	}
function main(){
	$(document).ready(function(){
		$('.show-more').click();
		$('.showAllComments').click();
	})
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}