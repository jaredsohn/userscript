// ==UserScript==
// @name           Coaching Bar Numbers For Pigskin Empire
// @namespace      pbr/cbn
// @include        http://*.pigskinempire.com/coach.asp?id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.07.06
// ==/UserScript==

window.setTimeout( function() {
	cbn();
}, 100);

function cbn() {
	var page = document.getElementById("page");
	var td = page.getElementsByTagName("td");
	for (var i=0; i<td.length; i++) {
		if (td[i].bgColor != "") {
			td[i].style.color = "#ffffff";
			td[i].innerHTML = td[i].width;
		}
	}
}
