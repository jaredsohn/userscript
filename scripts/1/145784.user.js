// ==UserScript==
// @name          Make the enter click the submit button
// @description   Make the enter click the submit button
// @version       1.0
// @include       https://wifi.regus.com*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.js
// @require       https://raw.github.com/jeresig/jquery.hotkeys/master/jquer  6 
// ==/UserScript==

$(document).bind('keydown', 'enter', function() {
  $('.button').click()
});