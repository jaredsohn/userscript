// ==UserScript==
// @name           Facebook - Ghost Trappers Ghost Monster link opener
// @namespace      Integrator
// @description    Opens Ghost Monster links
// @include        http://www.facebook.com/groups/clickclickmonster/*
// @include        http://www.facebook.com/groups/Admin.MAGT/*
// @version        1.00 - Initial version
// @version        1.10 - Minor bugfixes
// ==/UserScript==

var excludes = '&fromWall';
var openedLinks = {};
var theButton = document.createElement('input');
theButton.type = 'button';
theButton.value = 'Start script';
document.body.appendChild(theButton);
theButton.addEventListener('click', function() {
var theLinks = document.links;
var currentURL = "";
for(var i = 0; i < theLinks.length; i++) {
currentURL = theLinks[i].href;
if(currentURL.indexOf('http://www.ghost-trappers.com/fb/ghost_monster.php?id=') != -1 && currentURL.indexOf(excludes) == -1 && openedLinks[currentURL] != true) {
openedLinks[currentURL] = true;
GM_openInTab(theLinks[i].href);
}
}
}, false);