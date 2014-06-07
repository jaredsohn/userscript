// ==UserScript==
// @name           Viriator el Grande
// @description    te digo diego por no llamarte rodrigo.XD 
// @version        0.2
// @include        http://uni12.ogame.com.es/*
// @include        http://uni12.ogame.com.es/*
// @exclude       http://uni12.ogame.com.es/game/index.php?page=phalanx&session=*
// @exclude       http://uni12.ogame.com.es/game/index.php?page=bericht&session=*
// @author         Storken
// ==/UserScript==


216px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" ondblclick="showshout()" onclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style=blank" href="http://fenixcent.iespana.es/" >GalaxyTool</a><br/><a style="color: #f10707;" href="http://userscripts.org/tags/ogame" target="_blank">Scripts Ogame</a> <br/> <a style="color: #f10707;"  target="_blank" href="http://www.gogofrog.com/uni12fenix/" >Museo Fenix</a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;righ:4px;" onmouseover="displayshout()"><center>passez la souris pour afficher la chat-box</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://i49.servimg.com/u/f49/11/49/77/42/fond311.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://i49.servimg.com/u/f49/11/49/77/42/fond311.jpg); padding-top:33px; width:210px; position:absolute; left:-216px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://i49.servimg.com/u/f49/11/49/77/42/chatbo10.gif); width:41px; height:100px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");