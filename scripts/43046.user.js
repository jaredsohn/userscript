// Written by Jeffrey Sharkey
// http://www.jsharkey.org/
// Copyleft, released under GPL

// Rewritten using jQuery by Daniel Moore
// http://strd6.com

// ==UserScript==
// @name          Two column Google 
// @namespace     http://www.strd6.com/
// @description   Places Google search results into two columns - doesn't do everything, just two columns, that's all!
// @include       http://www.google.*/search*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

(function() {
  var table = $("<table></table>");
  var row = $('<tr></tr>').appendTo(table);
  var left = $('<td valign="top"></td>').appendTo(row);
  var right = $('<td valign="top"></td>').appendTo(row);

  var links = $('li.g');
  var halfLinks = links.size() / 2;
  
  $.each(links, function(index, item) {
    if(index < halfLinks) {
      left.append(item);
    } else {
      right.append(item);
    }
  });
  
  table.appendTo($('.hd + div ol'));
})();