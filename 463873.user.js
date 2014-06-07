// ==UserScript==
// @name        Tagesanzeiger Paywall-Remover
// @namespace   http://userscripts.org/users/649180
// @description Removes the paywall from tagesanzeiger.ch
// @include     http://*.tagesanzeiger.ch*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener ("load", tagi_paywall_remover_main, false);

function tagi_paywall_remover_main() {
    var overlayNode = document.getElementById('overlay_wrap').parentNode;
    overlayNode.parentNode.removeChild(overlayNode);
}
