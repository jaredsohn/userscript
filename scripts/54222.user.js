// ==UserScript==
// @name Bandenkampfwarner version 3.2  Zeigt 3 fights mit gegnerischen penner und direktverlinkungenby basti1012
// @namespace basti1012   http://pennerhack.foren-city.de
// @description Zeigt im game einen hinweis an wenn bandenkampf gestartet ist und informationen dazu
// @include http://*pennergame.de/*
// @include http://*berlin.pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// ==/UserScript==

var VonOben = 34; //px
var VonRechts =345; //px

var VonOben2 = 34; //px
var VonRechts2 =565; //px

var VonOben3 = 34; //px
var VonRechts3 =785; //px


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var sig = 'http://mediaberlin.pennergame.de/';
}else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};



try{
GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/',
onload:function(responseDetails) {
content = responseDetails.responseText;
binfob = content.split('<a href="/gang/fight/view/')[1];
binfo1b = binfob.split('/">Details</a>')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/view/'+binfo1b+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;


azeit1 = content.split('<td bgcolor="#313131">&nbsp;')[1];// anfangs zeit kampf
azeit11 = azeit1.split('Uhr</td>')[0];
ezeit1 = content.split('<td bgcolor="#313131">&nbsp;')[2];// endzeit kampf
ezeit11 = ezeit1.split('Uhr</td>')[0];
gegner1 = content.split('style="vertical-align:middle;">')[1];// eigener bandenname
gegner11 = gegner1.split('</span></div></td>')[0];
gegnera1 = content.split('style="vertical-align:middle;">')[2];// gegner sein name
gegnera11 = gegnera1.split('</span></div></td>')[0];
erge1 = content.split('align="center"><span style="vertical-align:middle; font-size:16px">')[1];// eigene punkte von kampf
erge11 = erge1.split('</span></div></td>')[0];
ergea1 = content.split('align="center"><span style="vertical-align:middle;  font-size:16px">')[1];// generische punkte von kampf
ergea11 = ergea1.split('</span></div></td>')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/highscore/gang/search/?name='+gegnera11+'',
onload:function(responseDetails) {
content = responseDetails.responseText;
linka1 = content.split('profil/bande:')[1];
linkb1 = linka1.split('/"')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/profil/bande:'+linkb1+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;
gega1 = content.split('  Mitglieder </td>\n</tr>')[1];
gegb11 = gega1.split('<hr size="1">')[0];

var newspan2 = document.createElement("div");
newspan2.setAttribute('id', 'basth_info2');
newspan2.setAttribute('href', '/fight/overview/#form1');
newspan2.setAttribute('name', 'basth__info2');
newspan2.setAttribute('style', 'position:absolute;top:'+VonOben+'px;right:'+VonRechts+'px;');
var navigation = document.getElementById("navigation");
navigation.appendChild(newspan2)
document.getElementById("basth_info2").innerHTML = '<a class="tooltip"><font color="red"><img src="http://www.fotos-hochladen.net/achtungbandenkampff2mr4qk60.jpg"</font><span><small><br>'

+'<font style=\"color:green; font-size:120%;\"><b>Das derzeitige Kampfergebnis liegt bei diesen Punkten</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegner11+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+erge11+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Punkte von:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegnera11+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+ergea11+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfbeginn ist</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+azeit11+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfende ist:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+ezeit11+' </b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>'
+''+gegb11+'<br> by basti1012 </a>'
+'</small></span>';

}});
}});
}});
}});
}catch(e){}





