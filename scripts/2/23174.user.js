// Google Scholar short citation finder
// 2008-02-22
// Copyright (c) 2008, Dan Kurtz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Scholar short citation finder
// @author        Dan Kurtz (incidentist)
// @namespace     http://brickswithoutclay.com
// @description   Makes Google Scholar do the right thing when searches of the form "knuth 1969" are entered.
// @include       http://scholar.google.*
// @version       1.0
// ==/UserScript==

function redirectSearch() {
  // alert("c"); return false;
  qInput = this.elements.namedItem("q");
  var q = qInput.value;
  q = q.replace(/^\s+|\s+$/, '');
  var yearPattern = /\d\d\d\d$/;  
  if (year = q.match(yearPattern)) {
    // Make low and high years equal to the found year
    var ylo = document.createElement('input');
    ylo.setAttribute('type', 'hidden');
    ylo.setAttribute('name', 'as_ylo');
    ylo.setAttribute('value', year);
    
    var yhi = ylo.cloneNode(true);
    yhi.setAttribute('name', 'as_yhi');
    
    this.appendChild(ylo);
    this.appendChild(yhi);
    var authorQuery = 'author:' + q.replace(year,'');
    qInput.value = authorQuery;
  }
  return false;
}

function addBehavior() {
  var form = document.forms.namedItem("f");
  if (!form) {
    form = document.forms.namedItem("gs");
  }
  var els = form.elements;
  var sBtn = els.namedItem('btnG');

  form.addEventListener("submit", redirectSearch, false); 
}

window.addEventListener("load", addBehavior, false);