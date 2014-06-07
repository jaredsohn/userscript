// ==UserScript==
// @name       Hide Hot Network Questions 
// @namespace  http://eliasdorneles.github.io/gm
// @version    0.1
// @description  Hide Hot Network Questions in StackOverflow and other StackExchange sites
// @match      http://*/*
// @copyright  2012+, Elias
// ==/UserScript==

document.getElementById('hot-network-questions').style.display="none";