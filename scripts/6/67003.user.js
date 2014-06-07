// ==UserScript==
// @name           OGame (1.X) Dropdown Text Color Fix
// @namespace      http://theelitist.net/2010/01/22/ogame-select-tag-fix/
// @description    Fixes OGame (1.X) Dropdown Text Color 
// @include        *.ogame.org*
// @exclude        *board.ogame.org*
// ==/UserScript==

// Modify the CSS
$(document).ready(function() {
	$("select").css("color", "inherit");
});