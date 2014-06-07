// Number Netflix History Rows
// version 0.1 BETA!
// 2006-11-21
// by Jim Biancolo 
//   (although code for counting rows taken from the "number rows" bookmarklet
//   here:  http://www.squarefree.com/bookmarklets/pagedata.html)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Show Cell Headers", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Number Netflix History Rows
// @namespace     http://www.biancolo.com
// @description   Adds row numbers to the Netflix complete history page.
// @include       http://www.netflix.com/ReturnedRentals
// ==/UserScript==

function has(par, ctag) {
   for(var i = 0; i < par.childNodes.length; ++i)
      if(par.childNodes[i].tagName == ctag)
         return true; }

function add(par, ctag, text) {
   var c = document.createElement(ctag); 
   c.appendChild(document.createTextNode(text)); 
   par.insertBefore(c, par.childNodes[0]); } 

var tbl = document.getElementById('returned_movies');
var n = 0;
var trs = tbl.rows;
var tr; 

for(j = 0; j < trs.length; ++j) {
   tr = trs[j]; 
   if(has(tr, "TD"))
      if(j == 0)
         add(tr, "TD", "Row"); 
      else
         add(tr, "TD", ++n); 
   else if(has(tr, "TH"))
      add(tr, "TH", "Row");
}
