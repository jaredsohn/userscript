// ==UserScript==
// @name        Cecil New Tab
// @namespace   cecil.newtab
// @include     https://cecil.auckland.ac.nz/Cecil.aspx
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
   $('td.MenuBlueGradientBG:nth-child(2)').attr('onclick', $('td.MenuBlueGradientBG:nth-child(2)').attr('onclick').replace('newItemPopupWindow', 'window.open').replace(',800,600, 1, 1', ''));
});