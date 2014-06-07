// ==UserScript==
// @name       eZ Jira Colourize
// @namespace  http://psicofrenia.com/
// @version    1.0
// @description  Add colors to restricted Jira comments
// @match      https://jira.ez.no/browse/EZP*
// @include      https://jira.ez.no/browse/EZP*
// @copyright  2013+, Eduardo Fernandes
// @downloadURL    https://userscripts.org/scripts/source/165646.user.js
// @updateURL      https://userscripts.org/scripts/source/165646.meta.js
// @grant       none
// ==/UserScript==

// Colors
var colorEmployees = '#FEF1E9';

Array.prototype.slice.call(document.querySelectorAll('div[id^="comment-"] .redText')).forEach(function( e ) {
  if(e.textContent.search('Employees') !== -1) {
	e.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = colorEmployees;  
  }
});