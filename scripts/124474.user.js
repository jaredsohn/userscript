// ==UserScript==
// @name           sSuite
// @namespace      Jacko and Toni
// @include        *subeta.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://sizzlemctwizzle.com/updater.php?id=124474
// ==/UserScript==

// ****************************
// ****** sSuite Options ******
// ****************************

suite_menu = "<li class='menu-btn' id='menu-btn-suite-css'> \
		<a href='/explore/' class='menu-tab item' role='menuitem' aria-haspopup='true'> \
		<span class='menu-btn-left'>&nbsp;</span>sSuite<sspan class='menu-btn-right'>&nbsp;</span></a> \
		<ul role='menu'> \
			<li><a></a><label>Quests Menu: <input type='checkbox' class='checker' id='questsmenu' /></label></li> \
			<li><a></a><label>Vendors Menu: <input type='checkbox' class='checker' id='vendorsmenu' /></label></li> \
			<li><a></a><label>Pets Menu: <input type='checkbox' class='checker' id='petsmenu' /></label></li> \
			<li><a></a><label>AutoTrainer: <input type='checkbox' class='checker' id='autotrainer' /></label></li> \
			<li><a></a><label>Train: \
				<select id='trainingstat'> \
					<option value='1'>Strength</option> \
					<option value='2'>Defense</option> \
					<option value='3'>Health</option> \
					<option value='5'>Speed</option> \
					<option value='4'>Level</option> \
				</select></label></li> \
			<li><a></a><label>Default Shop: \
				<select id='defaultshop'> \
				</select></label></li> \
			<li><a></a><label>AutoCollecter: <input type='checkbox' class='checker' id='autocollecter' /></label></li> \
			<li><a></a><label>AutoAutoPrice: <input type='checkbox' class='checker' id='autoautoprice' /></label></li> \
			<li><a></a><button id='autorenameshop' >Auto Rename Main Shop</button></li> \
			<li class='bottom'><a></a><button id='autosubeta' >AutoSubeta</button></li> \
		</ul> \
	</li>";
jQuery("#menu-ul").append(suite_menu);

jQuery("#questsmenu").attr("checked",GM_getValue("questsmenu", "false"));
jQuery("#vendorsmenu").attr("checked",GM_getValue("vendorsmenu", "false"));
jQuery("#petsmenu").attr("checked",GM_getValue("petsmenu", "false"));
jQuery("#autotrainer").attr("checked",GM_getValue("autotrainer", "false"));
jQuery("#autocollecter").attr("checked",GM_getValue("autocollecter", "false"));
jQuery("#trainingstat").val(GM_getValue("trainingstat", "4"));
jQuery("#menu-sub-shops li a:first-child").each(function() {
	var shopname = jQuery(this).text();
	var shopid = jQuery(this).attr("href").replace(/.*shopid=/, '').replace(/[^0-9]+/, '');
	jQuery("#defaultshop").append("<option value="+shopid+">"+shopname+"</option>");
});
jQuery("#defaultshop").val(GM_getValue("defaultshop"));
GM_setValue("defaultshop", jQuery("#defaultshop").val());
//jQuery("#autopricebutton").click(function() {
//	autoPrice();
//});
jQuery("#autoautoprice").attr("checked",GM_getValue("autoautoprice", "false"));

jQuery(".checker").change(function() {
	GM_setValue(jQuery(this).attr("id"), jQuery(this).attr("checked"));
});
function toggleMenu(checked, button) {
	if (checked) {
		jQuery(button).show();
	} else {
		jQuery(button).hide();
	}
}
jQuery("#questsmenu").change(function() {
	toggleMenu(jQuery(this).attr("checked"), "#menu-btn-quest-css");
});
jQuery("#vendorsmenu").change(function() {
	toggleMenu(jQuery(this).attr("checked"), "#menu-btn-vendor-css");
});
jQuery("#petsmenu").change(function() {
	toggleMenu(jQuery(this).attr("checked"), "#menu-btn-pet-css");
});
jQuery("#trainingstat").change(function() {
	GM_setValue("trainingstat", jQuery("#trainingstat").val());
});
jQuery("#defaultshop").change(function() {
	GM_setValue("defaultshop", jQuery("#defaultshop").val());
});
jQuery("#autorenameshop").click(function() {
	shopRename();
});
jQuery("#autosubeta").click(function() {
	GM_setValue("autosubeta", 1);
	window.location.href = "http://subeta.net/explore/wizard_quests.php?limit=15000";
});


