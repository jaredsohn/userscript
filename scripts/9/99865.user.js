// ==UserScript==
// @name           Scout Any Team's Seniors
// @namespace      crbengal
// @copyright      2011, crbengal
// @version        1.0
// @include        http://beta.pigskinempire.com/team.asp*
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var list = document.getElementsByTagName("ul")[3];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("team.asp?ID=","practice.asp?type=S&tm=");
	a.innerHTML = "SCOUT TEAM";
	li.appendChild(a);
	list.appendChild(li);
}