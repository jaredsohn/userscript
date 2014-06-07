// ==UserScript==
// @name           Amradar Link on Prospect Page
// @description    Puts an evaluation link on a propect's call or visit page in an easy to access place. Will link to the evaluation page
// @author         crbengal
// @include        http://beta.pigskinempire.com/prospect.asp*
// @version        1.0
// ==/UserScript==


window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var list = document.getElementsByTagName("ul")[1];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("prospect","amradar_player_data");
	a.innerHTML = "NUMBAHS";
	li.appendChild(a);
	list.appendChild(li);
}