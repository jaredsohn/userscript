// ==UserScript==
// @name           Hide Gaming Achievements
// @namespace      HGA@kwierso.com
// @description    Get rid of the GA forums on the forum list.
// @include        http://*.roosterteeth.com/forum/
// ==/UserScript==

(function ()
{
	//split forum list at start of Gaming Achievements
	var theforums = document.getElementById("The Forums");
	var splitforums = theforums.innerHTML.split("<b>Gaming Achievements</b>");

	//cut out the newly emptied table row
	var arr = splitforums[0].split("");
	var idx = splitforums[0].length-35;
	arr.splice(idx,35);
	var newfirsthalf = arr.join("");

	//split at start of Media
	splitforums = splitforums[1].split("<b>Media</b>");
	
	//put everything back together, but without the Gaming Achievement Forums
	theforums.innerHTML = newfirsthalf + "<td style='padding: 6px;'><b>Media</b></td>" + splitforums[1];

})();