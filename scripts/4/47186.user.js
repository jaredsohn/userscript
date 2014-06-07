// ==UserScript==
// @name           housing search image full
// @namespace      harry
// @include        http://genrislistings.marketlinx.com/Search/Scripts/MediaDisplay.asp*
// @require        http://online.rit.edu/includes/js/jquery/jquery-latest.min.js
// ==/UserScript==
 	
$(document).ready(function() {
	var links = $("a");
	for ( var i=0; i < links.length; i++ ) {
		var linky = $(links[i]);
		var first = $(":first-child",links[i]);
		if ( first.get(0) && first.get(0).nodeName.toLowerCase() == "img" ) {
			var img = linky.attr("href");
			var par = linky.parent();
			linky.remove();
			par.prepend('<img src="' + img + '" border="0"/>');
		}
	}
	$("form").remove();
	$("p").remove();
	$("script",$("body")).remove();
});