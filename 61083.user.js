// ==UserScript==
// @name           Supprime PUB
// @namespace      http://nantes.onvasortir.com
// @include        http://*.onvasortir.com/*
// ==/UserScript==

var MaPub = document.getElementById('divpubG');
if (MaPub)
MaPub.parentNode.removeChild(MaPub)

MaPub = document.getElementById('divpubD');
if (MaPub)
MaPub.parentNode.removeChild(MaPub)

