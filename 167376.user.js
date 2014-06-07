// ==UserScript==
// @name           Pigskin empire: Add links game scout page
// @copyright      wozz
// @version        0.2
// @description    Add links to game pages to watch & view box score. 
// @include        http://*pigskinempire.com/scout.aspx*
// ==/UserScript==

window.setTimeout(function(){addProspectButton();},100);

function addProspectButton() {
	
	var bar = document.getElementById("ScoutNavBar");
	var nav = bar.getElementsByTagName("ul")[0];
	var li = document.createElement("li");
	var href = document.createElement("a");
	href.href = window.location.toString().replace("scout.aspx?","game.aspx?");
        href.href = href.href.replace("&s=","&gslot=");
	href.innerHTML = "WATCH";
	li.appendChild(href);
	nav.insertBefore(li, bar.getElementsByTagName("li")[4])

	var li2 = document.createElement("li");
	var href2 = document.createElement("a");
	href2.href = window.location.toString().replace("scout.aspx?","boxscore.aspx?");
        href2.href = href2.href.replace("gnum=","w=");
	href2.innerHTML = "BOX";
	li2.appendChild(href2);
	nav.insertBefore(li2, bar.getElementsByTagName("li")[5])
}