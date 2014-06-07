// ==UserScript==
// @name           OGame Redesign: Retarted Star
// @namespace      Baracs
// @description    Removes the annoying blinky stars in 1.2.1
// @include        http://*ogame.*
// ==/UserScript==
(function ()
{

var star = document.getElementById('star');
star.parentNode.removeChild(star);
star = document.getElementById('star1');
star.parentNode.removeChild(star);
star = document.getElementById('star2');
star.parentNode.removeChild(star);

}) ();