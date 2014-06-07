// ==UserScript==
// @name           Toolbox -Illuminati-
// @description    Chatbox de l'Alliance -Illuminati- serveur Beta
// @version        0.1a
// @include        http://s2.ikariam.fr/*
// @include        http://mr.pepe.free.fr/ikariam/*
// @author         sOa
// ==/UserScript==


var version="0.1a";
var displayedflag = 0;

unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=61732" width="200" height="97%" frameborder="0" allowtransparency="true" ></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-216px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" ondblclick="showshout()" onclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#825623; line-height: 15px; font-size: 10px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://nearfromaway.free.fr/img/chat/back.jpg);">'
	+ '<a style="color: #825623;" href="http://mr.pepe.free.fr/ikariam/" target="_blank">Forum Illuminati</a> <br/> <a style="color: #825623;" onClick="window.open(this.href, this.target, \'width=670,height=635\')" target="_blank" href="http://ikariam.immortal-nights.com/ikafight/index.php" >Simulateur</a><br/><a style="color: #825623;" href="http://ikariam.malisis.net" target="_blank">Convertisseur de RC</a> <br/> <a style="color: #f10707;"  target="_blank" href="http://ikariam.ogame-world.com/fr/suche.php?view=suche_stadt" >Chercher Ville</a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;righ:4px;" onmouseover="displayshout()"><center>passez la souris pour afficher la chat-box</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://nearfromaway.free.fr/img/chat/back.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://nearfromaway.free.fr/img/chat/back.jpg); padding-top:33px; width:210px; position:absolute; left:-216px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://nearfromaway.free.fr/img/chat/bouton.gif); width:98px; height:98px; position:absolute; right:-50px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");