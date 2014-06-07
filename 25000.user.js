// ==UserScript==
// @name           Alexa.com - Search traffic rankings by defaults
// @namespace      data:text/plain;AlexaAutoTrafficRankings
// @description    Selects the "Traffic Rankings" search option on page load
// @include        http://www.alexa.com/
// ==/UserScript==
document.getElementById('goTo').value = 'traffic';