// ==UserScript==
// @name Google Search Sort by Date
// @namespace GSSBD
// @description Autoreloads Google to widen search results page up to 20 years by default and adds menu option to sort by date.
// @version 1.3
// @run-at  document-start
// @include http://www.google.*/search*
// @include https://www.google.*/search*
// @exclude http://www.google.*/search*&tbs=qdr:20y
// @exclude https://www.google.*/search*&tbs=qdr:20y
// @exclude http://www.google.ca/*imghp*
// @exclude https://www.google.ca/*imghp*
// @author drhouse
// ==/UserScript==

var theurl = document.URL;
window.location.href = (theurl + "&tbs=qdr:20y");