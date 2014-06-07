// ==UserScript==
// @name        Fixed pastebin topbar
// @namespace   http://wtlink.be
// @description Fix the pastebin header top top
// @include     http://pastebin.com*
// @grant       none
// @version     1.1
// @copyright   2012+, bendem
// ==/UserScript==
document.getElementById('logo').style.position = 'fixed';
document.getElementById('logo').style.zIndex = 2;
document.getElementById('logo').style.left = '5px';
document.getElementById('header').style.position = 'fixed';
document.getElementById('header').style.right = '5px';
document.getElementById('header').style.left = '5px';
document.getElementById('header').style.zIndex = 1;
document.getElementById('header').style.boxShadow = '0px 1px 6px rgba(0, 0, 0, 0.7)';
document.getElementById('monster_frame').style.marginTop = '98px';