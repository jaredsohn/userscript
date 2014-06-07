// ==UserScript==
// @name          Plano Clicker
// @namespace     http://www.ehrensenf.de
// @description   Klickt Danny und Nina nach Plano
// @include       http://*.dannyandnina.com/vote.php
// @include       http://dannyandnina.com/vote.php
// ==/UserScript==
(function() {

document.forms.vote.state.options.length = 0;
document.forms.vote.town.options.length = 0;

document.forms.vote.state.options[0] = new Option("Texas");
document.forms.vote.town.options[0] = new Option("Plano|215");

})();