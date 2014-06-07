// ==UserScript==
// @name           RemoveLeaveBttn
// @namespace      motorkar
// @include        *tf2r.com/k*.html
// ==/UserScript==

var elmDeleted = document.getElementById("enbut");
elmDeleted.parentNode.removeChild(elmDeleted);

// removes bttn for enter and leave both :)