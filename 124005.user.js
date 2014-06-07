// ==UserScript==
// @name           MSExy
// @namespace      818886bda8d42c04cd09fc1fd957f5db
// @description    Hide the sidebar
// @include        http://forums.moneysavingexpert.com/showthread.php?*
// ==/UserScript==

var sidebar = "MSEForumsRHS";
var element = document.getElementById(sidebar);
element.parentNode.removeChild(element);