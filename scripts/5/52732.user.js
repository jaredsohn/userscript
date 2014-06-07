// ==UserScript==
// @name      spert die neue werbung bei pennnergame wo die neue Handy werbung drauf steht
// @namespace basti1012   http://pennerhack.foren-city.de
// @description nach der instalation ist die neue werbung weg unter activities und skill.Nicht wie andere Versionen die hier unter mein Namen angeboten werden.Dieses ist die original version von mir und ist voll funktionstuechtig lauft in berlin und hamburg
// @include *pennergame.de*
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

	if(inner.match(/Gratis/) || inner.match(/O2/) || inner.match(/performance-netzwerk\.de/)) {

		class.style.display = "none";

		class.innerHTML = "";

	}
}



//Copiright by basti1012