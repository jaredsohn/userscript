// ==UserScript==
// @name     Append jpg
// ==/UserScript==

if (window.location.toString().match(".jpg") == null) {

  window.location.replace(window.location + '?.jpg');

}
