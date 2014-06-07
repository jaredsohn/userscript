// ==UserScript==
// @name Bandenforum warner  Pennergame 4.0 hamburg berlin 4.0
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Sobald ein neuer beitrag in Banden forum geschrieben wird wirst du mit den text gewarnt egal wo du dich gerade in pennergame aufhalten tust 
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


GM_xmlhttpRequest({
method: 'GET', 
url: ''+link+'/gang/forum/',
onload: function(gangresponseDetails) {
var gangcontent = gangresponseDetails.responseText;
forumfeld = gangcontent.split('Bandenforum')[1].split('Neues Thema</span>')[0];
for(a=1; a<=10; a++){
try{
feld = forumfeld.split('<table')[a].split(' </table>')[0];
Forumthema = feld.split('decoration:none;">')[1].split('</a>')[0];
wann = feld.split('Letzter Beitrag ')[1].split(' von')[0];
wer1 = feld.split('<a')[2].split('</a>')[0];
linkf = feld.split("/viewthread/")[1].split('/')[0];
werid = wer1.split('id:')[1].split('/')[0];
wername = wer1.split('>')[1].split('<')[0];
updateschekcen(Forumthema,wann,wer1,werid,wername,a,linkf)
}catch(e){}
}
}});


function updateschekcen(Forumthema,wann,wer1,werid,wername,a,linkf){

if(GM_getValue("wann"+a)==wann){
}else{

var tbody = document.getElementsByClassName('icon error zleft')[0];
tbody.innerHTML += '<a href="'+link+'/gang/forum/viewthread/'+linkf+'/"'
+'<font style=\"color:black; font-size:100%;\"><div style="top: 130px;" id="notifyme" class="zabsolute zleft">'
+'<div class="icon ok zleft" id="nicon">&nbsp;</div>'
+'<div class="zleft right" id="ntext">'
+'<h2>'+Forumthema+'</h2>'
+'<b>'+wann+'</b>'
+'<br><a href="'+link+'/profil/id:'+werid+'/"><font style=\"color:red; font-size:100%;\">'+wername+'</font></a></font></a>'
+'</div></div>';
GM_setValue("wann"+a,wann);
}

}





