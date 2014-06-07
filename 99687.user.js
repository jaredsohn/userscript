// ==UserScript==
// @name           Pigskin Empire: Combine Link in Practice Field
// @namespace      crbengal
// @copyright      2011, crbengal
// @version        1.0.1
// @include        http://beta.pigskinempire.com/practice.asp
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
	a.href = window.location.toString().replace("practice.asp","practice.asp?type=C");
	a.innerHTML = "COMBINE";
	li.appendChild(a);
	list.appendChild(li);
}