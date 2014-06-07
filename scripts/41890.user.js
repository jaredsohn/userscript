// ==UserScript==
// @name           Context-sensitive archives link
// @namespace      shoecream@luelinks.net
// @description    Makes the "Archives" link at the top of the page go to the board you are currently on
// @include        http://boards.endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// ==/UserScript==

var key = '//archives.endoftheinter.net/search.php?board=';

var links = document.getElementsByTagName('a');

function updateURL (elem) {
   if (elem.textContent == 'Archives') {
      var board = document.location.search.match(/board=(-?\d+)/);
      if (board) {
         elem.href = key+board[1];
      }
   }
}

Array.forEach(links, updateURL);