jQuery("#menu-btn-cs-css > a").html("<span class='menu-btn-left'>&nbsp;</span>cs<span class='menu-btn-right'>&nbsp;</span>");
jQuery("center table tbody tr td.create_ad").parents("center").hide();
jQuery.get("http://subeta.net/ajax.php/events/deletecat?cat=Shop%20Purchases");

// ****************************
// ****** Item Functions ******
// ****************************
 
function new_event(data) {
	var div = jQuery('<div class="bubble-wrap-first"><div class="events-bubble" id="events-bubble-'+data.id+'">'+
                 '<b>'+data.title+'</b>'+data.text+
                 '</div></div>').hide();
	div.appendTo(jQuery('#events-bubble-wrapper'));
	
	div.fadeIn(1000);
	setTimeout(div.fadeOut, 6000);
}

function moveToShop(itemid, shopid) {
	url = "http://subeta.net/item.php?act=addtoshop&itemid="+itemid+"&shopid="+shopid;
	jQuery.ajax({
		url: url,
		async: false,
		success: function(ret) {
			if (jQuery.find(":contains('You do not have that item')", ret).length > 0) {
				GM_setValue("temp", false);
			} else {
				GM_setValue("temp", true);
			}
		}
	});
	return GM_getValue("temp");
}
function moveItem(itemid, where) {
	url = "http://subeta.net/myshop.php";
	data = {};
	data["act"] = "dostock";
	data["shopid"] = GM_getValue("defaultshop");
	data["action["+itemid+"]"] = where;
	jQuery.ajax({
		url: url,
		data: data,
		type: "POST",
		success: function(ret) {
			jQuery(".container_16").html(jQuery(".container_16", ret).html());
		}
	});
}
function moveItems(items, where) {
	url = "http://subeta.net/myshop.php";
	data = {};
	data["act"] = "dostock";
	data["shopid"] = GM_getValue("defaultshop");
	items.each(function(i, itemid) {
		data["action["+itemid+"]"] = where;
	});
	jQuery.ajax({
		url: url,
		data: data,
		type: "POST",
		success: function(ret) {
			jQuery(".container_16").html(jQuery(".container_16", ret).html());
		}
	});
}

function priceItem(itemid, price) {
	url = "http://subeta.net/myshop.php";
	data = {};
	data["act"] = "update";
	data["shopid"] = GM_getValue("defaultshop");
	data["price["+itemid+"]"] = price;
	jQuery.ajax({
		url: url,
		data: data,
		type: "POST",
		success: function(ret) {
			jQuery(".container_16").html(jQuery(".container_16", ret).html());
		}
	});

}

function priceItems(items) {
	url = "http://subeta.net/myshop.php";
	data = {};
	data["act"] = "update";
	data["shopid"] = GM_getValue("defaultshop");
	jQuery(items).each(function(i, item) {
		data["price["+item['id']+"]"] = item['price'];
	});
	jQuery.ajax({
		url: url,
		data: data,
		type: "POST",
		success: function(ret) {
			jQuery(".container_16").html(jQuery(".container_16", ret).html());
		}
	});

}
function autoPrice() {
	url = "http://subeta.net/ushop.php?shopid="+GM_getValue("defaultshop");
	jQuery.ajax({
		url: url, 
		async: false,
		success: function(ret) {
			things = [];
			jQuery("td.sp-sub center center a", ret).each(function(i, thing) { 
				things[i] = parseInt((jQuery(this).text()+".0").match(/[0-9]+/)); 
			});
			count = Math.max.apply(Math, things);
			console.log(count);
			if (things!='') {
				GM_setValue("numofshoppages", count);
			} else {
				GM_setValue("numofshoppages", 1);
			}
		}
	});
	for(i = 0; i < parseInt(GM_getValue("numofshoppages")); i++) {
	jQuery.get(url+"&page="+i, function(ret) {
		items = [];
		jQuery("a label", ret).each(function(i, item) {
			items[i] = [];
			items[i]['name'] = jQuery(item, ret).find("img").attr("id");
			items[i]['id'] = jQuery(item).attr("onmouseover").toString().match(/[0-9]+/);
			url = "http://subeta.net/ushop.php?act=dosearch&itemname="+escape(items[i]['name'])+"&type=shops";
			jQuery.ajax({
				url: url,
				async: false,
				success: function(data) {
					items[i]['price'] = parseInt(jQuery("table.sp-table tr:not(.sp-sub) td.sp-table:nth-child(3)", data).html().toString().replace(/,/g, '').match(/[0-9]+/)) - 1;
					//items[i]['price'] = parseInt(jQuery("table.sp-table tr:not(.sp-sub) td.sp-table:nth-child(3)", data).filter(function(i) { 
					//	return (jQuery(this).siblings("td:first-child").attr("href").match(/[0-9]/) == GM_getValue("defaultshop"));
					//}).html().toString().replace(/,/g, '').match(/[0-9]+/)) - 1;
					if (items[i]['price'] == 0) {
						items[i]['price'] = 1;
					}
				}
			});
		});
		priceItems(items);
	});
	}
}

