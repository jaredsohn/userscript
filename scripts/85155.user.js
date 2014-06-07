// ==UserScript==
// @name           Pigskin Empire: Alumni Total
// @namespace      Tyante
// @version        09.01.10
// @description    Displays the total number of alumni for a school.
// @include        http://beta.pigskinempire.com/alumni.asp?id=*
// @copyright      2010, Tyante
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var table = document.getElementsByTagName("TABLE")[0];
	var location = document.getElementsByTagName("h3")[0];
	var string = location.innerHTML;
	string += "<br>Total Alumni: " + (table.rows.length - 1);
	location.innerHTML = string;
}
