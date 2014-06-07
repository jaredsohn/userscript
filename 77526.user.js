// ==UserScript==
// @name           menu izquierdo completo
// @namespace      hellraisers
// @description    enlace a mesanjes y foro desde el menu de la izquierda posibilidad de añadir mas...
// @include        http://*.ogame.*
// @exclude        http://uni*
// ==/UserScript==

var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;

var uni = document.getElementsByTagName('title')[0].innerHTML;

var lang = document.getElementById("box").innerHTML;
lang = lang.split('http://uni')[1].split('ogame.')[1].split('/game')[0];

var session = document.getElementById("menuTable").innerHTML;
session = session.split('&amp;')[1].split('"')[0];

var urlMess = 'index.php?page=messages&'+session;

var newMess = document.getElementById("message-wrapper").getElementsByTagName('div')[0].innerHTML;
newMess = newMess.split('title="|')[1].split(' nouveau')[0];
var nbNewMess = parseInt(newMess);

var urlImgMess = 'http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
var nbNewMessTxt = ' : 0';

if (nbNewMess == 1) { 
	urlImgMess='http://nsa12.casimages.com/img/2010/02/23/10022305034778658.gif';
	nbNewMessTxt = ' : '+nbNewMess;
}
else if (nbNewMess > 1) { 
	urlImgMess='http://nsa12.casimages.com/img/2010/02/23/10022305034778658.gif';
	nbNewMessTxt = 's : '+nbNewMess;
}
else {
	urlImgMess='http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
	nbNewMessTxt = ' : '+nbNewMess;
}

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa12.casimages.com/img/2010/02/24/100224020931996218.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://warninng-uni-hydra.forosactivos.com/forum.htm" accesskey="" target="_blank"><span class="textlabel">Foro wA_</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="'+urlImgMess+'" height="29" width="38"></span>'
				  +'<a class="menubutton " href="'+urlMess+'" accesskey="" target="_self"><span class="textlabel">Mensaje'+nbNewMessTxt+'</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223033748927598.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://ogame.gamestats.org/es/Hydra/search" accesskey="" target="_blank"><span class="textlabel">Gamestats</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa15.casimages.com/img/2010/04/15/100415011942925232.gif" height="29" width="38"></span>'
                  +'<a class="menubutton " href="'+'http://'+uni+'.ogame.'+lang+'/game/pranger.php'+'" accesskey="" target="_blank"><span class="textlabel">Baneados</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif" height="29" width="38"></span>'
                  +'<a class="menubutton " href="http://warnningunihydra.webcindario.com/index.php" accesskey="" target="_blank"><span class="textlabel">Galaxytool</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);