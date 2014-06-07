// ==UserScript==
// @name          Google Logo Disabler
// @namespace     http://userscripts.org/users/srgio1112
// @description   Disables Google Logo
// @version       1.0
// ==/UserScript==


document.getElementById('lga').innerHTML = '';
document.getElementById('lga').width = 0;
document.getElementById('lga').height = 0;