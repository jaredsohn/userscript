// ==UserScript==
// @author			dave
// @email			userscripts@yahoo.com
// @description		test only
// @name			testing
// @namespace		http://userscripts.org/
// @include			*.travian*.*/allianz.php
// @version			0.0.1
// ==/UserScript==

var action = testvillage();
function testvillage(){
	document.getElementById('member').getElementsByTagName('tbody').item(0).innerHTML += "<tr><td>tester</td></tr>";
}