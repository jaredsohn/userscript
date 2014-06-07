// ==UserScript==
// @name           Menu-Chat-A Autarcique
// @description    Chatbox de l'alliance A Autarcique - serveur Eta
// @version        1.3
// @include        http://s7.ikariam.fr/*
// @include        http://a-autarcique.monalliance.net/index.htm*
// @author         squall3713
// ==/UserScript==


var version="0.2";

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-156px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:150px;position:absolute;top:0px;left:-0px;height:30px;">'
	+ '<a style="color: #f10707;" href="http://a-autarcique.monalliance.net/index.htm" target="_blank">A Autarcique</a> <br/> <a style="color: #f10707;" onClick="window.open(this.href, this.target, \'width=670,height=635\')" target="_blank" href="http://ikariam.immortal-nights.com/ikafight/" >Simulateur</a><br/><a style="color: #f10707;" href="http://ikariam.malisis.net" target="_blank">Convertiseur de RC</a> <br/> <a style="color: #f10707;"  target="_blank" href="http://ikariam.ogame-world.com/fr/suche.php?view=suche_stadt" >Chercher Ville</a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;righ:4px;""><iframe src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=61143" width="150" height="350" frameborder="0" allowtransparency="true"></iframe></div>'

	+ '<div style="width:150px;position:absolute;bottom:0px;left:0px;height:3px;background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { padding-top:33px; width:150px; position:absolute; left:0px; top:50px; border:none; z-index:50;");
GM_addStyle("#shouttab { background:url(http://i53.servimg.com/u/f53/12/83/85/84/final_10.gif); width:30px; height:30px; position:absolute; right:-42px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");


