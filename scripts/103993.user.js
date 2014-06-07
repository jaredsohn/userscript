// ==UserScript==
// @name           Pigskin Empire: Free Agent Eval Link
// @namespace      FAL
// @include        http://pigskinempire.com/offersheet.aspx?id=*
// @version        6.1.11
// ==/UserScript==



window.setTimeout( function() {
	main();
}, 100);


function main()
{
	
	var ul = document.getElementById("subNavContainer");
	var list = ul.getElementsByTagName("li")[1];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("offersheet.aspx?","evalplayer.aspx?level=Pro&");
	a.innerHTML = "PLAYER EVALUATION"
	li.appendChild(a);
	list.appendChild(li);
	
}
