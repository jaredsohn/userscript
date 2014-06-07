// ==UserScript==
// @name       Spikiz out of frame
// @namespace  http://my.psype.fr
// @version    0.1
// @description  You know it. 
// @match      http://*.spikiz.com/redir?*
// @copyright  2012+, TwK
// ==/UserScript==

window.location.href = document.getElementsByTagName("iframe")[0].src;