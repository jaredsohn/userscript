// ==UserScript==
// @name menu izquierdo ampliado
// @namespace hellraisers
// @description enlace a foro, GT, Bluetool, simulador y pg.Alianza desde el menu de la izquierda, posibilidad de añadir mas...
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
+'<a class="menubutton " href="http://eugeni.es/ogame/index.html" accesskey="" target="_blank"><span class="textlabel">PuNiSher</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="'+urlImgMess+'" height="29" width="38"></span>'
+'<a class="menubutton " href="http://punisher.pf-control.de/galaxytool_nekkar/secret/bluetool/index.php" accesskey="" target="_blank"><span class="textlabel">Bluetool</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223033748927598.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://punisher.foroactivo.com"" target="_blank"><span class="textlabel">ForoChat</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa15.casimages.com/img/2010/04/15/100415011942925232.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://websim.speedsim.net/index.php?lang=sp" accesskey="" target="_blank"><span class="textlabel">Simulador</span></a></li>'
+'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif" height="29" width="38"></span>'
+'<a class="menubutton " href="http://punisher.pf-control.de/galaxytool_nekkar" target="_blank"><span class="textlabel">Galaxytool</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);


