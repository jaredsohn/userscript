// ==UserScript==
// @name           Menu .ICE.
// @namespace      BBJ
// @description   Ice menu pour ogame redesign, électra (.ICE.) uniquement
// @version        1.1b
// @author         BBJ
// @include        http://electra.ogame.fr/*
// ==/UserScript==


var sp1 = document.createElement("span");
	sp1.setAttribute("id", "MAJ gal");
var sp1_content = document.createTextNode('');
	sp1.appendChild(sp1_content);							
	var sp2 = document.getElementsByClassName('menubutton_table')[10] ;
	var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);		

function afficheLeftMenu ( nom , lien, urlImgMess) 
{

	var aff_newVersion ='<li class="menubutton_table"><span class="menu_icon"></span><a class="menubutton " href="'+lien+'" target="_blank" accesskey="" >';
		aff_newVersion += '<span class="textlabel">'+nom+'</span></a>'
		aff_newVersion += '<span class="menu_icon"><img height="29" width="38" src='+urlImgMess+'></span>';
				
	var tableau = document.createElement("span");
		tableau.innerHTML = aff_newVersion;
		
		document.getElementById('MAJ gal').insertBefore(tableau, document.getElementById('MAJ gal').firstChild);
}	



afficheLeftMenu ( 'AYB (Pour Night!)', 'http://www.youtube.com/watch?v=iEpJaWxcMbM', '') ;
afficheLeftMenu ( 'Ogame-Winner', 'http://www.ogame-winner.com/accueil.html', 'http://nsa13.casimages.com/img/2010/02/24/100224114825730518.gif') ;	
afficheLeftMenu ( 'War-Riders', 'http://www.war-riders.de/fr/Electra/', 'http://nsa12.casimages.com/img/2010/02/24/100224114303343451.gif') ;		
afficheLeftMenu ( 'Drago Sim²', 'http://drago-sim.com/index.php?lang=french', 'http://nsa13.casimages.com/img/2010/02/24/100224113524810401.gif') ;
afficheLeftMenu ( 'Cartographie .ICE.', 'http://icelectra.galaxy-spy.net/', 'http://nsa12.casimages.com/img/2010/02/24/100224114530829195.gif') ;
afficheLeftMenu ( 'Forum .ICE.',  'http://ice-electra.forumactif.net/forum.htm', 'http://nsa12.casimages.com/img/2010/02/24/100224115034143125.gif') ;
afficheLeftMenu ( '<font color="#6495ed"><font size="1px">Menu .ICE. by BBJ</font></font>', 'http://userscripts.org/scripts/source/68658.user.js', 'http://nsa13.casimages.com/img/2010/02/24/100224115621948941.gif') ;



var session = document.getElementById("menuTable").getElementsByClassName('menubutton_table')[0].innerHTML;
session = session.split('href=')[1].split('"')[1].split(';')[1];

var urlMess = 'index.php?page=messages&'+session;

var newMess = document.getElementById("message-wrapper").getElementsByTagName('div')[0].innerHTML;
newMess = newMess.split('title="|')[1].split(' nouveau')[0];
var nbNewMess = parseInt(newMess);

var urlImgDef = 'http://nsa13.casimages.com/img/2010/02/23/100223055504518387.gif';
var urlImgMess = 'http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
var nbNewMessTxt = ' : 0';

if (nbNewMess >= 1) { 
	urlImgMess='http://nsa12.casimages.com/img/2010/02/23/10022305034778658.gif';
	nbNewMessTxt = 's : '+nbNewMess;
}
if (nbNewMess == 1) { 
	nbNewMessTxt = ' : '+nbNewMess;
}
else {
	urlImgMess='http://nsa13.casimages.com/img/2010/02/23/100223035325244136.gif';
	nbNewMessTxt = ' : '+nbNewMess;
}

// creation du bouton Message
var newElement = document.createElement("div");
newElement.innerHTML = '<li class="menubutton_table"><span class="menu_icon"><img height="29" width="38" src='
+urlImgMess //url de l'image
+'></span><a target='
+'_self' //s'ouvre dans la meme fenetre
+' accesskey="" href='
+urlMess //url des messages
+' class="menubutton "><span class="textlabel">'
+'Message(s)'+nbNewMessTxt //nom du bouton message
+'</span></a></li>';
document.getElementById('menuTable').insertBefore(newElement, document.getElementById(''));