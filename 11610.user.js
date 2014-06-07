// ==UserScript==

// @name           Google Reader Enter/Return Opens Item in New Tab

// @namespace      tag:domnit.org,2006-04:gmscripts

// @description    Press enter/return to open the currently selected item in a new tab

// @include        http://www.google.com/reader/view/*

// @include        https://www.google.com/reader/view/*

// ==/UserScript==



/*



(C) 2007 Lenny Domnitser

Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html



History

-------


2007-09-06 - Include more pages (fixes today's reader update)

2007-08-23 - Published code was not the latest version (oops!). Now it actually works.

2007-08-21 - Made



*/



document.addEventListener('keypress', function(event) {

  if(event.keyCode == 13) {

    var entry = document.getElementById('current-entry');

    if(entry) {

      var link = entry.getElementsByTagName('a')[0].href;

      if(link) {

        GM_openInTab(link);

      }

    }

  }

}, false);