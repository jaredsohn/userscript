// ==UserScript==
// @name           Letzte Fights in Premium uebersicht pennergame 
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Zeigt die letzten fights in der uebersicht an wie bei premium spielern
// @include        http://*pennergame.de/overview/
// @include        http://*berlin.pennergame.de/overview/
// @include        http://*menelgame.pl/overview/
// @include        http://*dossergame.co.uk/overview/
// ==/UserScript==

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
/*
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/fight/fightlog/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
         var ges = content.split('a')[1];
         var ges2 = ges.split('a')[0];
*/

   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/fight/list/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
         var ges = content.split('/gang/cash/add/">')[1];
         var ges2 = ges.split('</form>')[0];








var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemA = document.getElementsByClassName('tieritemA');


	newdiv = document.createElement('div');
	newdiv.setAttribute('class', 'tieritemA');
	newdiv.style.width = "445px";
	newdiv.innerHTML = ''+ges2+'';
	div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length-5]);
	
}});
