// ==UserScript==
// @name           Hide Google Sidebar
// @namespace      http://www.phreakyourgeek.com
// @description    Hides the sidebar on the Google search results page.
// @include        http://www.google.com*
// ==/UserScript==

document.getElementById("leftnav").style.display = "none";
document.getElementById("center_col").style.marginLeft = "0";