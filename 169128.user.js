// ==UserScript==
// @name        Spieler im Server
// @namespace   PaveLow45
// @include     *cp.rpg-city.de/*funktion=_players*
// @version     1
// ==/UserScript==

var content = document.getElementsByClassName("content")[0];
document.getElementsByTagName("a")[2].href.search(/ticket=(.*)/);
var ticket = RegExp.$1;

var div;
for(var i=2;i<content.getElementsByTagName("br").length;i+=2)
{
	div = document.createElement("div");
	div.innerHTML = "<form method='POST' action='index.php?funktion=_suchemultiacc&ticket="+ticket+"' target='_blank'><input type='hidden' name='ip' value='"+content.getElementsByTagName("div")[2+i*3].innerHTML+"'><input type='image' src='http://www.poqoo.de/style/imageset/icons/suche_icon.png'></form>";
	div.setAttribute("style", "width:75px;float:left; text-align:center;");
	content.insertBefore(div, content.getElementsByTagName("br")[i]);
}
div = document.createElement("div");
div.innerHTML = "<b>Multiaccount</b>";
div.setAttribute("style", "width:65px; float:left;");
content.insertBefore(div, content.getElementsByTagName("br")[0]);

for(var u=2;u<content.getElementsByTagName("br").length;u+=2)
{
	div = document.createElement("div");
	div.innerHTML = "<a href='index.php?funktion=_user_akte&user="+content.getElementsByTagName("div")[u*3.5-1].innerHTML+"&ticket="+ticket+"'><img src='http://cp.rpg-city.de/img/Akte.png'></a>";
	div.setAttribute("style", "margin-left:14px; width:65px;float:left; text-align:center;");
	content.insertBefore(div, content.getElementsByTagName("br")[u]); 
}
div = document.createElement("div");
div.innerHTML = "<b>Userakte</b>";
div.setAttribute("style", "margin-left:30px; width:100px; float:left;");
content.insertBefore(div, content.getElementsByTagName("br")[0]); 