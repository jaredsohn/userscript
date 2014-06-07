// ==UserScript==
// @name           dom destroyer
// @namespace verpeilt2007
// @include        *
// ==/UserScript==
 
// created by pleased.ch
//
// Hides every Element by a left click!
//
 
document.addEventListener('click', function(event) {
for (var i = 0; i < document.getElementsByTagName(event.target.tagName).length; i++){
if (document.getElementsByTagName(event.target.tagName)[i] == event.target) {
document.getElementsByTagName(event.target.tagName)[i].style.visibility="hidden";
event.preventDefault();
}
}
}, true);