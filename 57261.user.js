// Arabic Wikipedia Fonts Improvements
// 22/5/2011
// Version 1.7.1
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// WHAT IT DOES:
// Replaces Arabic Wikipedia fonts faces and sizes for better reading
// --------------------------------------------------------------------
// ==UserScript==
// @name            Arabic Wikipedia Fonts Improvements
// @description     Replaces Arabic Wikipedia fonts faces and sizes for better reading
// @include         *ar.wikipedia.org/*
// @include         *.wikimedia.org/wikipedia/ar/*
// ==/UserScript==

var body = document.getElementById('bodyContent');

styleIt('p');
styleIt('ul');

function styleIt(tag) {
  var element = body.getElementsByTagName(tag);

  for (var i = 0; i < element.length; i++) {
    element[i].style.fontFamily = 'Tahoma, \'DejaVu Sans\'';
    element[i].style.lineHeight = '1.7em';
  }
}