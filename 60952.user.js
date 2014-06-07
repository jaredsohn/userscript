// ==UserScript==
// @name           Grooveshark Free VIP
// @namespace      http://userscripts.org/users/115374
// @include				 *grooveshark.com*
// ==/UserScript==

var adSidebar = document.getElementById('adBar');
var mainContent = document.getElementById('mainContentWrapper');

if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

if (mainContent) {
	mainContent.style.width = '100%';
}