// ==UserScript==
// @name           Pennergame Fertige Skills Blocker hamburg berlin 4.0
// @namespace      by basti1012 (visit pennerhack.foren-city.de)
// @description    Wer unter skills seine Weiterbiildungen schon fertig gebiildet hat kann hier mit seine Fertigen weiterbildungen blocken es werden nur noch die Angezeit die noch nicht Fertig geskillt sind.
// @include        *pennergame.de/skills/*
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

var classes = document.getElementsByTagName("table");

for (i=0;i<classes.length;i++) {
	var class = classes[i];

	var inner = class.innerHTML;

	if(inner.match(/Stufe erreicht/) || inner.match(/Keine/)) {

		class.style.display = "none";

		class.innerHTML = "";

	}
}


// copyright by basti1012