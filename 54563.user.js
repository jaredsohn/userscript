// ==UserScript==
// @name           Pigskin Empire: Eval Link On Player Page
// @namespace      pbr/elopp
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.07.27
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
	a.href = window.location.toString().replace("player","evalplayer");
	a.innerHTML = "EVALUATION";
	li.appendChild(a);
	list.appendChild(li);
}
