// ==UserScript==
// @name           menu izquierda mas completo
// @namespace      BomBon Descafeinado
// @description    añade en el menu izquierdo ,enlaces al foro,ticket y a  war riders ,
// @include http://*.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*ajax*
// ==/UserScript==

var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;

var uni = document.getElementsByTagName('head')[0].innerHTML;
uni = uni.split('http://')[1].split('.ogame.fr')[0];

var lang = document.getElementsByTagName('head')[0].innerHTML;
lang = lang.split('.ogame.')[1].split('/game')[0];

var session = document.location.href.replace(/^.*&(session=[0-9a-f]*).*$/i,"$1");

var urlMess = 'index.php?page=mensajes&'+session;

var newMess = document.getElementById("mensajese-wrapper").getElementsByTagName('div')[0].innerHTML;
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
				  +'<a class="menubutton " href="http://board.ogame.'+lang+'/" accesskey="" target="_blank"><span class="textlabel">Foro</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="'+urlImgMess+'" height="29" width="38"></span>'
				  +'<a class="menubutton " href="'+urlMess+'" accesskey="" target="_self"><span class="textlabel">Mensaje'+nbNewMessTxt+'</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223033748927598.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://www.war-riders.de/'+lang+'/'+uni+'/details/player/'+pseudo+'" accesskey="" target="_blank"><span class="textlabel">War Riders</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa15.casimages.com/img/2010/04/15/100415011942925232.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://'+uni+'.ogame.'+lang+'/game/pranger.php" accesskey="" target="_blank"><span class="textlabel">Pilori</span></a></li>'
				  +'<li class="menubutton_table"><span class="menu_icon"><img src="http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://support.ogame.'+lang+'/index.php?page=support&m=1" accesskey="" target="_blank"><span class="textlabel">Ticket</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);