// ==UserScript==
// @name       Use Retro theme on GameBattles
// @namespace  http://gamebattles.majorleaguegaming.com/
// @version    0.1
// @description  Updates the html tag to add the retro class 
// @match      http://*/*
// @copyright  2012+, Me
// ==/UserScript==

var hostname = window.location.hostname;
if (hostname == 'gamebattles.majorleaguegaming.com') {
   var htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.className = 'retro';
}