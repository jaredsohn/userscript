// ==UserScript==
// @name           Google Results Sidebar Hider
// @namespace      GRSH
// @description    It hides the stupide sidebar on the results page that google has decided to force upon us.
// @include        http://www.google.com/search*
// ==/UserScript==
if (document.getElementById) { // DOM3 = IE5, NS6
document.getElementById('leftnav').style.visibility = 'hidden';
}
if (document.getElementById) { // DOM3 = IE5, NS6
document.getElementById('center_col').style.margin = '0px';
}
