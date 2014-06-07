// ==UserScript==
// @name           Paint It Greyscale
// @namespace      John Wrenn
// @description    Surf the web in soothing shades of grey!
// @include        *
// @version        1.0
// ==/UserScript==

var ns = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(ns, "svg");
var filter = document.createElementNS(ns, "filter");
var matrix = document.createElementNS(ns, "feColorMatrix");
var values = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0";

filter.setAttribute('id','fltr');
matrix.setAttribute('values',values);

filter.appendChild(matrix);
svg.appendChild(filter);
document.body.appendChild(svg);
document.body.style.filter="url(#fltr)";