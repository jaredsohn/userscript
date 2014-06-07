// ==UserScript==
// @name        IGN Boards - Remove thread preview popups
// @namespace   vestitools.pbworks.com
// @include     http://www.ign.com/boards/forums/*
// @version     1
// ==/UserScript==

var tooltip = document.getElementById("PreviewTooltip");
tooltip.parentNode.removeChild(tooltip);
