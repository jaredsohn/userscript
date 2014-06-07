// ==UserScript==
// @name       Facebook Rainbow
// @version    1
// @include    http://*.facebook.com*
// @include    https://*.facebook.com*
// @copyright  2013+, eMBee
// @run-at	  document-end
// ==/UserScript==

window.setTimeout(document.getElementById('blueBar').style.background = "linear-gradient(#FF0000,#FF8000,#FFFF00,#7FFF00,#00FF00,#0080FF,#0000FF,#7F00FF,#FF00FF,#FF0080)",2000);