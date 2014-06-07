// ==UserScript==
// @name           AutoBuy
// @namespace      Jacko and Toni
// @include        *subeta.net/ushop.php?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://sizzlemctwizzle.com/updater.php?id=124035
// ==/UserScript==

jQuery("table.sp-table[width=75%]").before("Max sP: <input type='text' id='max-price' /> AutoVault: <input type='checkbox' id='autovault' /> <button id='autobuy' style='background:#6c6; border:1px solid #333; width:100px; padding:5px;'>AutoBuy</button><style>#autobuy:hover { cursor: pointer; background: #7d7!important; }</style>");
jQuery("#notice").html("<div id='autobuy-error'></div><br />Total purchased: <span id='numbought'>0</span>");

function subSp(n) {
	sp = jQuery("p:contains('sP: ') a.widget-login-sp").html().replace(/,/g, '');
	sp = parseInt(sp) - parseInt(n);
	jQuery("a[href='/explore/vaults.php?vault=bank']").html(sp.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ","));
}
function print(string) {
	jQuery.get("http://onewordreply.com/ablog.php?message="+window.btoa(string));
}
jQuery("#autobuy").click(function() {
	var total = parseInt(jQuery("#numbought").html());
	jQuery("#autobuy").css("background","#66c");
	jQuery(".sp-table form").each(function() { 
		
		var sp = jQuery(this).parents("tr").children(".sp-table:nth-child(3)").html().replace(/,/g, '').match(/[0-9]+/);
		price = jQuery("#max-price").val();
		jQuery(this).after(sp.toString());
		if (parseInt(sp) <= parseInt(price)) {
			var itemid = jQuery(this).children("input[name=itemid]").attr("value");
			data = {"submit": "Buy",
				"itemid": itemid,
				"cv": jQuery(this).children("input[name=cv]").attr("value"),
				"vercode": jQuery(this).children("input[name=vercode]").attr("value") };
			var thing = this;
			var count = parseInt(jQuery(thing).parents("tr").children(".sp-table:nth-child(4)").html().replace(/,/, ''));
			var error = 0;
			jQuery("#autobuy-error").html("");
			for(i = 0; count > 0 && error == 0 && i < 50; i++) {
			jQuery.ajax({
				url: jQuery(this).attr("action"),
				data:  data, 
				async: false,
				success: function(data) {
				if (data.toString().match(/Purchase failed./)) {
					jQuery("#autobuy-error").html("Purchase failed :(");
					error++;
				} else if (data.toString().match(/you have too many items in your/)) {
					jQuery("#autobuy-error").html("Too many items in your Inventory :(<br />Empty up a slot and check AutoVault :)");
					error++;
				} else if (data.toString().match(/404.gif/)) {
					error++;
				} else {
					total+=1;
					subSp(sp);
					jQuery("#numbought").html(total);
					if (count > 1) {
						count-=1;
						jQuery(thing).parents("tr").children(".sp-table:nth-child(4)").html(count.toString());
					} else {
						count-=1;
						jQuery(thing).parents("tr").fadeOut();
					}
					if (jQuery("#autovault:checked").length || window.location.href.toString().match(/price/)) {
						console.log("Loading "+itemid+"'s page to move it to the Vault");
						jQuery.ajax({
							url: "http://subeta.net/item.php?n_id="+itemid, 
							async: false,
							success: function(data) {
								console.log("Moving "+itemid+" to the Vault");
								id = jQuery(data).find("a:contains('Move to your Vault')").attr("href").toString().replace(/[^0-9]+/, '');
								jQuery.get("http://subeta.net/item.php?act=movetovault&itemid="+id);
							}
						});
					}
				}
				}
			});
			}
		}
	});
	jQuery("#autobuy").css("background","#6c6");
	if (window.location.href.toString().match(/price/)) {
		window.close();
	}
});
if (window.location.href.toString().match(/price/)) {
	price = window.location.href.toString().replace(/.*price=/, '').replace(/[^0-9]+/, '');
	jQuery("#max-price").val(price);
	jQuery("#autobuy").click();
}
