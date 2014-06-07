// ==UserScript==
// @name           Virtonomica: Tech List v2.0
// @namespace      virtonomica
// @version        1.0
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list/technology
// ==/UserScript==

var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	var el = $("a[href*='main/unit/view']").parent().each( function() {
		href = $("a", this).attr('href');
		href = href.replace("main/unit/view","window/technology_market/ask/by_unit");
		href = href + "/offer/set";
		$(this).append("<a href=" +href+ " onclick='return doWindow(this, 800, 500);'><img width=16 height=16 alt='Tech' src='/img/icon/invention.gif'/>");
	});
	
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);