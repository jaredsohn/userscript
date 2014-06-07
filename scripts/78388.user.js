// ==UserScript==
// @name           Liens utiles
// @namespace      hellraisers
// @description    Ajoute un lien vers le forum, ses messages et son profil War-Riders, 

possibilité d'ajouter d'autres liens ...
// @include        http://*.ogame.*
// ==/UserScript==

var pseudo = document.getElementById("playerName").getElementsByTagName('span')

[0].innerHTML;

var uni = document.getElementsByTagName('head')[0].innerHTML;
uni = uni.split('http://')[1].split('.ogame.fr')[0];

var lang = document.getElementsByTagName('head')[0].innerHTML;
lang = lang.split('.ogame.')[1].split('/game')[0];

var session = document.getElementById("menuTable").innerHTML;
session = session.split('&amp;')[1].split('"')[0];

var urlMess = 'index.php?page=messages&'+session;

var newMess = document.getElementById("message-wrapper").getElementsByTagName('div')

[0].innerHTML;
newMess = newMess.split('title="|')[1].split(' nouveau')[0];
var nbNewMess = parseInt(newMess);

var urlImgMess = 'http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
var nbNewMessTxt = ' : 0';

if (nbNewMess == 1) { 
	urlImgMess='http://img291.imageshack.us/img291/9195/10022305034778658.png';
	nbNewMessTxt = ' : '+nbNewMess;
}
else if (nbNewMess > 1) { 
	urlImgMess='http://img291.imageshack.us/img291/9195/10022305034778658.png';
	nbNewMessTxt = 's : '+nbNewMess;
}
else {
	urlImgMess='http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
	nbNewMessTxt = ' : '+nbNewMess;
}

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img 

src="'+urlImgMess+'" height="29" width="38"></span>'
				  +'<a class="menubutton " href="'+urlMess+'" 

accesskey="" target="_self"><span class="textlabel">Message'+nbNewMessTxt

+'</span></a></li>'				 
				  +'<li class="menubutton_table"><span 

class="menu_icon"><img 

src="http://nsa15.casimages.com/img/2010/04/15/100415011942925232.gif" height="29" 

width="38"></span>'
                  +'<a class="menubutton " href="'+'http://'+uni+'.ogame.'+lang

+'/game/pranger.php'+'" accesskey="" target="_blank"><span 

class="textlabel">Pilori</span></a></li>'
				 
document.getElementById('menuTable').appendChild(LinkDiv);