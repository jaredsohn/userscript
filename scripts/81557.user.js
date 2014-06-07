// ==UserScript==
// @name           Pigskin Empire: Eval Link On Pro Player Page
// @description    This script will give a new link next to game log on a pro player's page that links to the evaluation page for that player. Only works with pro players.
// @namespace      crbengal
// @copyright      2010, crbengal
// @version        1.0
// @include	   http://beta.pigskinempire.com/proplayer.asp?id=*
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
	a.href = window.location.toString().replace("proplayer.asp?","evalplayer.asp?level=pro&");
	a.innerHTML = "EVALUATION";
	li.appendChild(a);
	list.appendChild(li);
}
