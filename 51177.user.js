// ==UserScript==
// @name Bastis schnell start plunder drop down version 1.3alle games
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack 
// @description Zeigt in dem InfoScrean eine schnelll plunder wechsel methode an.Plunder bild ist Logout.alle games 
// @include http://*pennergame.de*
// @include http://*berlin.pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// ==/UserScript==
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var gg = '18';
  var text = 'Dir fehlen bis zum Kanzleramt noch:';
  var pg = 'http://berlin.pennergame.de/';
  var sig = 'http://mediaberlin.pennergame.de/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var gg = '18';
  var text = 'You miss up to the castle still:';
  var pg = 'http://dossergame.co.uk/';
  var sig = 'http://media.dossergame.co.uk/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var gg = '18';
  var text = 'Dir fehlen bis zum Schloss noch:';
  var pg = 'http://www.pennergame.de/';
  var sig = 'http://media.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var gg = '18';
  var text = 'Chybi WY znowu dop?ki zamek:';
  var pg = 'http://menelgame.pl/';
  var sig = 'http://media.menelgame.pl/cache/';
};
GM_xmlhttpRequest(
{
method: 'GET',
url: ''+pg+'/stock/plunder/',
onload: function(responseDetails) 
{
var side = responseDetails.responseText;
plunder = side.split('<td width="4%"><img src="'+sig+'img/plunder/icons/')[1];
plunder1 = plunder.split('.gif" class="item_pic" /></td>')[0];
var plud2 = side.split('position: relative; float:left">')[1].split('<div style=');
var plud3 = plud2[1].split('</select>')[0];
plud3 = plud3.replace(/select/, 'select style="width:138px;"');
out(plud2, plud3);
}
});
function out(plud2, plud3)
{
var MenueLeft = 500;
var MenueTop = 40;
var AnlegenBtn = '<input type="button" name="Plund" id="f_submit" value="OK" />';
var Plunder = '<div '+ plud3 + AnlegenBtn +'<a href="/logout/"><img src="'+sig+'img/plunder/icons/'+plunder1+'.gif" width="'+gg+'" height="'+gg+'"</a>';

if(document.getElementById("pfandflaschen_kurs_ajax_style")){
document.getElementsByTagName("li")[6].innerHTML = ''+Plunder+'';
}
document.getElementsByNatElementById('f_plunder').value;
GM_xmlhttpRequest(
{
method: 'POST',
url: ''+pg+'/stock/plunder/change/',
headers: 
{'Content-type': 'application/x-www-form-urlencoded'},
data: encodeURI('f_plunder='+PlunderId+'&f_submit=Anlegen'),
onload: function(responseDetails) 
{ 
window.location.reload();
}
});
},false);
};

// copyright by basti1012 und hilfe von diamonddog