// ==UserScript==
// @name       Get real large image at yarni.ru
// @version    0.1
// @description  substitute dummy image's src with real background shown 
// @match      http://yarni.ru/gallery/displayimage.php*
// @copyright  2012+, You
// ==/UserScript==

var div = document.getElementById('content');
div.getElementsByTagName('img')[0].src = div.parentNode.getAttribute('background');