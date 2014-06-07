// ==UserScript==
// @name	[PG]Shoutbox Warner 5.1 edit by kingfr3sh all Citys
// @Author	kingfr3sh
// @namespace	http://userscripts.org/scripts/show/87979
// @description	Sobald ein neuer Beitrag in der shoutbox geschrieben wird, wird es dir oben links angezeigt,überall 
// @version	5.1 für Sylt angepasst

// @include	http://*pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// @include http://*mendigogame.es*
// @include http://*clodogame.fr*
// @include http://*serserionline.com*
// ==/UserScript==

// seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen für muenchen
if (url.indexOf("http://muenchen")>=0) {
var link = "http://muenchen.pennergame.de"
}
// Linkadressen koeln
if (url.indexOf("http://koeln")>=0) {
var link = "http://koeln.pennergame.de"
}
// Linkadressen reloaded
if (url.indexOf("http://reloaded")>=0) {
var link = "http://reloaded.pennergame.de"
}
// Linkadressen sylt
if (url.indexOf("http://sylt")>=0) {
var link = "http://sylt.pennergame.de"
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadressen menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}



	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+link+'/gang/shoutbox_ajax/?page=1',
		onload: function(gangresponseDetails) {
			var gangcontent = gangresponseDetails.responseText;

scheckfeld = gangcontent.split('schrieb am ')[1].split(' </span>')[0];
id = gangcontent.split('<a')[1].split('/a>')[0];

idname = id.split('id:')[1].split('/')[0];
idid = id.split('>')[1].split('<')[0];

betreff = gangcontent.split('<p>')[1].split('</p>')[0];





if(scheckfeld == GM_getValue("scheckfeld")){
}else{
var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML += ''
+'<div style="top: 130px;" id="notifyme" class="zabsolute zleft">'
+'<div class="icon ok zleft" id="nicon">&nbsp;</div>'
+'<div class="zleft right" id="ntext">'
+'<h2>'+betreff+'</h2>'
+'<a href="'+link+'/profil/id:'+idname+'/"><font style=\"color:red; font-size:100%;\">'+idid+'</font></a>'
+'</div></div>';
GM_setValue("scheckfeld",scheckfeld);
}












}});