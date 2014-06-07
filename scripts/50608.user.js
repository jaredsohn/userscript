// ==UserScript==
// @name            Text Legend Removal
// @namespace       Text Legend Removal
// @description     Removes the Text Legend when creating a post
// @license         Creative Commons Attribution License
// @version	    A as in apple
// @include         http://*bungie.net/Forums/createpost.aspx?*
// @include 	    http://www.bungie.net/fanclub/*/Forums/createpost.aspx?*
// @compatible      Greasemonkey
// ==/UserScript==


	var legend = document.getElementById("ctl00_mainContent_postForm_skin_formattingLegendPanel");
	legend.parentNode.removeChild(legend);

