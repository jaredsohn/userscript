// ==UserScript==
// @name           AutoFrag
// @namespace      Jacko and Toni
// @include        *subeta.net/explore/fragmentizer.php*
// @include        *subeta.net/explore/recycle.php?act=items*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery("div[style='width:500px;text-align:left;']").prepend("<br /><button id='dofrag'>Frag all Items</button>");
jQuery(".container_16 > center:nth-child(4)").prepend("<button id='autobuyall'>AutoBuy all Items</button> (lots of new windows)");
jQuery("td.sp-table").each(function() {
	item = jQuery(this).text().replace(/You have.+/, '');
	href = "http://subeta.net/ushop.php?act=dosearch&itemname="+item.replace(/ /g, '+')+"&type=shops";
	if (window.location.href.toString().match(/price=/)) {
		price = window.location.href.toString().replace(/.*price=/, '').replace(/[^0-9]+/, '');
		tag = "&price="+price;
	} else {
		tag = "";
	}
	jQuery(this).find("b").after(" <a href='"+href+tag+"' class='endofall'><img src='http://images.subeta.net/shop_norm.gif' width='20' /></a>");
});

function frag() {
	jQuery("div[style='float: left; display: inline; width: 100px'] a:nth-child(1)").each(function() { 
		var url_go = jQuery(this).attr("href");
		var success = 1;
		console.log(url_go);
		for(i =0; success == 1 && i < 50; i++) {
			jQuery.ajax({
				url: url_go,
				success: function(data) { 
					if (data.toString().match(/Invalid/)) {
						success = 0;
					} else {
						success = 1;
					}
				},
				error: function(data) { success = 0; }
			}); 
		}
		jQuery(this).fadeOut();
	});
}

jQuery("#autobuyall").click(function() {
	console.log("#autobuy clicked!");
	jQuery(".endofall").each(function() {
		href = jQuery(this).attr("href");
		console.log("Going to "+href);
		GM_openInTab(href);
	});
});

jQuery("#dofrag").click(function() {
	frag();
});
