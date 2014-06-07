// ==UserScript==
// @name           mint.com Clean Overview
// @description    Hides Advice, Goals, Invetments, and Offers from the overview.
// @include        https://wwws.mint.com/overview.event*
// @grant          none
// ==/UserScript==

window.addEventListener('load', function() {
    document.getElementById("module-advice").style.display="none";
    document.getElementById("module-goals").style.display="none";
    document.getElementById("module-investments").style.display="none";
    document.getElementById("module-offers").style.display="none";
}, true);