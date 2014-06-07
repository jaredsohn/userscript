
// ==UserScript==
// @author El-Reg Reader intelligent enough to tell the difference between a POPULAR browser and a GOOD browser.
// @description Replace occurances of "Firefox" with "Bloaty 'Ol Firefix" and "Opera" with "Most Awesome Opera"
// @name Call it by it's name stew.
// @include        http://www.theregister.co.uk/*
// @include        http://forums.theregister.co.uk/forum/*
// @version        1.0
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace( /Firefox/g, "Bloaty 'Ol Firefix" );
document.body.innerHTML = document.body.innerHTML.replace( /Opera/g, "Most Awesome Opera" );
