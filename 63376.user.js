// ==UserScript==
// @name           wiwu und wut warner pennergame hamburg berlin 4.0 by basti1012
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    WiWu-Warner ,man wird auf jeder Seite gewarnt das wiwu oder wut aktiv ist so kann man es nicht mehr verpaassen
// @include        http://*pennergame.de/*
// @exclude        http://newboard.pennergame.de
// ==/UserScript==


//var content = document.getElementById('newsticker');
//content.innerHTML = '<marquee behavior="scroll"><ul><a href="http://pennerhack.foren-city.de"><span style=\"color:green; font-size:100%;\"><b>Werbung blocken mit Bastis Scripte</b></span></a></ul></marquee>';
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var link = 'http://berlin.pennergame.de/';
 }
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var link = 'http://www.dossergame.co.uk/';
 }
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var link = 'http://www.pennergame.de/';
 }
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var link = 'http://www.menelgame.pl/';
 };
try{
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'gang/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
        var ges = content.split('<tr align="left" valign="top">')[2];
        var ges2 = ges.split('<tr align="left" valign="top">')[0];


var content = document.getElementById('bug');
//document.getElementById("provocation_area").style.color = "white";
content.innerHTML += ''+ges2+'';

}});
}catch(e){}
// copyright by basti1012