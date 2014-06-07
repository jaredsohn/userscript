// ==UserScript==
// @name         Remove shop table	
// @version      v1.0
// @description  Scripts by Lagi :)
// @author       Lagi
// @include	http://*.the-west.*/game.php*
// ==/UserScript==

function init() {
var element = document.getElementById("abdorment_left");
element.parentNode.removeChild(element);
}
window.onload = init;