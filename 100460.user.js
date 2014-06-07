// ==UserScript==
// @name           Comic Sans
// @namespace      TurtleHax
// @description    The best font is now expressed!
// @include        *
// ==/UserScript==

var Style = document.createElement('style');
Style.textContent = '* { font-family: "Comic Sans MS" !important; }';

document.getElementsByTagName('head')[0].appendChild( Style );