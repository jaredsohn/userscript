// ==UserScript==
// @name           Pigskin Empire: Total School Alumni
// @copyright      2011, GiantsFan23 (adapted from Tyante)
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        8.17.11
// @description    Displays total amount of alumni. 
// @include        http://*pigskinempire.com/alumni.aspx
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var table = document.getElementById("ctl00_CPH1_tblAlumni");
	var location = document.getElementsByTagName("h3")[0];
	var string = location.innerHTML;
	string += "<br>Total Alumni: " + (table.rows.length - 1);
	location.innerHTML = string;
}