// ***********************
// ****** AutoTrain ******
// ***********************

if (GM_getValue("autotrainer", false) == true) {
jQuery.ajax({
	url: "http://subeta.net/explore/train.php",
	success: function(ret) {
		jQuery("form:not(#shoutbox)", ret).each(function() {
			petid = jQuery("input[name=petid]", ret).val();
			finishdata = {
				"act": "finish",
				"petid": petid,
			};
			startdata = {
				"act": "dotrain",
				"petid": petid,
				"train_normal": "Train your Pet",
				"stat": GM_getValue("trainingstat", "4")
			};
			jQuery.ajax({
				url: "http://subeta.net/explore/train.php",
				type: "POST",
				data: finishdata,
				success: function(ret) {
					jQuery.ajax({
						url: "http://subeta.net/explore/train.php",
						type: "POST",
						data: startdata
					});
				}
			});
		});
	}
});
function refresh() {
	window.location.reload(true);
}
setTimeout(refresh, 1800000);
}

// *************************
// ****** AutoCollect ******
// *************************

if (GM_getValue("autocollecter", false) == true) {
jQuery("#menu-sub-shops li a:first-child").each(function() {
	var shopid = jQuery(this).attr("href").replace(/.*shopid=/, '').replace(/[^0-9]+/, '');
	var data = { "act": "profits", "collect":"yes" };
	var earned = "";
	jQuery.ajax({ 
		url: "http://subeta.net/myshop.php?act=profits&shopid="+shopid, 
		type: "POST", 
		data: data,
		success: function(data) {
			earned = jQuery("tr td center:contains('You rec')", data).text().toString();
			if (earned != "") {
				new_event({id: 1234, title: "AutoCollect", text: earned});
			}
		}
	});
});

// jQuery.get("http://subeta.net/explore/vaults.php?vault=bank&act=collect");
}

// ***********************
// ****** QuestMenu ******
// ***********************

function questsleft(thing, url) {
	times = "";
	jQuery.get(url, function(ret) {
		if (jQuery("center:contains('You have already played the maximum')", ret).length > 0) {
			times = "0";
		} else {
			ar = jQuery("form center:contains('Plays:')", ret).text().match(/[0-9]+/g);
			times = parseInt(ar[1]) - parseInt(ar[0]);
		}
		jQuery(thing).append(" ("+times+")");
	});
	return times;
}

quest_menu = "<li class='menu-btn' id='menu-btn-quest-css'> \
		<a href='/explore/' class='menu-tab item' role='menuitem' aria-haspopup='true'> \
		<span class='menu-btn-left'>&nbsp;</span>quests<span class='menu-btn-right'>&nbsp;</span></a> \
		<ul role='menu'> \
			<li><a href='/explore/saggitarius.php'>Saggitarius</a></li> \
			<li><a href='/explore/opp.php'>Cursed</a></li> \
			<li><a href='/explore/wizard_quests.php'>Wizard</a></li> \
			<li><a href='/explore/maleria.php'>Maleria</a></li> \
			<li><a href='/explore/quest_computer.php'>Computer Geek</a></li> \
			<li><a href='/games/gravequests.php'>Graveyard</a></li> \
			<li class='bottom'><a href='/games/library.php'>Library</a></li> \
		</ul> \
	</li>";
