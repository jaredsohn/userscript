// ==UserScript==
// @name           Developers Developers Developers  
// @namespace      http://reddit.com
// @description    Developers!
// @include        http://msdn.microsoft.com/en-US/windows/*
// ==/UserScript==

function develop() {
    var x = document.getElementsByClassName("heroSection")[0];
    var y = x.getElementsByTagName('h1')[0];
    y.innerHTML = 'Developers. Developers. Developers.';
}

window.addEventListener('load', develop, true);