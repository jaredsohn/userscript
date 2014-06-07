// ==UserScript==
// @name           KeinTitel!
// @namespace      forum.spiegel.keintitel
// @description    Fügt einen zufälligen Titel bei antworten im "Blog" Forum ein
// @include        http://forum.spiegel.de/newreply.php*
// ==/UserScript==

var DEFAULT_FORUM_TITLES = [
  "Bitte geben Sie einen Titel für den Beitrag an!",
  "Niemand hat die Absicht einen Titel einzugeben!",
  "Hier könnte Ihre Werbung stehen!",
  "Jetzt werben - im SpiegelOnline Forum",
  "Für ein titelfreies SPON-Forum",
  "Titel, Thesen, Temperatur",
  "Hier steht ein *Titel*",
  "Der Titel dieses Postings unterliegt der Geheimhaltung",
  "(Hat der Beitrag promoviert, dass er einen Titel führen darf?)",
  "Aktion automatische Überschrift",
  "Sinn und Unsinn von Titeln",
  "Titel zu verschenken, unbenutzt",
  "Titel sind aus",
  "Keine Macht den Titeln",
  "Bitte geben Sie keinen Titel für den Beitrag an!",
  "Titel... können zum Rücktritt zwingen"
];

var FORM_NAME = 'vbform';
var FORUM_THAT_NEEDS_TITLE = '22'; // Blog Forum

var form = document.forms.namedItem(FORM_NAME);
var title = form && form.elements.namedItem('title');
var div = document.getElementById('spBreadcrumbLogin');

// Always set title from now on
var found = true; //div.selectSingleNode('//a[@href="forumdisplay.php?f=' + FORUM_THAT_NEEDS_TITLE + '"]');

if (form && title && found) {
  title.value = DEFAULT_FORUM_TITLES[Math.floor(Math.random()*DEFAULT_FORUM_TITLES.length)];
}