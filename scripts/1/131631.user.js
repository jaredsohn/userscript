// ==UserScript==
// @name NoGmailScrollbar
// @description Removes the scrollbar in gmail messages, my browser does already have a scrollbar, no need for google to add anonther one 
// @match http://*.gmail.*
// ==/UserScript==
(function() {
var box;

box = document.getElementsByClassName('aeJ');
box[0].style.overflowY = 'none';
})();