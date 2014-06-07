// ==UserScript==
// @name Gateworld Sidebar removal
// @description hides the sidebar
// @include http://forum.gateworld.net/*
// @copyright Webxro
// @version 1.0
// @license none
// ==/UserScript==


function hidesb() {
var elements = document.getElementById('sidebar_container');
elements.style.display="none";

var elements = document.getElementById('content_container');

elements.style.width="inherit";




}
hidesb(); 