jQuery("#menu-ul").append(quest_menu);
jQuery("#menu-ul #menu-btn-quest-css li a").each(function() {
	questsleft(this, "http://subeta.net"+jQuery(this).attr("href"));
});
if (GM_getValue("questsmenu") == false) {
	jQuery("#menu-btn-quest-css").hide();
}

// ************************
// ****** VendorMenu ******
// ************************

vendor_menu = "<li class='menu-btn' id='menu-btn-vendor-css'> \
		<a href='/explore/' class='menu-tab item' role='menuitem' aria-haspopup='true'> \
		<span class='menu-btn-left'>&nbsp;</span>vendors<span class='menu-btn-right'>&nbsp;</span></a> \
		<ul role='menu'> \
			<li><a href='/explore/frosty_claw.php'>Frosty Claw</a></li> \
			<li><a href='/explore/ocean_depth.php'>Ocean Depth</a></li> \
			<li><a href='/explore/blue_moon.php'>Blue Moon</a></li> \
			<li><a href='/explore/grave_digger.php'>Grave Digger</a></li> \
			<li><a href='/explore/burning_chance.php'>Burning Chance</a></li> \
			<li><a href='/explore/celebration_gift.php'>Celebration Gift</a></li> \
			<li><a href='/explore/prize_get.php'>Prize Get</a></li> \
			<li><a href='/explore/blue_sky.php'>Blue Sky</a></li> \
			<li><a href='/explore/shining_crane.php'>Shining Crane</a></li> \
			<li class='bottom'><a href='/explore/dragons_hoard.php'>Dragon's Hoard</a></li> \
		</ul> \
	</li>";
jQuery("#menu-ul").append(vendor_menu);
if (GM_getValue("vendorsmenu") == false) {
	jQuery("#menu-btn-vendor-css").hide();
}

// *********************
// ****** PetMenu ******
// *********************

vendor_menu = "<li class='menu-btn' id='menu-btn-pet-css'> \
		<a href='/explore/' class='menu-tab item' role='menuitem' aria-haspopup='true'> \
		<span class='menu-btn-left'>&nbsp;</span>pets<span class='menu-btn-right'>&nbsp;</span></a> \
		<ul role='menu'> \
			<li><a href='/explore/train.php'>Training Center</a></li> \
			<li class='bottom'><a href='/explore/dragons_hoard.php'>Dragon's Hoard</a></li> \
		</ul> \
	</li>";
jQuery("#menu-ul").append(vendor_menu);
if (GM_getValue("petsmenu") == false) {
	jQuery("#menu-btn-pet-css").hide();
}

// *********************
// ****** AutoBuy ******
// *********************

