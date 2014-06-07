// ==UserScript==
// @name           Ask.com: remove right pane, maximize search results
// @namespace      http://www.michaelpollmeier.com
// @description    Removes the right pane ('Want a Personal Answer' etc.) and resizes the search results to 100% width
// @include        http://www.ask.com/web?*
// ==/UserScript==

document.getElementsByClassName("c1")[0].style.display = 'none';
document.getElementsByClassName("main")[0].style.width = '100%';