try{
GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/',
onload:function(responseDetails) {
content = responseDetails.responseText;
binfob2 = content.split('<a href="/gang/fight/view/')[2];
binfo2b = binfob2.split('/">Details</a>')[0];

GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/view/'+binfo2b+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;
azeit2 = content.split('<td bgcolor="#313131">&nbsp;')[1];// anfangs zeit kampf
azeit22 = azeit2.split('Uhr</td>')[0];
ezeit2 = content.split('<td bgcolor="#313131">&nbsp;')[2];// endzeit kampf
ezeit22 = ezeit2.split('Uhr</td>')[0];
gegner2 = content.split('style="vertical-align:middle;">')[1];// eigener bandenname
gegner22 = gegner2.split('</span></div></td>')[0];
gegnera2 = content.split('style="vertical-align:middle;">')[2];// gegner sein name
gegnera22 = gegnera2.split('</span></div></td>')[0];
erge2 = content.split('align="center"><span style="vertical-align:middle; font-size:16px">')[1];// eigene punkte von kampf
erge22 = erge2.split('</span></div></td>')[0];
ergea2 = content.split('align="center"><span style="vertical-align:middle;  font-size:16px">')[1];// generische punkte von kampf
ergea22 = ergea2.split('</span></div></td>')[0];

GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/highscore/gang/search/?name='+gegnera22+'',
onload:function(responseDetails) {
content = responseDetails.responseText;
linka2 = content.split('profil/bande:')[1];
linkb2 = linka2.split('/"')[0];

GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/profil/bande:'+linkb2+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;
gega2 = content.split('  Mitglieder </td>\n</tr>')[1];
gegb22 = gega2.split('<hr size="1">')[0];

var linki22 = '<a href="/profil/bande:'+linkb2+'/"><font style=\"color:yellow; font-size:120%;\"><b>Profil Bande</b></font><br>';

var newspan22 = document.createElement("div");
newspan22.setAttribute('id', 'basth_info22');
newspan22.setAttribute('href', '/fight/overview/#form1');
newspan22.setAttribute('name', 'basth__info22');
newspan22.setAttribute('style', 'position:absolute;top:'+VonOben2+'px;right:'+VonRechts2+'px;');
var navigation = document.getElementById("navigation");
navigation.appendChild(newspan22)
document.getElementById("basth_info22").innerHTML = '<a class="tooltip"><font color="red"><img src="http://www.fotos-hochladen.net/achtungbandenkampff2mr4qk60.jpg"</font><span><small><br>'

+'<font style=\"color:green; font-size:120%;\"><b>Das derzeitige Kampfergebnis liegt bei diesen Punkten</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegner22+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+erge22+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Punkte von:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegnera22+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+ergea22+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfbeginn ist</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+azeit22+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfende ist:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+ezeit22+' </b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>'
+''+gegb22+'<br> by basti1012</a> '
+'</small></span>';

}});
}});
}});
}});
}catch(e){}







try{
GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/',
onload:function(responseDetails) {
content = responseDetails.responseText;
binfob3 = content.split('<a href="/gang/fight/view/')[3];
binfo3b = binfob3.split('/">Details</a>')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/view/'+binfo3b+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;
azeit3 = content.split('<td bgcolor="#313131">&nbsp;')[1];// anfangs zeit kampf
azeit33 = azeit3.split('Uhr</td>')[0];
ezeit3 = content.split('<td bgcolor="#313131">&nbsp;')[2];// endzeit kampf
ezeit33 = ezeit3.split('Uhr</td>')[0];
gegner3 = content.split('style="vertical-align:middle;">')[1];// eigener bandenname
gegner33 = gegner3.split('</span></div></td>')[0];
gegnera3 = content.split('style="vertical-align:middle;">')[2];// gegner sein name
gegnera33 = gegnera3.split('</span></div></td>')[0];
erge3 = content.split('align="center"><span style="vertical-align:middle; font-size:16px">')[1];// eigene punkte von kampf
erge33 = erge3.split('</span></div></td>')[0];
ergea3 = content.split('align="center"><span style="vertical-align:middle;  font-size:16px">')[1];// generische punkte von kampf
ergea33 = ergea3.split('</span></div></td>')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/highscore/gang/search/?name='+gegnera33+'',
onload:function(responseDetails) {
content = responseDetails.responseText;
linka3 = content.split('profil/bande:')[1];
linkb3 = linka3.split('/"')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/profil/bande:'+linkb3+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;
gega3 = content.split('  Mitglieder </td>\n</tr>')[1];
gegb33 = gega3.split('<hr size="1">')[0];


var newspan33 = document.createElement("div");
newspan33.setAttribute('id', 'basth_info33');
newspan33.setAttribute('href', '/fight/overview/#form1');
newspan33.setAttribute('name', 'basth__info33');
newspan33.setAttribute('style', 'position:absolute;top:'+VonOben3+'px;right:'+VonRechts3+'px;');
var navigation = document.getElementById("navigation");
navigation.appendChild(newspan33)
document.getElementById("basth_info33").innerHTML = '<a class="tooltip"><font color="red"><img src="http://www.fotos-hochladen.net/achtungbandenkampff2mr4qk60.jpg"</font><span><small><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Das derzeitige Kampfergebnis liegt bei diesen Punkten</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegner33+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+erge33+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Punkte von:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegnera33+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+ergea33+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfbeginn ist</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+azeit33+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfende ist:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+ezeit33+' </b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>'
+''+gegb33+'<br> by basti1012 </a>'
+'</small></span>';

}});
}});
}});
}});
}catch(e){}





























/*


GM_xmlhttpRequest({
   method:"GET",

   url: 'http://pennergame.de/city/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;


  kampfida = content.split('style="border-bottom: 1px solid #272727;vertical-align:middle;">&nbsp;<a href="/profil/bande:')[1];// endzeit kampf
   kampfid = kampfida.split('/"><strong>')[0];






GM_xmlhttpRequest({
   method:"GET",

   url: 'http://www.pennergame.de/profil/bande:'+kampfid+'/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;


  ezeit = content.split('Mitglieder')[1];// endzeit kampf
   ezeit1 = ezeit.split('<div class="menubarright">')[0];
   		
   


*/


