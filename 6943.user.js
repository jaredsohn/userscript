// ==UserScript==
// @name           Bearable Facebook Wallpost
// @namespace      http://www.myspace.com/obsessiveatbest
// @description    Makes the facbook wallpost texbox longer and the width of an actual post.
// @author  Gavin Paul
// @version 1.0
// @include        *http://*.facebook.com/wallpost.php?*
// ==/UserScript==

document.getElementById("text").rows = 15;
document.getElementById("text").cols = 56;