if (window.location.href.match(/ushop/) != null) {

jQuery("table.sp-table[width=75%]").before("Max sP: <input type='text' id='max-price' /> \
	AutoVault: <input type='checkbox' id='autovault' /> \
	<input type='submit' id='autobuy' class='small awesome default' value='AutoBuy' /> \
	<style> \
		#autobuy:hover {  \
			cursor: pointer; \
			background: #7d7!important; \
		} \
	</style>");

jQuery("#notice").html("<div id='autobuy-error'></div><br />Total purchased: <span id='numbought'>0</span>");

function subSp(n) {
	sp = jQuery("p:contains('sP: ') a.widget-login-sp").html().replace(/,/g, '');
	sp = parseInt(sp) - parseInt(n);
	jQuery("a[href='/explore/vaults.php?vault=bank']").html(sp.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ","));
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
			var count = parseInt(jQuery(thing).parents("tr").children(".sp-table:nth-child(4)").html().replace(/,/g, ''));
			var error = 0;
			jQuery("#autobuy-error").html("");
			for(i = 0; count > 0 && error == 0 && i < 200; i++) {
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
						jQuery(thing).parents("tr").hide();
					}
					if (jQuery("#autovault:checked").length > 0 || window.location.href.toString().match(/price/) != null) {
						// moveItem(itemid, "vault"); 
						/* jQuery.ajax({
							url: "http://subeta.net/item.php?n_id="+itemid, 
							success: function(data) {
								id = jQuery(data).find("a:contains('Move to your Vault')").attr("href").toString().replace(/[^0-9]+/, '');
								jQuery.get("http://subeta.net/item.php?act=movetovault&itemid="+id);
							}
						}); */
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
prices = [];
pricesum = 0;
a = 0;
jQuery("table.sp-table tr:not('.sp-sub') td.sp-table:nth-child(3)").each(function(i, thing) {
	var price = parseInt(jQuery(thing).html().replace(/,/g, "").match(/[0-9]+/));
	var count = parseInt(jQuery(thing).next().html().replace(/,/g, "").match(/[0-9]+/));
	for (i = 0; i < count; i++) {
		prices[a] = price;
		pricesum += price;
		a++;
	}

});
priceaveg = (pricesum / prices.length);
pricemed = prices[parseInt(prices.length/4)]

string = "<div style='overflow: scroll'><div style='width: "+(prices.length)+"px;'>";
for (i = 0; i < prices.length; i++) {
	string += "<div style='display: inline-block; background: rgba(0,0,0,.5); width: 1px; height: "+parseInt(prices[i] / prices[prices.length-1] * 200)+"px'></div>";
}
string += "<div style='width: "+(prices.length)+"px; height: "+parseInt(priceaveg / prices[prices.length-1] * 200)+"px; positon: absolute; background: rgba(256,0,0,.2); margin-top: -"+parseInt(priceaveg / prices[prices.length - 1] * 200)+"px'>mean: "+parseInt(priceaveg)+" sP</div>";
string += "<div style='width: "+(prices.length)+"px; height: "+parseInt(pricemed / prices[prices.length-1] * 200)+"px; positon: absolute; background: rgba(0,0,256,.2); margin-top: -"+parseInt(pricemed / prices[prices.length - 1] * 200)+"px'>median: "+pricemed+" sP</div>";
string += "</div></div>";
jQuery("#notice").after(string);

}

// **********************
// ****** AutoFrag ******
// **********************

if (window.location.href.match(/fragmentizer/) != null) {

jQuery("div[style='width:500px;text-align:left;']").prepend("<br /><button id='dofrag'>Frag all Items</button>");

function frag() {
	jQuery("div[style='float: left; display: inline; width: 100px'] a:nth-child(1)").each(function() { 
		var url_go = jQuery(this).attr("href");
		var success = 1;
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

jQuery("#dofrag").click(function() {
	frag();
});

}

// ***********************
// ****** AutoBeast ******
// ***********************

if (window.location.href.match(/recycle/) != null) {

jQuery(".container_16 > center:nth-child(4)").prepend("<button id='autobuyall'>AutoBuy all Items</button> (lots of new windows)");
if (window.location.href.match(/price/) == null) {
	jQuery(".container_16 > center:nth-child(4)").prepend("Max Price: <input id='maxprice' />");
} 

jQuery("td.sp-table").each(function() {
	item = jQuery(this).text().replace(/You have.+/, '');
	href = "http://subeta.net/ushop.php?act=dosearch&itemname="+item.replace(/ /g, '+')+"&type=shops";
	if (window.location.href.toString().match(/price=/) != null) {
		price = window.location.href.toString().replace(/.*price=/, '').replace(/[^0-9]+/, '');
		tag = "&price="+price;
	} else {
		tag = "";
	}
	jQuery(this).find("b").after(" <a href='"+href+tag+"' class='endofall'><img src='http://images.subeta.net/shop_norm.gif' width='20' /></a>");
});

jQuery("#autobuyall").click(function() {
	jQuery(".endofall").each(function() {
		href = jQuery(this).attr("href");
		if (jQuery("#maxprice").val() != "") {
			href += "&price=" + jQuery("#maxprice").val();
		}
		GM_openInTab(href);
	});
});

}

// ***********************
// ****** AutoPrice ******
// ***********************

function autoAutoPrice() {
	jQuery("#autopricebutton").click();
}
if (window.location.href.match(/myshop/) != null && window.location.href.match(/act/) == null) {
if (GM_getValue("autoautoprice", false)) {
	setTimeout(autoAutoPrice, 1000*60*20);
}

jQuery(".container_16").prepend("<center><button id='autoprice' class='small awesome default'>AutoPrice All Items on this page</button></center><br /> \
				<center><button id='autopricebutton' class='small awesome default'>AutoPrice All Items</button> (experimental) </center>");
jQuery("#autoprice").css("background", "#77cc77");
jQuery("#autopricebutton").click(function() {
	things = [];
	jQuery("td.sp-sub center center a").each(function(i, thing) { 
		things[i] = parseInt((jQuery(this).text()+".0").match(/[0-9]+/)); 
	});
	if (things == "") {
		GM_setValue("totalshoppages", 1);
	} else {
		GM_setValue("totalshoppages", Math.max.apply(Math, things));
	}
	GM_setValue("currentshoppage", 1);
	window.location.href += "&page=1";
});
jQuery("#autoprice").click(function() {
	jQuery("#autoprice").css("background", "#7777cc");
	jQuery("table.sp-table tr td.sp-table:nth-child(3) center").each(function() {
		var href = "http://subeta.net/ushop.php?act=dosearch&itemname="+escape(jQuery(this).html().toString())+"&type=shops";
		var thing = this;
		jQuery.ajax({
			url: href,
			async: false,
			success: function(data) {
				var price = jQuery("table.sp-table tr:not('.sp-sub, :contains('"+GM_getValue('defaultshopname')+"')') td.sp-table:nth-child(3)", data).html();
				if (price == null) {
					price = "0 sp";
				}
				jQuery(thing).parents("tr").find("td.sp-table:nth-child(5)").prepend("<a href='"+href+"'>Set your price below "+price+"</a>");
				p = parseInt(price.toString().replace(/,/g, '').replace(/[^0-9]+/, '')) - 1;
				if (p < 1) {
					p++;
				}
				jQuery(thing).parents("tr").find("td.sp-table:nth-child(5) input").val(p);
			}
		});
	});
	if (GM_getValue("currentshoppage") <= GM_getValue("totalshoppages")) {
		GM_setValue("currentshoppage", GM_getValue("currentshoppage") + 1);
		jQuery("input[value='Process Prices and Removals']").click();
	}
	jQuery("#autoprice").css("background", "#77cc77");
	shopRename();
});
if (GM_getValue("currentshoppage") <= GM_getValue("totalshoppages")) {
	if (parseInt(window.location.href.replace(/.*page=/, '').match(/[0-9]+/)) != GM_getValue("currentshoppage")) {
		tag = "&page="+GM_getValue("currentshoppage");
		window.location.href = window.location.href.replace(/&page=[0-9]+/, tag)+tag;
	} else {
		jQuery("#autoprice").click();
	}
}

}

// ***********************
// ****** AutoQuest ******
// ***********************

if (window.location.href.match(/saggit/) != null ||
	window.location.href.match(/saggit/) != null ||
	window.location.href.match(/opp/) != null ||
	window.location.href.match(/wizard_quests/) != null ||
	window.location.href.match(/maleria/) != null ||
	window.location.href.match(/quest_computer/) != null ||
	window.location.href.match(/gravequests/) != null ||
	window.location.href.match(/shining_crane/) != null ||
	window.location.href.match(/foodquest/) != null ||
	window.location.href.match(/library/) != null) {
	
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

jQuery(".container_16 form").before("<br/>Max Item Price: <input id='maxprice' /> <button id='startautoquest'>Start Auto Questing</button>");

if (window.location.href.toString().match(/limit/) != null) {
while (jQuery("form[onsubmit='submitonce(this)']").length > 0) {
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
				async: false,
				success: function(ret) {
					if (jQuery("table.sp-table tr:not(':contains('"+GM_getValue("defaultshopname")+"')') td.sp-table:nth-child(3)", ret).length != 0) {
						price = parseInt(jQuery("table.sp-table tr:not(':contains('"+GM_getValue("defaultshopname")+"')') td.sp-table:nth-child(3)", ret).html().toString().replace(/,/g, '').replace(/[^0-9]+/, ''));
						if (price <= window.location.href.toString().replace(/.*limit=/, '').replace(/[^0-9]+/g, '')) {
							form = jQuery("table.sp-table tr:not(':contains('"+GM_getValue("defaultshopname")+"')') td.sp-table:nth-child(5) form", ret);
							url = jQuery(form).attr("action");
							data = {
								"submit": "Buy",
								"itemid": jQuery(form).find("input[name=itemid]").attr("value"),
								"cv": jQuery(form).find("input[name=cv]").attr("value"),
								"vercode": jQuery(form).find("input[name=vercode]").attr("value")
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
				jQuery.ajax({
					url: window.location.href, 
					async: false, 
					success: function(ret) {
						jQuery(".container_16").html(jQuery(".container_16", ret));
					}
				});
			},
			async: false
		});
	}
}
}

jQuery("#startautoquest").click(function() {
	limit = parseInt(jQuery("#maxprice").val());
	if (limit > 0) {
		window.location.href = window.location.href+"?limit="+limit;
	}
});

}

// **********************
// ****** AutoVend ******
// **********************

if (window.location.href.match(/frosty_claw/) != null ||
	window.location.href.match(/ocean_depth/) != null ||
	window.location.href.match(/blue_moon/) != null ||
	window.location.href.match(/grave_digger/) != null ||
	window.location.href.match(/burning_chance/) != null ||
	window.location.href.match(/celebration_gift/) != null ||
	window.location.href.match(/prize_get/) != null ||
	window.location.href.match(/blue_sky/) != null ||
	window.location.href.match(/dragons_hoard/) != null) {
keep = 0;
while (keep == 0) {
	var urlo = window.location.href+jQuery("#bottom a").attr("href");

	jQuery.ajax({
		url: urlo,
		async: false,
		success: function(data) {
			jQuery(".container_16").html(jQuery(".container_16", data));
		}
	});
	keep = jQuery(":contains('purchase that!')").length;
	jQuery.ajax({
		url: window.location.href,
		async: false,
		success: function(data) {
			jQuery(".container_16").html(jQuery(".container_16", data));
		}
	});
	console.log(jQuery(".container_16").text());
}

}

// ************************
// ****** Inventory+ ******
// ************************

if (window.location.href.match(/item/) != null ||
	window.location.href.match(/inventory/) != null) {

jQuery("td.sp-table a:contains('Send to a Buddy')").after("<button id='send-all' style='width:auto;display:block;'>Send all to Buddy</div>");

jQuery(".item_show").each(function() {
	jQuery(this).prepend("<input type='checkbox' class='sendtobuddy' />");
	item = jQuery(this).html().replace(/<[sb].*[nb]>/g,'').replace(/<[^>]+>/g,'').replace(/x/, '').replace(/ /g, '+');
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

}

// ***********************
// ****** AutoBones ******
// ***********************

if (window.location.href.match(/bones/) != null) {

// (x-1)%4=y

}

// ************************
// ****** AutoBattle ******
// ************************

if (window.location.href.match(/battle/) != null) {
/*while (jQuery("h2:contains('Game Over')").length > 0) {
	data = {
		"act": "submit_turn",
		"item_choices[]": "147083",
		"submit": "Make Your Turn"
	}
	jQuery.ajax({
		url: window.location.href,
		type: "POST",
		data: data,
		async: false,
		success: function(ret) {
			jQuery(".container_16").html(jQuery(".container_16", ret).html());
		}
	});
} */
}

// *********************************
// ****** AutoShopNameChanger ******
// *********************************

function shopName() {
	names = ["here is some stuff",
		 "Jacks Things",
		 "The Shop of All Stuff",
		 "Marcys Items",
		 "Lovely Things",
		 "The WAY TO GO Shop",
		 "Cats are people too",
		 "Which way is up again",
		 "The fourteenth cat",
		 "cats4ever",
		 "Awesomeawesome",
		 "what's in a name",
		 "bestever",
		 "childhood memories",
		 "afraid to love",
		 "common causality",
		 "For Sale and Stuff",
		 "How to love someone",
		 "How to sell things"];
	name = names[Math.floor(Math.random() * names.length)];
	return name;

}

function shopRename() {
	name = shopName();
	data = {
		"shopid": GM_getValue("defaultshop"),
		"act": "editshop",
		"doshopedit": "yes",
		"shopname": name,
		"type": "1"
	};
	GM_setValue("defaultshopname", name);
	jQuery.ajax({
		url: "http://subeta.net/myshop.php?shopid=288514&act=editshop",
		data: data,
		type: "POST",
		success: function(data) {
			GM_setValue("defaultshopname", name);
			jQuery("#notice").append("Shop now named \""+name+"\"");
		}
	});
}

// ************************
// ****** AutoSubeta ******
// ************************

if (GM_getValue("autosubeta", 0) > 0) {

switch(GM_getValue("autosubeta", 0)) {
	case 1:
		if (window.location.href != "http://subeta.net/explore/wizard_quests.php?limit=15000") {
			window.location.href = "http://subeta.net/explore/wizard_quests.php?limit=15000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 2);
		}
	case 2:
		if (window.location.href != "http://subeta.net/explore/saggitarius.php?limit=15000") {
			window.location.href = "http://subeta.net/explore/saggitarius.php?limit=15000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 3);
		}
	case 3:
		if (window.location.href != "http://subeta.net/games/library.php?limit=5000") {
			window.location.href = "http://subeta.net/games/library.php?limit=5000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 4);
		}
	case 4:
		if (window.location.href != "http://subeta.net/explore/opp.php?limit=5000") {
			window.location.href = "http://subeta.net/explore/opp.php?limit=5000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 5);
		}
	case 5:
		if (window.location.href != "http://subeta.net/explore/maleria.php?limit=5000") {
			window.location.href = "http://subeta.net/explore/maleria.php?limit=5000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 6);
		}
	case 6:
		if (window.location.href != "http://subeta.net/explore/quest_computer.php?limit=5000") {
			window.location.href = "http://subeta.net/explore/quest_computer.php?limit=5000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 7);
		}
	case 7:
		if (window.location.href != "http://subeta.net/games/gravequests.php?limit=5000") {
			window.location.href = "http://subeta.net/games/gravequests.php?limit=5000";
			break;
		}
		if (jQuery(":contains('You have already played the')").length > 0) {
			GM_setValue("autosubeta", 8);
		}
	case 8:
		if (window.location.href != "http://subeta.net/explore/wizard_exchange.php") {
			window.location.href = "http://subeta.net/explore/wizard_exchange.php";
			break;
		}
		if (jQuery(":contains('It seems that you don')").length == 0) {
			jQuery.ajax({
				url: "http://subeta.net/explore/wizard_exchange.php",
				type: "POST",
				data: { "submit": "Exchange your tokens automatically!",
					"act": "exchange" }
			});
		} else {
			GM_setValue("autosubeta", 9);
		}
	case 9:
		if (window.location.href != "http://subeta.net/myshop.php?shopid="+GM_getValue("defaultshop")+"&act=quickstock") {
			window.location.href = "http://subeta.net/myshop.php?shopid="+GM_getValue("defaultshop")+"&act=quickstock";
			break;
		}
		if (jQuery("center:contains('No items on hand')").length == 0) {
			jQuery("input#shop").attr("checked", true);
			jQuery("input[value=Stock]").click();
			break;
		} else {
			GM_setValue("autosubeta", 10);
		}
	case 10:
		if (window.location.href != "http://subeta.net/explore/prize_get.php") {
			window.location.href = "http://subeta.net/explore/prize_get.php";
			break;
		}
		GM_setValue("autosubeta", 11);
	case 11:
		if (window.location.href != "http://subeta.net/myshop.php?shopid="+GM_getValue("defaultshop")+"&act=quickstock") {
			window.location.href = "http://subeta.net/myshop.php?shopid="+GM_getValue("defaultshop")+"&act=quickstock";
			break;
		}
		if (jQuery("center:contains('No items on hand')").length == 0) {
			jQuery("input#shop").attr("checked", true);
			jQuery("input[value=Stock]").click();
			break;
		} else {
			GM_setValue("autosubeta", 0);
			window.location.href = "http://subeta.net/myshop.php?shopid="+GM_getValue("defaultshop");
		}
		
}

}

// **************************
// ****** AutoWishlist ******
// **************************

if (window.location.href.match(/wishlists/) != null) {

jQuery("a:contains('Shops')").each(function(i, thing) {
	jQuery.ajax({
		url: jQuery(thing).attr("href"),
		success: function(ret) {
			if (jQuery(":contains('There are none of that item in the shops!')", ret).length > 0) {
				jQuery(thing).hide();
			}
			console.log(jQuery(thing).attr("href"));
		}
	});
});

}
