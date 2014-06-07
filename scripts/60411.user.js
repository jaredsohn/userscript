// ==UserScript==
// @name           Premium uebersicht mit den letzten kampfen hamburg berlin 4.0
// Version         Premium kronkorken fightuebersicht basti1012 pennerhack.foren-cy.de
// @namespace      by basti1012 (visit http://pennerhack.forren-city.de)
// @description    baut auf der uebersichtsseite das original premium uebersicht bild nach 
// @include        http://*pennergame.de*overview/*
// @include        http://*dossergame.co.uk*overview/*
// @include        http://*menelgame.pl*overview/*
// @include        http://*clodogame.fr*overview/*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var pgurl = 'http://dossergame.co.uk/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var pgurl = 'http://clodogame.fr/';
};


var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemAa = document.getElementsByClassName('tieritemA')[0];
var div_tieritemA = div_tieritemAa.getElementsByClassName('settings')[0];
div_tieritemA.innerHTML +='<li><a href="'+pgurl+'/overview/">K&auml;mpfe in der &Uuml;bersicht anzeigen</a></li>';



if(window.location.href == "http://pennergame.de//overview/" || window.location.href == "http://www.pennergame.de//overview/" || window.location.href == "www.pennergame.de//overview/" || window.location.href == "http://berlin.pennergame.de//overview/"  || window.location.href == "http://www.berlin.pennergame.de//overview/" || window.location.href == "www.berlin.pennergame.de//overview/")
{


GM_xmlhttpRequest({
method: 'GET',
        url: ''+pgurl+'/fight/list/',
        onload: function(responseDetails) 
	{
	var content = responseDetails.responseText;
try{
		var text1 = content.split('<table class="tieritemA">')[1];
		var text2 = text1.split('<div align="center"><a')[0];
		var text3 = content.split('<div align="center">')[1];
		var text4 = text3.split('</div></td>')[0];
}catch(e){


var text2 = ' Es sind zur Zeit keine K&auml;mpfe in der Liste vorhanden<br> Besuche doch mal meine Seie nach neue Pennergame Scripte 4.0  <br><br><a href="http://pennerhack.foren-city.de">Link zu Basti</a><br><br>';
}
				var div_settingpoint = document.getElementsByClassName('settingpoint');
				var div_tieritemA = document.getElementsByClassName('tieritemA');

				newdiv1 = document.createElement('div');
				newdiv1.setAttribute('class', 'tieritemA');
				newdiv1.style.width = "545px";
				newdiv1.innerHTML = '<div class="clearcontext" style="width: 645px;"><font style=\"color:white; font-size:120%;\">'


+'<div class="tieritemA">'+text2+'<a href="'+pgurl+'fight/list/clear/"><strong>Liste leeren</strong></a><br><div align="right"><a href="'+pgurl+'overview/">Ausblenden</a></div></div>';

if(document.location.href.indexOf('pennergame.de//')>=0) {
div_settingpoint[0].insertBefore(newdiv1, div_tieritemA[div_tieritemA.length-8]); 
}else{
div_settingpoint[0].insertBefore(newdiv1, div_tieritemA[div_tieritemA.length-7]); 
}


if(document.location.href.indexOf('berlin.pennergame.de//')>=0) {
div_settingpoint[0].insertBefore(newdiv1, div_tieritemA[div_tieritemA.length-7]); 
}











			}});
}
//Copyright by basti1012
