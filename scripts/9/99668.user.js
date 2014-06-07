// ==UserScript==
// @name           Pigskin Empire: Prospect.asp Link On Player Page
// @namespace      crbengal
// @copyright      2011, crbengal
// @version        1.0
// @include        http://beta.pigskinempire.com/player.asp?id=*
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
	a.href = window.location.toString().replace("player.asp?","prospect.asp?m=P&");
	a.innerHTML = "Prospect Page";
	li.appendChild(a);
	list.appendChild(li);
}