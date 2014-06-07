// ==UserScript==
// @name           Pigskin Empire: Easy Offer Sheet (Pro)
// @namespace      RyanDiamond
// @description    Adds an easy access to player resignments / offers.
// @include        http://beta.pigskinempire.com/proplayer.asp?id=*
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var bar = document.getElementsByTagName("ul")[3];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("proplayer","offersheet");
	a.innerHTML = "OFFER SHEET";
	li.appendChild(a);
	bar.appendChild(li);
}
