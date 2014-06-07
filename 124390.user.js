// ==UserScript==
// @name           AutoQuest
// @namespace      Jacko and Toni
// @include        *subeta.net/explore/saggitarius.php*
// @include        *subeta.net/explore/opp.php*
// @include        *subeta.net/explore/wizard_quests.php*
// @include        *subeta.net/explore/maleria.php*
// @include        *subeta.net/explore/quest_computer.php*
// @include        *subeta.net/games/gravequests.php*
// @include        *subeta.net/games/library.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function buyitems(items) {
	for(i = 0; i < items.length; i++) {
		jQuery.ajax({
			url: items[i]['url'],
			type: 'POST',
			data: items[i]['data'],
			async: false
		});
	}
}

jQuery(".container_16 form").before((<><![CDATA[
<br/>Max Item Price: <input id="maxprice" /> <button id="startautoquest">Start Auto Questing</button>
]]></>).toString());

if (window.location.href.toString().match(/limit/) != null) {
if (jQuery("form[onsubmit='submitonce(this)']").length > 0) {
	data = {
		"act": "startquest",
		"submit": "Start a Quest"
	};
	jQuery.ajax({
		type: 'POST',
		url: window.location.href, 
		data: data, 
		success: function(ret) {
			jQuery(".container_16").html(jQuery(".container_16", ret).html());
		},
		async: false
	});
}
if (jQuery("label img").length != 0) {
	console.log("Found quest items");
	var error = 0;
	var items = [];
	var i = 0;
	jQuery("label img").each(function() {
		if ( error > 0 ) {
			return;
		}
		href = "http://subeta.net/ushop.php?act=dosearch&itemname="+escape(jQuery(this).attr('id'))+"&type=shops";
		jQuery.ajax({
			url: href,
			success: function(ret) {
				if (jQuery("table.sp-table tr td.sp-table:nth-child(3)", ret).length != 0) {
					price = parseInt(jQuery("table.sp-table tr td.sp-table:nth-child(3)", ret).html().toString().replace(/,/g, '').replace(/[^0-9]+/, ''));
					console.log(price.toString());
					if (price <= window.location.href.toString().replace(/.*limit=/, '').replace(/[^0-9]+/g, '')) {
						form = jQuery("table.sp-table tr td.sp-table:nth-child(5) form", ret);
						url = jQuery(form).attr("action");
						data = {
							"submit": "Buy",
							"itemid": jQuery(form).find("input[name=itemid]").attr("value"),
							"cv": jQuery(form).find("input[name=cv]").attr("value"),
							"vercode": jQuery(form).find("input[name=vercode]").attr("value"),
						};
						items[i] = [];
						items[i]['url'] = url;
						items[i]['data'] = data;
						return;
					}	
				}
				error++;
				
			},
			async: false
		});
		i++;
	});
	if (error == 0) {
		buyitems(items);
		data = {
			"act": "finishquest",
			"submit": "I have them all!"
		};
	} else {
		data = {
			"act": "quitquest",
			"submit": "I give up!"
		};
	}
	jQuery.ajax({
		type: 'POST',
		url: window.location.href,
		data: data,
		success: function(ret) {
			window.location.href = window.location.href;
		},
		async: false
	});
}
}

jQuery("#startautoquest").click(function() {
	limit = parseInt(jQuery("#maxprice").val());
	if (limit > 0) {
		window.location.href = window.location.href+"?limit="+limit;
	}
});
