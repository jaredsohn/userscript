// ==UserScript==
// @name Neuer Nachrichten  warner  Pennergame 4.0 hamburg berlin 4.0
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Sobald ein neue nachricht  geschrieben wird wirst du mit den text gewarnt egal wo du dich gerade in pennergame aufhalten tust 
// @include http://*pennergame.de*
// @include http://*berlin.pennergame.de*
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
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('div#new_container2 {position:absolute; top:94px; left:22px; margin-left:1px; width:730px;}')
addGlobalStyle('.inhalt_newcontainer2 {padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://www.fotos-hochladen.net/neuerhaderehkl9umo.jpg) ; font-weight:bold; color:black; font-size:15px; text-align:center; } ')





	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+link+'/messages/',
		onload: function(gangresponseDetails) {
			var gangcontent = gangresponseDetails.responseText;
				smsfeld = gangcontent.split('<h1>Posteingang</h1>')[1].split('/messages/delete_all/')[0];


for(x=1;x<=21;x++){
try{
scheckfeld = smsfeld.split('class="msglist')[x].split('</tr>')[0];
if(scheckfeld.match(/unread.gif/)){
id = scheckfeld.split('/messages/read/')[1].split('/')[0];


	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+link+'/messages/read/'+id+'/',
		onload: function(gangresponseDetails) {
			var gangcontent = gangresponseDetails.responseText;
			smsfel0 = gangcontent.split('Nachricht lesen')[1].split('/messages/delete/')[0];
			smsfel1 = smsfel0.split('href="/profil/')[1].split('/a>')[0];
			id1 = smsfel1.split('id:')[1].split('/')[0];
			name = smsfel1.split('/">')[1].split('<')[0];
			nachricht = smsfel0.split('<p>')[1].split('</p>')[0];
			betreff = smsfel0.split('<strong>')[1].split('</strong>')[0];


var tbody = document.createElement('div');
document.body.appendChild(tbody);
//var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML = ''
//+'<div style="top: 130px;" id="notifyme" class="zabsolute zleft">'
//+'<div class="icon ok zleft" id="nicon">&nbsp;</div>'
//+'<div class="zleft right" id="ntext">'



+'<div id=\"new_container2\"><div class=\"inhalt_newcontainer2\">'
+'<h2>Nachricht von '
+'<a href="'+link+'/profil/id:'+id1+'/"><span style=\"color:orange;"><b>'+name+'</b></span></a></h2>'
+'<a href="'+link+'/messages/read/'+id+'/"><span style=\"color:orange;"><b>Betreff :</b></span><span style=\"color:black;"><b> '+betreff+'</b></span><br>'
+'<span style=\"color:orange;"><b>Nachricht :</b></span><span style=\"color:black;"><b>'+nachricht+'</b></span></a>'
//+'</div></div>';
}});
}
}catch(e){
break;
}
}










}});
// copyright by basti1012
