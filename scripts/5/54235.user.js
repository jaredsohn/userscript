// ==UserScript==
// @name Bandenkampfwarner version 4.5 Zeigt Bis zu 4 bandenkampfe in einen an
// @namespace basti1012   http://pennerhack.foren-city.de
// @description Zeigt im game einen hinweis an wenn bandenkampf gestartet ist und informationen dazu
// @include http://*pennergame.de/*
// @include http://*berlin.pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// ==/UserScript==

var VonOben1 = 34; //px
var VonRechts1 =345; //px



var inhalt = document.getElementById('betterplace');
inhalt.innerHTML = '';


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var sig = 'http://mediaberlin.pennergame.de/';
}else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};

//                    ---------------          kampf 1 --------------------------------

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

var kampf1 = ''
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
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>';
GM_setValue("kampf1" , kampf1);
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



var kampf2 = ''
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
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>';



GM_setValue("kampf2" , kampf2);
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


var kampf3 = ''
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
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>';




GM_setValue("kampf3" , kampf3);
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
binfob4 = content.split('<a href="/gang/fight/view/')[4];
binfo4b = binfob4.split('/">Details</a>')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/gang/fight/view/'+binfo4b+'/',
onload:function(responseDetails) {
content = responseDetails.responseText;
azeit4 = content.split('<td bgcolor="#313131">&nbsp;')[1];// anfangs zeit kampf
azeit44 = azeit4.split('Uhr</td>')[0];
ezeit4 = content.split('<td bgcolor="#313131">&nbsp;')[2];// endzeit kampf
ezeit44 = ezeit4.split('Uhr</td>')[0];
gegner4 = content.split('style="vertical-align:middle;">')[1];// eigener bandenname
gegner44 = gegner4.split('</span></div></td>')[0];
gegnera4 = content.split('style="vertical-align:middle;">')[2];// gegner sein name
gegnera44 = gegnera4.split('</span></div></td>')[0];
erge4 = content.split('align="center"><span style="vertical-align:middle; font-size:16px">')[1];// eigene punkte von kampf
erge44 = erge4.split('</span></div></td>')[0];
ergea4 = content.split('align="center"><span style="vertical-align:middle;  font-size:16px">')[1];// generische punkte von kampf
ergea44 = ergea4.split('</span></div></td>')[0];


GM_xmlhttpRequest({
method:"GET",
url: ''+pgurl+'/highscore/gang/search/?name='+gegnera44+'',
onload:function(responseDetails) {
content = responseDetails.responseText;
linka4 = content.split('profil/bande:')[1];
linkb4 = linka4.split('/"')[0];


var kampf4 = ''
+'<font style=\"color:green; font-size:120%;\"><b>Das derzeitige Kampfergebnis liegt bei diesen Punkten</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegner44+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+erge44+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Punkte von:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+gegnera44+' </b></font>'
+'<font style=\"color:yellow; font-size:120%;\"><b> = </b></font>'
+'<font style=\"color:red; font-size:120%;\"><b> '+ergea44+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfbeginn ist</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+azeit44+'</b></font><br>'
+'<font style=\"color:green; font-size:120%;\"><b>Kampfende ist:</b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>'+ezeit44+' </b></font><br>'
+'<font style=\"color:red; font-size:120%;\"><b>Ab hier sind die Gegner der Bande</b></font><br>';




GM_setValue("kampf4" , kampf4);
}});
}});
}});
}catch(e){}



var newspan44 = document.createElement("div");
newspan44.setAttribute('id', 'basth_info44');
newspan44.setAttribute('href', '/fight/overview/#form1');
newspan44.setAttribute('name', 'basth__info44');
newspan44.setAttribute('style', 'position:absolute;top:'+VonOben1+'px;right:'+VonRechts1+'px;');
var navigation = document.getElementById("navigation");
navigation.appendChild(newspan44)
document.getElementById("basth_info44").innerHTML = '<a class="tooltip"><font color="red"><img src="http://www.fotos-hochladen.net/achtungbandenkampff2mr4qk60.jpg"</font><span><small><br>'
+'<font style=\"color:yellow; font-size:120%;\"><b>Bandenkampf 1</b></font><br>'
+''+GM_getValue("kampf1")+'<br>'
+'<font style=\"color:yellow; font-size:120%;\"><b>Bandenkampf 2</b></font><br>'
+''+GM_getValue("kampf2")+'<br>'
+'<font style=\"color:yellow; font-size:120%;\"><b>Bandenkampf 3</b></font><br>'
+''+GM_getValue("kampf3")+'<br>'
+'<font style=\"color:yellow; font-size:120%;\"><b>Bandenkampf 4</b></font><br>'
+''+GM_getValue("kampf4")+'<br>'
+'<br> by basti1012 </a>'
+'</small></span>';




/*
var betreff = GM_getValue("betreff");
if (betreff == null){
betreff = "kampf1";
GM_setValue("betreff" , betreff);
};
*/





