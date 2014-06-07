// ==UserScript==
// @name           Travian building time in title
// @include        http://*.travian.*/dorf1.php*
// @name 		Travian building time in title
// @author		Firewolf
// @namespace 	Tbtit
// @version 	0.015
// @description	Shows time left to get building
// @source 		-
// ==/UserScript==


function updBuildings() {

var contract = document.getElementById("building_contract");
var m = contract.getElementsByTagName("span");
var tds = contract.getElementsByTagName("td");

var val = m[0].innerHTML;
if (val !== -1) {

var allthing = val + " till finishing " + tds[1].innerHTML + " - Travian";

var fullSeconds = val.split(":");
fullSeconds = fullSeconds[0] * 3600 + fullSeconds[1] * 60 + fullSeconds[2]*1;

allthing += " - " + fullSeconds;

document.title = allthing;

setTimeout(updBuildings, 1000);

}

}

window.onLoad = updBuildings();
