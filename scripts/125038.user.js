// ==UserScript==
// @name           burryall
// @namespace      burryall
// @include        http://www.wykop.pl/wykopalisko/*
// @include        *.wykop.pl/wykopalisko/*
// @version         1.00
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

$('div[class="clr pding5_0 brbottdf medium lheight20 filters"]').append('<button id="burryall" style="margin-left: 10px; background: #fff; border: 1px solid #D21E1E; font-weight: bold; color: #D21E1E; padding: 10px;">Zakop wszystkie</button>');
$('button#burryall').click(function(){$('li[class="{reason:5}"]').click());
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}