// ==UserScript==
// @name           opendns guide page cleaner
// @namespace      Matt
// @include        http://guide.opendns.com/controller.php?q=*
// ==/UserScript==

//remove top ads
var adSidebar = document.getElementById('topad');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

//remove bottom ads
var adSidebar = document.getElementById('bottom-ad');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

//remove bottom ad line
var adSidebar = document.getElementById('bottomad');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

//remove side ads
var adSidebar = document.getElementById('adbox');if (adSidebar) {    adSidebar.parentNode.removeChild(adSidebar);}

