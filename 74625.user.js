// ==UserScript==
// @name			eRepublik Donation Helper
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @namespace		http://userscripts.org/users/152186
// @description		eRepublik Donation Helper
// @include			http://economy.erepublik.com/*/donate*
// ==/UserScript==

$(document).ready(function() {
	$("#items1").css("padding-top", "0px").css("font-size","11px");
	$("#items1 p").append(',<br />Or double-click an item to move it (hold Ctrl to move all of the same type),<br/>Or double-click here to move them all. <a href="http://goo.gl/PZoRL" target="_blank" title="Donation Script User Guide">[...]</a>');
	$("#items1").dblclick( function () {
		$("ul#own li").appendTo("ul#other");
	});
	if($("#available_items").val()=="10") {
		$("#other").width(501).height(151);
	}
	$("ul#own li").dblclick( function(e) {
		var source = 'ul#'+$(this).parent("@[id]").attr("id");
		var dest   = ((source=='ul#own')?"ul#other":"ul#own");
		if(e.ctrlKey) {
			var itemType = $(this).children('img').attr('alt');
			var items = $(source).children(':has(img[alt="'+itemType+'"])');
			$(items).each( function() { $(this).attr('class','').attr('style','display: list-item;').appendTo(dest); })
			return;
		}
		$(this).attr('class','').attr('style','display: list-item;').appendTo(dest);
	});
});
