// ==UserScript==
// @name Plenty of Fish: Bigger Pictures
// @namespace http://userscripts.org/users/115601
// @description Bigger pictures on the Plenty of Fish searches
// @include       http://www.plentyoffish.com/
// @include       http://www.plentyoffish.com/*.aspx*
// @include       http://www.pof.com/*.aspx*
// @exclude		http://www.plentyoffish.com/viewmessage.aspx*
// @exclude		http://www.pof.com/viewmessage.aspx*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function() {    

	var func = function() {

		var img = $(this).attr("src").replace('thumbnails','dating');
		$(this).attr("src",img);
		$(this).css("width","250px");
		$(this).css("height","auto");
		$(this).css("padding","5px");

		

	};

	$(".ic").each(func);
	$("#images img").each(func);
	$("#images").css("height","auto");

	$("#images div").each(function() {
		$(this).css("float","none");
		$(this).css("display","inline");
	});

	 
                                                 
                                               
});