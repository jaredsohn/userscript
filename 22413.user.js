// ==UserScript==
// @name           Twitter Text Input Fixer
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Undo the text input lock on Twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

/*

(C) 2008 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2008-05-02 - Updated, since Twitter rebroke their code
2008-02-? - Made

*/

location.href = encodeURI('javascript:(' + uneval(function() {
  var oldUpdateStatusTextCharCounter = updateStatusTextCharCounter;
  updateStatusTextCharCounter = function() {
    oldUpdateStatusTextCharCounter.apply(null, arguments);
    $('update-submit').enable();
    $('status').focus();
  };
}) + ')();');