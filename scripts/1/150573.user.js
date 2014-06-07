// ==UserScript==
// @name        Netflix Facebook Connect remover
// @namespace   kongregatehack.netflix.facebookremover
// @description Removes the Facebook connect part of Netflix
// @include     http://movies.netflix.com/WiHome
// @version     1
// @grant		none
// ==/UserScript==

var elm = document.getElementsByClassName("mrow fb overlay")[0];

elm.parentNode.removeChild(elm);