// ==UserScript==
// @name           Les Corsaires
// @description    Chatbox de l'alliance Les Corsaires - serveur ZETA
// @version        0.2
// @include        http://s6.ikariam.fr/*
// @include        http://lescorsaireszeta.e-monsite.com/*
// @author         Tic et Tac
// ==/UserScript==


var version="0.2";
var displayedflag = 0;

unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=61167" width="200" height="97%" frameborder="0" allowtransparency="true" ></iframe>';    
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
	+ '<div style="color:#000000; line-height: 15px; font-size: 10px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img232.imagevenue.com/loc27/th_97833_bg_stone_122_27lo.jpg);">'
	+ '<a style="color: #000000;" href="http://lescorsaireszeta.e-monsite.com/accueil.html" target="_blank">Le Forum des Corsaires</a> <br/> <a style="color: #000000;" onClick="window.open(this.href, this.target, \'width=670,height=635\')" target="_blank" href="http://ikariam.immortal-nights.com/ikafight/" >Simulateur de Bataille</a><br/><a style="color: #000000;" href="http://ikariam.malisis.net" target="_blank">Convertiseur de RC</a> <br/> <a style="color: #000000;"  target="_blank" href="http://ikariam.ogame-world.com/fr/suche.php?view=suche_stadt" >Chercher Ville joueur ile</a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;righ:4px;" onmouseover="displayshout()"><center>passez la souris pour afficher la chat-box</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://img232.imagevenue.com/loc27/th_97833_bg_stone_122_27lo.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://img232.imagevenue.com/loc27/th_97833_bg_stone_122_27lo.jpg); padding-top:33px; width:210px; position:absolute; left:-216px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://img249.imagevenue.com/loc551/th_99094_Chatbox_122_551lo.jpg); width:30px; height:100px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");