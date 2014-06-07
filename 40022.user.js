// ==UserScript==
// @name Jmeeting 0.1
// @description Jmeeting free account upgrade ;))
// @include http://www.jmeeting.com/portals/user/applet.xtp
// ==/UserScript==


document.body.innerHTML = document.body.innerHTML.replace(new RegExp('"level" value="0"',"g"), '"level" value="1"');
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('level="0"',"g"), 'level="1"');


