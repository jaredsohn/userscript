// ==UserScript==
// @name           Pigskin Empire: 40 Time and Prospect Page
// @copyright      2011, GiantsFan23
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.29.11
// @description    Easy navigation to prospect page and 40 times. 
// @include        http://*pigskinempire.com/player.aspx*
// ==/UserScript==

window.setTimeout(function(){addProspectButton();},100);

function addProspectButton() {
	
	var bar = document.getElementById("ctl00_PlayerSubNav");
	var nav = bar.getElementsByTagName("ul")[0];
	var li = document.createElement("li");
	var href = document.createElement("a");
	href.href = window.location.toString().replace("player.aspx?","prospect.aspx?m=P&");
	href.innerHTML = "PROSPECT";
	li.appendChild(href);
	nav.insertBefore(li, bar.getElementsByTagName("li")[3])
}