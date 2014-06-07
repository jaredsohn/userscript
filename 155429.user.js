// ==UserScript==
// @name        auto wykop
// @namespace   file://C:/aml/wykop.js
// @include     http://www.wykop.pl/strona/*
// @version     1
// ==/UserScript==

if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		$(document).ready(maine_functione);
	} else {
		addJQuery(maine_functione);
	}
} else {
	$(document).ready(maine_functione);
}
function maine_functione()
{
	$('.diggit:not(.digout)').click();
	
	setTimeout(function(){
		$('a.button:contains("następna")')[0].click();
	}, 2000);
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};
