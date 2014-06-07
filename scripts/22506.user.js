// ==UserScript==
// @name           Twitter Byte Counter
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Makes the character counter count bytes instead of Unicode characters, since that's what Twitter uses at the back end
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

/*

(C) 2008 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2008-02-24 - Little cleanup of bookmarklet-style invocation
2008-02-08 - Made

*/

var patch = function() {
  function utf8ByteCount(s) {
    return encodeURI(s).replace(/%../g, '.').length;
  }

  var oldUpdateStatusTextCharCounter = updateStatusTextCharCounter;

  updateStatusTextCharCounter = function(value) {
    oldUpdateStatusTextCharCounter({length getter: function() {
      return utf8ByteCount(value);
    }});
  }
}

// invoke bookmarklet style to get out of Greasemonkey context:
location.href = 'javascript:(' + encodeURI(uneval(patch)) + ')();';