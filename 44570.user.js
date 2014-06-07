// ==UserScript==
// @name         ReklamebannerRBK.no
// @description   Fjerner annonsebanneren på RBK.no
// @include       http*
// ==/UserScript==

/*
 * This script is Public Domain. You are welcome to use it in any way you like.
 */
 

var adSidebar = document.getElementById('adTopContainer');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}