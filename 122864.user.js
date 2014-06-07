// ==UserScript==
// @name           Ask.com: remove nav bar
// @namespace      http://www.michaelpollmeier.com
// @description    Removes the top nav bar. Attention: this will hide the settings and login button as they are on the navbar
// @include        http://www.ask.com/web?*
// ==/UserScript==

document.getElementsByClassName("nav")[0].style.display = 'none';
