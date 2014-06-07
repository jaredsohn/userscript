// ==UserScript==
// @name M.I.P.A.
// @namespace hellraisers
// @description 
// @include http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;
var uni = document.getElementsByTagName('title')[0].innerHTML;
var lang = document.getElementById("box").innerHTML;
lang = lang.split('http://uni')[1].split('ogame.')[1].split('/game')[0];
var session = document.getElementById("menuTable").innerHTML;
session = session.split('&amp;')[1].split('"')[0];
var urlImgMess = 'http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
var nbNewMessTxt = ' : 0';
var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa12.casimages.com/img/2010/02/24/100224020931996218.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://alkones58.x10.bz/gt" accesskey="" target="_blank"><span class="textlabel">GT Alkones 1</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="'+urlImgMess+'" height="29" width="38"></span>'
+'<a class="menubutton " href="http://donmanolo.16mb.com/uni58gt" accesskey="" target="_blank"><span class="textlabel">GT Alkones 2</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa15.casimages.com/img/2010/04/15/100415011942925232.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://alkonesuni58.foroactivo.mx" accesskey="" target="_blank"><span class="textlabel">Foro Alkones</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://www.mecahost.com/OGame/espionajeOGame.php" target="_blank"><span class="textlabel">Compact. Esp.</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://www.infuza.com/es/ogame.com.es/Universe58" target="_blank"><span class="textlabel">Infuza</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://websim.speedsim.net/index.php?lang=sp" target="_blank"><span class="textlabel">Speedsim</span></a></li>'
;
document.getElementById('menuTable').appendChild(LinkDiv);





