// ==UserScript==
// @name          blip.tv Auto-Source
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   If Flash video doesn't work (like on Linux), try viewing the source video instead
// @include       http://blip.tv/file/*
// @include       http://www.blip.tv/file/*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-01-08 - Started

*/

addEventListener('load', function() {
  function x(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  var error = Boolean(x('//div[@class="flash_error_msg"]'));
  if(error) {
    var url = x('//option[@value and contains(text(), "Source")]').value;
    location.href = url;
  }
}, false);
