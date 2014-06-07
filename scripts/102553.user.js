// ==UserScript==
// @name           We Hate New Features
// @namespace      We Hate New Features
// @include        http://www.gamefaqs.com/boards/*php*
// ==/UserScript==

var element = document.getElementById("side_col");
element.parentNode.removeChild(element);