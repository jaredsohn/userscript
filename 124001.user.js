// ==UserScript==
// @name           MultiGive
// @namespace      Jacko and Toni
// @include        *subeta.net/item.php?n_id=*
// @include        *subeta.net/inventory.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


jQuery("td.sp-table a:contains('Send to a Buddy')").after("<button id='send-all' style='width:auto;display:block;'>Send all to Buddy</div>");

jQuery(".item_show").each(function() {
	jQuery(this).prepend("<input type='checkbox' class='sendtobuddy' />");
	item = jQuery(this).html().replace(/<[sb].*[nb]>/g,'').replace(/<[^>]+>/g,'').replace(/x/, '').replace(/ /g, '+');
	console.log(item);
	jQuery(this).append("<a href='http://subeta.net/ushop.php?act=dosearch&itemname="+item+"&type=shops'><img width='20' src='http://images.subeta.net/shop_norm.gif' /></a>");
});
function getFriends() {
	var friends = [];
	var a = 0;
	jQuery("#menu-sub-friends li").each(function() {
		friends[a] = [];
		friends[a]['name'] = jQuery(this).children("a:nth-child(1)").attr("rel").toString();
		friends[a]['id'] = jQuery(this).children("a:contains('comment')").attr("href").toString().replace(/[^0-9]+/, '');
		a++;
	});
	return friends;
}
function formatFriends(friends) {
	var out = "<select id='friendtosendto'>";
	for (var i=0; i<friends.length; i++) {
		out += "<option value='"+friends[i]['id']+"'>"+friends[i]['name']+"</option>";
	}
	out += "</select>";
	return out;
}
jQuery("#container_Inventory").before(formatFriends(getFriends())+"<button id='sendthesetobuddy'>Send to buddy</button> &nbsp; &nbsp; <button id='sendthesetovault'>Send to Vault</button>");

jQuery("#sendthesetobuddy").click(function() {
	var friendid = jQuery("#friendtosendto option:selected").attr("value");
	jQuery(".item_show .sendtobuddy:checked").each(function(i, thing) {
		var item = jQuery(thing).parents(".item_show");
		var itemurl = jQuery(item).children("a").attr("href");
		//jQuery("#notice").append(jQuery(item).html());
		count = parseInt(jQuery(item).children("b").html());
		if (count > 1) {
			for (var i=count; i>=0; i--) {
				if (sendItem(itemurl, friendid)) {
					jQuery(item).children("b").html(i.toString());
					if (i == 0) {
						jQuery(item).fadeOut();
					}
				}
			}
		} else {
			if (sendItem(itemurl, friendid)) {
				jQuery(item).fadeOut();
			}
		}
	});
});

jQuery("#send-all").click(function() {
	jQuery("#notice").html("sending...");
	while (sendItem(window.location.href));
});
function sendItem(url, friendid) {
	success = true;
	jQuery.ajax({
		url: url,
		cache: false,
		success: function(response) {
			itemid = jQuery("td.sp-table a:contains('Send to a Buddy')", response).attr("href").toString().replace(/[^0-9]+/, "");
			if (!itemid) {
				jQuery("#notice").append("<br />sent!");
				success = false;
				return false;
			}
			//jQuery("#notice").append("<br />"+itemid);

			data = {"uid": friendid,
				"itemid": itemid,
				"submit": "Send to buddy" };
			jQuery.post("http://subeta.net/item.php?act=send&send=1", data, function(ret){ return; });
		},
		async: false
	});
	return success;
}

function sendItemtoVault(url) {
	success = true;
	jQuery.ajax({
		url: url,
		cache: false,
		success: function(response) {
			itemid = jQuery("td.sp-table a:contains('Move to your Vault')", response).attr("href").toString().replace(/[^0-9]+/, "");
			if (!itemid) {
				jQuery("#notice").append("<br />sent!");
				success = false;
				return false;
			}
			jQuery.post("http://subeta.net/item.php?act=movetovault&itemid="+itemid, function(ret){ return; });
		},
		async: false
	});
	return success;
}

jQuery("#sendthesetovault").click(function() {
	jQuery(".item_show .sendtobuddy:checked").each(function(i, thing) {
		var item = jQuery(thing).parents(".item_show");
		var itemurl = jQuery(item).children("a").attr("href");
		//jQuery("#notice").append(jQuery(item).html());
		count = parseInt(jQuery(item).children("b").html());
		if (count > 1) {
			for (var i=count; i>=0; i--) {
				if (sendItemtoVault(itemurl)) {
					jQuery(item).children("b").html(i.toString());
					if (i == 0) {
						jQuery(item).fadeOut();
					}
				}
			}
		} else {
			if (sendItemtoVault(itemurl)) {
				jQuery(item).fadeOut();
			}
		}
	});

});
