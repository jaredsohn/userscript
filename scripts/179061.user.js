// ==UserScript==
// @name       Remove EDMTunes.com Facebook overlay
// @namespace  http://userscripts.org/
// @version    0.1
// @description  auto-removes fb overlays
// @match      *www.edmtunes.com*
// @copyright  2012+, You
// ==/UserScript==

document.getElementById('easy_fblkpop').style.display="none";
document.getElementById('easy_fbbg').style.display="none";