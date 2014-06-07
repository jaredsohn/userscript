// ==UserScript==
// @name		SchuelerVZ: Keine laestigen Sprueche in der Seitenleiste
// @author		Homer Bond 005
// @include	*.schuelervz.net*
// @exclude	*secure.schuelervz*
// @exclude	*/Plauderkasten
// @exclude	*schuelervz.net/Default
// ==/UserScript==

var stripe = document.getElementById ("LeftsideBox");
var stripe_parent = stripe.parentNode;
stripe_parent.removeChild(stripe);