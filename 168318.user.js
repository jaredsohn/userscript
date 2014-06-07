// ==UserScript==
// @name            Politiken Freeloader
// @namespace       http://userscripts.org/users/2354
// @icon            http://politiken.dk/favicon.ico
// @description     Removes paywall on Politiken.dk
// @include         http://politiken.dk/*
// @match           http://politiken.dk/*
// @version         2
// ==/UserScript==

var n = document.getElementById('meteroverlay');
if (null !== n) { n.addEventListener('click', freeload, false); }

function freeload(event)
{
    var n = document.getElementById('meteroverlay');
    n.parentNode.style.overflow = 'visible';
    n.parentNode.removeChild(n);
    n = document.getElementById('teaserwrapper');
    n.parentNode.removeChild(n);
}