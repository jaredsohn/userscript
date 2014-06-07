// ==UserScript==
// @name           Sin Politica en Subdivx
// @namespace      None
// @include        http://www.subdivx.com/*
// @author         Leandro M.
// @description    Aprovechando la nueva función de filtrado, este script desactiva los "no tan queridos" posts de politika.
// ==/UserScript==

function click(elm) {
var evt = document.createEvent('MouseEvents');
evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
elm.dispatchEvent(evt);
}

politica=document.getElementById("c68")

click(politica)