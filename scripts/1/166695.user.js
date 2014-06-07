// ==UserScript==
// @name           Pigskin Empire: Add links to prospect.aspx
// @copyright      wozz
// @version        0.2
// @description    Add links to prospect.aspx
// @include        http://*pigskinempire.com/prospect.aspx*
// ==/UserScript==

window.setTimeout(function(){addEvalButton();},100);

function addEvalButton() {
	
	var bar = document.getElementById("ProspectNavBar");
	var nav = bar.getElementsByTagName("ul")[0];

	var li = document.createElement("li");
	var href = document.createElement("a");
	href.href = window.location.toString().replace("prospect.aspx?","evalplayer.aspx?");
        href.href =   href.href.replace(/V=.&/,"");
        href.href =   href.href.replace(/&m=./,"");
	href.innerHTML = "EVAL";
	li.appendChild(href);
	nav.insertBefore(li, bar.getElementsByTagName("li")[6])

	var li2 = document.createElement("li");
	var href2 = document.createElement("a");
	href2.href = window.location.toString().replace("prospect.aspx?","player.aspx?");
        href2.href =   href2.href.replace(/V=.&/,"");
        href2.href =   href2.href.replace(/&m=./,"");
	href2.innerHTML = "PLAYER";
	li2.appendChild(href2);
	nav.insertBefore(li2, bar.getElementsByTagName("li")[7])
}