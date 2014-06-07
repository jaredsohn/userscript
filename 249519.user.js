// ==UserScript==
// @name           SpiceWorks 7 Cleaner
// @namespace      None
// @include        http://*/tickets*
// @grant          none
// ==/UserScript==

document.getElementById('sidebar').style.display = 'none';
document.getElementById('content_wrapper').style.paddingRight = 0;
document.getElementById('community-content').style.display = 'none';
document.getElementById('community-content').style.position = 'absolute';