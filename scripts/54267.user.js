// ==UserScript==
// @name           Aufgaben erinnerung Pennergame 4.0 by basti1012
// @namespace      by basti121o http://pennerhack.foren-city.de
// @include        *pennergame.de*
// @include        *clodogame.fr*
// @include        *berlin.pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// @include        *mendigogame.es*
// @include        *serserionline.com*
// ==/UserScript==



var url = document.location.href;
if (url.indexOf("http://www.berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}

if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}
if (url.indexOf("muenchen.pennergame")>=0) {
var link = "http://www.muenchen.pennergame.de"
var siglink = 'http://img.muenchen.pennergame.de';
}
if (url.indexOf("http://www.bumrise")>=0) {
var link = "http://www.bumrise.com"
var siglink = 'http://img.bumrise.com';
}

GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/overview/',
      onload: function(responseDetails) {
		var content = responseDetails.responseText;
try{
	var ges = content.split('Du hast die heutige')[1];
	var aufgabe = ges.split('nicht erledigt')[0];


GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/daily/',
      onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var gesa = content.split('min-height:40px;">')[1];
		var was = gesa.split('</p>')[0];


GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/daily/rewards/',
      onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var gesaa = content.split('Deine Sammelkarten:')[1];
		var karte = gesaa.split('&nbsp;')[0];

 document.getElementById('provocation_area').innerHTML += '<form name="prov_form"><div id="provocation_note"><a class="close" href="#" onclick="CloseProvocation();"><img src="http://static.pennergame.de/img/pv4/premiummedia/img/premium/provocation/provocation_note_close.png" border="0"></a><div id="provocation_text" class="provocation_text"><div class="prov_links"></div></div></div></form>';
 document.getElementById('provocation_text').innerHTML ='<img src="http://static.pennergame.de/img/pv4/daily_jobs/korken.png"><font style=\"color:yellow; font-size:120%;\"><b>Neue Aufgabe</b></font><br><a href="/daily/">'+ was +'</a><br><font style=\"color:green; font-size:120%;\"><b>Sammelkarten '+karte+'</b></font>';

}});
}});
}catch(e){}
}});










