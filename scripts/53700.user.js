// ==UserScript==
// @name           neuer werbeblocker by basti1012 heute gab es neue werbung heute schon wieder weg mit diesen script
// @namespace      by basti1012 (visit pennerhack.foren-city.de)
// @description    loescht die neue handywerbung und den ganzen neuen scheiss jetzt auch wieder
// @include        *pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
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

var classes = document.getElementsByClassName("tieritemA");

for (i=0;i<classes.length;i++) {
	var class = classes[i];

	var inner = class.innerHTML;

	if(inner.match(/Gratis/) || inner.match(/O2/) || inner.match(/performance-netzwerk\.de/) || inner.match(/kostenlos/) || inner.match(/kostenlose/) || inner.match(/SMS/) || inner.match(/Shop/) || inner.match(/Neuen/) || inner.match(/Partner/)) {

		class.style.display = "none";

		class.innerHTML = "";

	}
}
