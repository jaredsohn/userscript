// ==UserScript==
// @name           Chatbox des Gow(w)
// @description    Chatbox privé pour l'alliance God of War - Serveur THETA
// @version        0.2
// @include        http://s8.**.ikariam.*/*
// @author         iborik
// ==/UserScript==


var version="0.2";
var displayedflag = 0;

unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=86188" width="200" height="97%" frameborder="0" allowtransparency="true" ></iframe>';
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
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://s1.e-monsite.com/2009/06/03/07/89357276fond-brun-et-blanc-jpg.jpg);">'
	+ '<a style="color: #f10707;" href="http://ika-gow.forum-pro.fr" target="_blank">Forum des [Gow]</a> <br/> <a style="color: #f10707;" onClick="window.open(this.href, this.target, \'width=670,height=635\')" target="_blank" href="http://ikariam.immortal-nights.com/ikafight/" >Simulateur</a><br/><a style="color: #f10707;" href="http://ikariam.malisis.net" target="_blank">Convertiseur de RC</a> <br/> <a style="color: #f10707;"  target="_blank" href="http://fr.ika-world.com/search.php?view=suche_stadt" >Chercher une Ville</a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;righ:4px;" onmouseover="displayshout()"><center>passez la souris pour afficher la chat-box</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://s1.e-monsite.com/2009/06/03/07/89357276fond-brun-et-blanc-jpg.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://s1.e-monsite.com/2009/06/03/07/89357276fond-brun-et-blanc-jpg.jpg); padding-top:33px; width:210px; position:absolute; left:-216px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://i49.servimg.com/u/f49/11/49/77/42/chatbo10.gif); width:41px; height:100px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");