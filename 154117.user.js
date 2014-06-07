// ==UserScript==
// @name        FilesTube Forwarder
// @namespace   http://qksms.x10.mx
// @description Files Tube Link Forwarder by Deepak Chaudhary
// @include     http://www.filestube.com/*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @exclude     http://www.filestube.com/
// @exclude     http://www.filestube.com/search.html*
// ==/UserScript==

jQuery(document).ready(function() {
	var link = $("#copy_paste_links").html();
	var links = link.split("\n");
	if(links.length == 2)
		window.location.href = $("#copy_paste_links").html();
	else
	{
		var links = link.split("\n");
		var i=0;
		$(".new_f_profile").html("");
		for(i=0; i<links.length-1; i++)
		{
			$(".new_f_profile").html($(".new_f_profile").html()+"<a target='_blank' href=" + links[i] + "><h2> Link " + i + "</h2></a><br />");
		}
	}
});