// ==UserScript==
// @name           AutoPrice
// @namespace      Jacko and Toni
// @include        *subeta.net/myshop.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery("table.sp-table tr td.sp-table:nth-child(3) center").each(function() {
	var href = "http://subeta.net/ushop.php?act=dosearch&itemname="+escape(jQuery(this).html().toString())+"&type=shops";
	var thing = this;
	jQuery.get(href, function(data) {
		price = jQuery("table.sp-table tr td.sp-table:nth-child(3)", data).html();
		if (jQuery(".sp-header center b").html().toString().localeCompare(jQuery("table.sp-table tr td.sp-table:nth-child(1) a", data).html().toString()) == 0) {
			jQuery(thing).parents("tr").find("td.sp-table:nth-child(5)").prepend("<a href='"+href+"'>You have the lowest at "+price+"</a>");
		} else {
			jQuery(thing).parents("tr").find("td.sp-table:nth-child(5)").prepend("<a href='"+href+"'>Set your price below "+price+"</a>");
		}
	});
});
