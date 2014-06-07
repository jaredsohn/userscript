// ==UserScript==
// @name           No Google Sidebar
// @namespace      *
// @description    Hides the stupid new google sidebar.
// @include        http://www.google.co.uk/search?*
// @include        http://www.google.com/search?*
// ==/UserScript==

// VERSION ONE - I will probably update this to make it look more like the old google as I have more time

var navcol = document.getElementById("leftnav");
navcol.style.display="none";
var ires = document.getElementById("ires");
ires.style.marginLeft="-150px";
var cc = document.getElementById("center_col");
cc.style.border="none";