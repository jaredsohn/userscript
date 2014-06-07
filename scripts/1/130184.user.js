// ==UserScript==
// @name           OFM - Ostern 2012 - Nest-Suche
// @namespace      DarkNaz
// @description    Zeigt an, ob sich das Nest auf der derzeitigen Seite befindet und markiert dieses rot.
// @include        http://www.onlinefussballmanager.de/*php*
// @version        1.1.0-14
// @license        MIT
// @copyright      2012 DarkNaz
// @date           2012-04-05
// ==/UserScript==

/* Information im Buero */
if (location.pathname == "/010_buero/buero.php") {
	var reddiv = document.createElement("div"); // Hintergrund
	reddiv.setAttribute("style", "position:relative; left:-7px; margin:0px 0px -100px 0px; width:760px; height:50px; background-color:red; opacity:0.5; filter:alpha(opacity=50);");
	var info = document.createElement("div"); // Info-Text
	info.setAttribute("style", "position:relative; top:50px; left:-7px; padding:7px 0px 0px 0px; width:750px; height:33px; border:solid 5px red; color:white; text-align:center; font-size:150%;");
	info.innerHTML = "Die Osteraktion ist beendet. Das Skript ist jetzt nutzlos, bitte entfernen!";
	var fC = document.getElementById("buero").firstChild;
	document.getElementById("buero").insertBefore(reddiv, fC);
	document.getElementById("buero").insertBefore(info, fC);
}

/* Skript */
var easterEggEle;
var oldStyle = "";
var newStyle = "";

if (document.getElementById("easterEgg1") || document.getElementById("easterEgg2") || document.getElementById("easterEgg3") || document.getElementById("easterEgg4") || document.getElementById("easterEgg5")) {
	if (document.getElementById("easterEgg1")) easterEggEle = document.getElementById("easterEgg1");
	if (document.getElementById("easterEgg2")) easterEggEle = document.getElementById("easterEgg2");
	if (document.getElementById("easterEgg3")) easterEggEle = document.getElementById("easterEgg3");
	if (document.getElementById("easterEgg4")) easterEggEle = document.getElementById("easterEgg4");
	if (document.getElementById("easterEgg5")) easterEggEle = document.getElementById("easterEgg5");
	oldStyle = easterEggEle.getAttribute("style", false);
	var style = oldStyle.split(";");
	for (var data in style) {
		if (!style[data]) continue;
		var key = style[data].substring(0, style[data].indexOf(":"));
		var value = style[data].substring(style[data].indexOf(":") + 1);
		if (key != "top" && key != "left" && key != "bottom" && key != "right") continue;
		value = (value.replace(/px/, "") - 5) + "px";
		newStyle = newStyle + key + ":" + value + ";";
	}
	easterEggEle.setAttribute("style", newStyle+"border:5px solid red;", false);
	alert("Osternest gefunden und rot markiert!");
}