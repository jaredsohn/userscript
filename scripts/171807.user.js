// ==UserScript==
// @name        Anti Refresh Cowcotland
// @namespace   perdu.com
// @description Coupe l'actualisation automatique sur le site Cowcotland.com .
// @include     *cowcotland.com*
// @version     1
// @grant       1
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML.replace('<meta http-equiv="refresh" content="600">', '') ;