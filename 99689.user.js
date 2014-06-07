// ==UserScript==
// @name           Pigskin Empire: Prospect Page Link in Evalplayer.asp
// @namespace      crbengal
// @copyright      2011, crbengal
// @version        1.0.1
// @include        http://beta.pigskinempire.com/evalplayer.asp*
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var li = document.getElementsByTagName("td")[0];
	var a = document.createElement("a");
	a.href = window.location.toString().replace("evalplayer.asp?","prospect.asp?m=P&");
	a.innerHTML = " Prospect Page";
	li.appendChild(a);
}