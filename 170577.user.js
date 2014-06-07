// ==UserScript==
// @name           Enhanced Steam
// @description    Makes Steam site epic
// @version        2013.5.12
// @author         Enhancedsteam
// @homepage       http://userscripts.org/scripts/show/170577
// @icon           http://www.enhancedsteam.com/images/logo.png
// @include *.steampowered.com/*
// @include *steamcommunity.com/*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function() { main(window.jQuery); }, false);

function main($) {

	var apps;
	var appid_promises = {};

	// Session storage functions.
	function setValue(key, value) {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}

	function getValue(key) {
		var v = window.sessionStorage.getItem(key);
		if (v === undefined) return v;
		return JSON.parse(v);
	}

	// Helper prototypes
	String.prototype.startsWith = function(prefix) {
		return this.indexOf(prefix) === 0;
	};

	Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "$";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var number = this,
			negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	};

	// DOM helpers
	function xpath_each(xpath, callback) {
		var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var node;
		for (var i = 0; i < res.snapshotLength; ++i) {
			node = res.snapshotItem(i);
			callback(node);
		}
	}

	function get_http(url, callback) {
		var http = new window.XMLHttpRequest();
		http.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				callback(this.responseText);
			}
		};
		http.open('GET', url, true);
		http.send(null);
	}

	function get_appid(t) {
		if (t && t.match(/(?:store\.steampowered|steamcommunity)\.com\/app\/(\d+)\/?/)) return RegExp.$1;
		else return null;
	}

	function get_subid(t) {
		if (t && t.match(/(?:store\.steampowered|steamcommunity)\.com\/sub\/(\d+)\/?/)) return RegExp.$1;
		else return null;
	}

	function get_appid_wishlist(t) {
		if (t && t.match(/game_(\d+)/)) return RegExp.$1;
		else return null;
	}

	function get_groupname(t) {
		if (t && t.match(/steamcommunity\.com\/groups\/(\S+)/)) return RegExp.$1;
		else return null;
	}

	function xpath_each(xpath, callback) {
		var res = document.evaluate(xpath, document, null, window.XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var node;
		for (var i = 0; i < res.snapshotLength; ++i) {
			node = res.snapshotItem(i);
			callback(node);
		}
	}

	function ensure_appid_deferred(appid) {
		if (!appid_promises[appid]) {
			var deferred = new $.Deferred();
			appid_promises[appid] = {
				"resolve": deferred.resolve,
				"promise": deferred.promise()
			};
		}
	}

	// colors the tile for owned games
	function highlight_owned(node) {
		highlight_node(node, "#5c7836");  
	}

	// colors the tile for wishlist games
	function highlight_wishlist(node) {
		highlight_node(node, "#496e93");
	}

	function highlight_node(node, color) {
		var $node = $(node);
		// Carousel item
		if (node.classList.contains("cluster_capsule")) {
			$node = $(node).find(".main_cap_content");
		}
		
		// Genre Carousel items
		if (node.classList.contains("large_cap")) {
			$node = $(node).find(".large_cap_content");
		}
		
		$node.css("backgroundImage", "none");
		$node.css("backgroundColor", color);

		// Set text color to not conflict with highlight.
		if (node.classList.contains("tab_row")) $node.find(".tab_desc").css("color", "lightgrey");
		if (node.classList.contains("search_result_row")) $node.find(".search_name").css("color", "lightgrey");
	}

	function add_empty_wishlist_button() {
		var profile = $(".playerAvatar a")[0].href.replace("http://steamcommunity.com", "");
		if (window.location.pathname.startsWith(profile)) {
			var empty_button = $("<div class='btn_save' style='border-color:red'><a>Empty Wishlist</a></div>");
			empty_button.click(empty_wishlist);
			$("#games_list_container").after(empty_button);
		}
	}

	function empty_wishlist() {
		var conf = confirm("Are you sure you want to empty your wishlist?\n\nThis action cannot be undone!");
		if (conf) {
			var deferreds = $(".wishlistRow").map(function(i, $obj) {
				var deferred = new $.Deferred();
				var appid = get_appid_wishlist($obj.id),
					http = new XMLHttpRequest(),
					profile = $(".playerAvatar a")[0].href.replace("http://steamcommunity.com/", "");

				http.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						deferred.resolve();
					}
				};
				http.open('POST', "http://steamcommunity.com/" + profile + "/wishlist/", true);
				http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				http.send("action=remove&appid=" + encodeURIComponent(appid));

				return deferred.promise();
			});

			$.when.apply(null, deferreds).done(function(){
				location.reload();
			});
		}
	}

	// adds "empty cart" button at checkout
	function add_empty_cart_button() {
		if (document.URL.indexOf("store.steampowered.com/cart/") >= 0) {    
			addtext = "<a href='javascript:document.cookie=\"shoppingCartGID=0; path=/\";window.location.reload();' class='btn_checkout_blue' style='float: left; margin-top: 14px;'><div class='leftcap'></div><div class='rightcap'></div>Empty Cart</a>";
		
			var loc = 0;	
			xpath_each("//div[contains(@class,'checkout_content')]", function (node) {		
				loc = loc + 1;
				if (loc == 2) { node.insertAdjacentHTML('afterbegin', addtext); }
			});
		} 
	}

	// Adds a link to options to the global menu (where is Install Steam button)
	function add_enhanced_steam_options() {
		$dropdown = $("<span class=\"pulldown\" id=\"account_pulldown\">Enhanced Steam</span>");
		$dropdown_options_container = $("<div class=\"popup_block\"><div class=\"popup_body popup_menu\"></div></div>");
		$dropdown_options = $dropdown_options_container.find(".popup_body");
		$dropdown_options.css("display", "none");

		$dropdown.click(function(){
			if ($dropdown_options.css("display") === "none") {
				$dropdown_options.css("display", "");
			}
			else {
				$dropdown_options.css("display", "none");
			}
		});

		$options_link = $("<a class=\"popup_menu_item\" target=\"_blank\" href=\"about:addons\">Options</a>");
		$website_link = $("<a class=\"popup_menu_item\" target=\"_blank\" href=\"http://www.enhancedsteam.com\">Website</a>");
		$contribute_link = $("<a class=\"popup_menu_item\" target=\"_blank\" href=\"//github.com/jshackles/Enhanced_Steam\">Contribute (Github)</a>");
		$donation_link = $("<a class=\"popup_menu_item\" target=\"_blank\" href=\"//enhancedsteam.com/donate.php\">Donate</a>");

		$clear_cache_link = $("<a class=\"popup_menu_item\" href=\"\">Clear Cached Data</a>");
		$clear_cache_link.click(function(){
			window.localStorage.clear();
			sessionStorage.clear();
			location.reload();
		});

		$spacer = $("<div class=\"hr\"></div>");

		$dropdown_options.append($clear_cache_link);
		$dropdown_options.append($spacer);
		$dropdown_options.append($website_link);
		$dropdown_options.append($contribute_link);
		$dropdown_options.append($donation_link);

		$("#global_action_menu")
			.before($dropdown)
			.before($dropdown_options_container);
	}

	// Adds a link to SPUF to the top menu
	function add_spuf_link() {
		var supernav_content = document.querySelectorAll("#supernav .supernav_content");
		document.querySelectorAll("#supernav .supernav_content")[supernav_content.length - 2].innerHTML = document.querySelectorAll("#supernav .supernav_content")[supernav_content.length - 2].innerHTML.replace(
			'<a class="submenuitem" href="http://steamcommunity.com/workshop/">',
			'<a class="submenuitem" href="http://forums.steampowered.com/forums/" target="_blank">Forums</a><a class="submenuitem" href="http://steamcommunity.com/workshop/">'
		);
	}

	// Removes the "Install Steam" button at the top of each page
	function remove_install_steam_button() {
		$('div.header_installsteam_btn').replaceWith('');
	}

	// User profile pages
	function add_community_profile_links() {
		var steamID = document.getElementsByName("abuseID")[0].value;

		if (document.getElementById("rightActionBlock") !== null) {
			var htmlstr = '<hr>';
			htmlstr += '<div class="actionItemIcon"><a href="http://www.steamgifts.com/user/id/' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/steamgifts.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://www.steamgifts.com/user/id/' + steamID + '" target="_blank">SteamGifts</a></div>'; 
			htmlstr += '<div class="actionItemIcon"><a href="http://www.steamtrades.com/user/id/' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/steamtrades.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://www.steamtrades.com/user/id/' + steamID + '" target="_blank">SteamTrades</a></div>'; 
			htmlstr += '<div class="actionItemIcon"><a href="http://steamrep.com/profiles/' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/steamrep.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://steamrep.com/profiles/' + steamID + '" target="_blank">SteamRep</a></div>';
			htmlstr += '<div class="actionItemIcon"><a href="http://wastedonsteam.com/id/' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/wastedonsteam.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://wastedonsteam.com/id/' + steamID + '" target="_blank">Wasted On Steam</a></div>';
			htmlstr += '<div class="actionItemIcon"><a href="http://sapi.techieanalyst.net/?page=profile&id=' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/sapi.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://sapi.techieanalyst.net/?page=profile&id=' + steamID + '" target="_blank">sAPI</a></div>';
			htmlstr += '<div class="actionItemIcon"><a href="http://backpack.tf/profiles/' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/backpacktf.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://backpack.tf/profiles/' + steamID + '" target="_blank">backpack.tf</a></div>';
			htmlstr += '<div class="actionItemIcon"><a href="http://www.achievementstats.com/index.php?action=profile&playerId=' + steamID + '" target="_blank"><img src="http://www.enhancedsteam.com/firefox/ico/achievementstats.ico" width="16" height="16" border="0" /></a></div><div class="actionItem"><a class="linkActionMinor" href="http://www.achievementstats.com/index.php?action=profile&playerId=' + steamID + '" target="_blank">Achievement Stats</a></div>';

			if (htmlstr != '<hr>') { document.getElementById("rightActionBlock").insertAdjacentHTML('beforeend', htmlstr); }
		} else {
			var htmlstr = '';
			htmlstr += '<div class="profile_count_link"><a href="http://www.steamgifts.com/user/id/' + steamID + '" target="_blank"><span class="count_link_label">SteamGifts</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/steamgifts.ico" width="24" height="24" border="0" /></a></div>';
			htmlstr += '<div class="profile_count_link"><a href="http://www.steamtrades.com/user/id/' + steamID + '" target="_blank"><span class="count_link_label">SteamTrades</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/steamtrades.ico" width="24" height="24" border="0" /></a></div>';
			htmlstr += '<div class="profile_count_link"><a href="http://steamrep.com/profiles/' + steamID + '" target="_blank"><span class="count_link_label">SteamRep</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/steamrep.ico" width="24" height="24" border="0" /></a></div>';
			htmlstr += '<div class="profile_count_link"><a href="http://wastedonsteam.com/id/' + steamID + '" target="_blank"><span class="count_link_label">Wasted On Steam</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/wastedonsteam.ico" width="24" height="24" border="0" /></a></div>';
			htmlstr += '<div class="profile_count_link"><a href="http://sapi.techieanalyst.net/?page=profile&id=' + steamID + '" target="_blank"><span class="count_link_label">sAPI</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/sapi.ico" width="24" height="24" border="0" /></a></div>';
			htmlstr += '<div class="profile_count_link"><a href="http://backpack.tf/profiles/' + steamID + '" target="_blank"><span class="count_link_label">backpack.tf</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/backpacktf.ico" width="24" height="24" border="0" /></a></div>';
			htmlstr += '<div class="profile_count_link"><a href="http://www.achievementstats.com/index.php?action=profile&playerId=' + steamID + '" target="_blank"><span class="count_link_label">Achievement Stats</span>&nbsp;<img src="http://www.enhancedsteam.com/firefox/ico/achievementstats.ico" width="24" height="24" border="0" /></a></div>';

			if (htmlstr != '') { $(".profile_item_links").append(htmlstr); }
		}
	}

	// fixes "Image not found" in wishlist
	function fix_wishlist_image_not_found() {
		var items = document.getElementById("wishlist_items");
		if (items) {
				imgs = items.getElementsByTagName("img");
				for (var i = 0; i < imgs.length; i++)
				if (imgs[i].src == "http://media.steampowered.com/steamcommunity/public/images/avatars/33/338200c5d6c4d9bdcf6632642a2aeb591fb8a5c2.gif") {
						var gameurl = imgs[i].parentNode.href;
						imgs[i].src = "http://cdn.steampowered.com/v/gfx/apps/" + gameurl.substring(gameurl.lastIndexOf("/") + 1) + "/header.jpg";
				}
		}
	}

	function show_pricing_history(appid, type) {
		storestring = "steam,amazonus,impulse,gamersgate,greenmangaming,gamefly,origin,uplay,indiegalastore,gametap,gamesplanet,getgames,desura,gog,dotemu,beamdog,adventureshop,nuuvem,shinyloot,dlgamer,";

		// Get country code from Steam cookie
		var cookies = document.cookie;
		var matched = cookies.match(/fakeCC=([a-z]{2})/i);
		var cc = "us";
		if (matched != null && matched.length == 2) {
			cc = matched[1];
		} else {
			matched = cookies.match(/steamCC(?:_\d+){4}=([a-z]{2})/i);
			if (matched != null && matched.length == 2) {
				cc = matched[1];
			}
		}
				
		get_http("http://www.enhancedsteam.com/gamedata/price.php?search=" + type + "/" + appid + "&region=us&stores=" + storestring + "&cc=" + cc, function (txt) {
			document.getElementById('game_area_purchase').insertAdjacentHTML('afterbegin', txt);
		});
	}
	 
	// adds wsgf certifications
	function add_widescreen_certification(appid) {
		if (document.URL.indexOf("store.steampowered.com/app/") >= 0) {    
			if (document.body.innerHTML.indexOf("<p>Requires the base game <a href=") <= 0) { 
				// check to see if game data exists
				get_http("http://www.enhancedsteam.com/gamedata/wsgf.php?appid=" + appid, function (txt) {
					found = 0;
					xpath_each("//div[contains(@class,'game_details')]", function (node) {
						if (found == 0) {						
							node.insertAdjacentHTML('afterend', txt);
							found = 1;
						}
					});
				});	
			}	
		}
	}

	// adds metacritic user score
	function add_metracritic_userscore() {			
		var metahtml = document.getElementById("game_area_metascore");
		var metauserscore = 0;
		if (metahtml) {
			var metalink = document.getElementById("game_area_metalink");
			meta = metalink.getElementsByTagName("a");
			for (var i = 0; i < meta.length; i++)
			var meta_real_link = meta[i].href;
			get_http("http://www.enhancedsteam.com/gamedata/metacritic.php?mcurl=" + meta_real_link, function (txt) {
				metauserscore = txt;
				metauserscore = metauserscore.replace(".","");		
				var newmeta = '<div id="game_area_metascore" style="background-image: url(http://www.enhancedsteam.com/firefox/metacritic_user_bg.png);">' + metauserscore + '</div>';
				metahtml.insertAdjacentHTML('afterend', newmeta);
			});
		}
	}

	function subscription_savings_check() {
		var not_owned_games_prices = 0,
			appid_info_deferreds = [],
			sub_apps = [],
			sub_app_prices = {},
			comma,
			currency_symbol;

		// For each app, load its info.
		$.each($(".tab_row"), function (i, node) {
			var appid = get_appid(node.querySelector("a").href),
				// Remove children, leaving only text (price or only discounted price, if there are discounts)
				price_container = $(node).find(".tab_price").children().remove().end().text().trim();

			if (price_container !== "N/A")
			{
				itemPrice = parseFloat(price_container.match(/([0-9]+(?:(?:\,|\.)[0-9]+)?)/)[1].replace(",", "."));
				if (!currency_symbol) currency_symbol = price_container.match(/(?:R\$|\$|�|�|p??)/)[0];
				if (!comma) comma = (price_container.indexOf(",") > -1);
			}
			else {
				itemPrice = 0;
			}

			// Batch app ids, checking for existing promises, then do this.
			ensure_appid_deferred(appid);

			appid_info_deferreds.push(appid_promises[appid].promise);

			sub_apps.push(appid);
			sub_app_prices[appid] = itemPrice;

		});

		// When we have all the app info
		$.when.apply(null, appid_info_deferreds).done(function() {
			for (var i = 0; i < sub_apps.length; i++) {
				if (!getValue(sub_apps[i] + "owned")) not_owned_games_prices += sub_app_prices[sub_apps[i]];
			}
			var $bundle_price = $(".discount_final_price");
			if ($bundle_price.length === 0) $bundle_price = $(".game_purchase_price");
			
			var bundle_price = Number(($bundle_price[0].innerHTML).replace(/[^0-9\.]+/g,""));

			var corrected_price = not_owned_games_prices - bundle_price;

			var $message = $('<div class="savings">' + (comma ? corrected_price / 100 : corrected_price).formatMoney(2, currency_symbol, ",", comma ? "," : ".") + '</div>');
			if (corrected_price < 0) $message[0].style.color = "red";

			$('.savings').replaceWith($message);

		});
	}

	// pull DLC gamedata from enhancedsteam.com
	function dlc_data_from_site(appid) {
		if ($("div.game_area_dlc_bubble").length > 0) {
			var appname = $(".apphub_AppName").html();
			appname = appname.replace("&amp;", "and");
			appname = appname.replace("\"", "");
			appname = appname.replace("�", "");		
			get_http("http://www.enhancedsteam.com/gamedata/gamedata.php?appid=" + appid + "&appname=" + appname, function (txt) {
				var block = "<div class='block'><div class='block_header'><h4>Downloadable Content Details</h4></div><div class='block_content'><div class='block_content_inner'>" + txt + "</div></div></div>";
			
				var dlc_categories = document.getElementById('demo_block');
				dlc_categories.insertAdjacentHTML('afterend', block);
			});
		}
	}

	// adds a "total spent on Steam" to the account details page
	function account_total_spent() {
		if ($('.transactionRow').length != 0) {
								
			totaler = function (p, i) {				
				if (p.innerHTML.indexOf("class=\"transactionRowEvent\">Wallet Credit</div>") <= 0) {
					var regex = /(\d+\.\d\d+)/;
					price = regex.exec($(p).html());
					if (price != null) {
						return parseFloat(price);
					}
				}
			};
				
			prices = window.jQuery.map($('.transactionRow'),  totaler);
			
			var total = 0.0;
			window.jQuery.map(prices, function (p, i) {
				total += p
			});
			total = total.toFixed(2);
			
			$('.accountInfoBlock .block_content_inner .accountBalance').after('<div class="accountRow accountBalance accountSpent"></div>');
			$('.accountSpent').append('<div class="accountData price">$' + total + '</div>');
			$('.accountSpent').append('<div class="accountLabel" style="color: #C00; font-weight: bold; font-size: 100%">Total Spent:</div>');
		}
	}

	// Add SteamDB links to pages
	function add_steamdb_links(appid, type) {
		switch (type) {
			case "gamehub":
				$(".apphub_OtherSiteInfo").append('<a href="http://steamdb.info/app/' + appid + '/" class="btn_darkblue_white_innerfade btn_medium" target="_blank"><span>Steam Database</span>');
				break;
			case "gamegroup":
				$('#rightActionBlock' ).append('<div class="actionItemIcon"><img src="http://www.enhancedsteam.com/firefox/steamdb.png" width="16" height="16" alt=""></div><a class="linkActionMinor" target="_blank" href="http://steamdb.info/app/' + appid + '/">View In Steam Database</a>');
				break;
			case "app":
				$('#demo_block').find('.block_content_inner').find('.share').before('<div class="demo_area_button"><a class="game_area_wishlist_btn" target="_blank" href="http://steamdb.info/app/' + appid + '/" style="background-image:url(http://www.enhancedsteam.com/firefox/steamdb_store.png)">View In Steam Database</a></div>');
				break;
			case "sub":	
				$(".share").before('<a class="game_area_wishlist_btn" target="_blank" href="http://steamdb.info/sub/' + appid + '/" style="background-image:url(http://www.enhancedsteam.com/firefox/steamdb_store.png)">View In Steam Database</a>');
				break;
		}
	}

	// Adds red warnings for 3rd party DRM
	function drm_warnings() {
		var gfwl = false;
		var uplay = false;
		var securom = false;
		var tages = false;
		var stardock = false;
		var rockstar = false;
		var kalypso = false;
		var otherdrm = false;
		
		// Games for Windows Live detection
		if (document.body.innerHTML.indexOf("Games for Windows LIVE") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Games for Windows Live") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Games for Windows - Live") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Games For Windows - Live") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Games for Windows - LIVE") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Games For Windows - LIVE") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Online play requires log-in to Games For Windows") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("INSTALLATION OF THE GAMES FOR WINDOWS LIVE SOFTWARE") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("Multiplayer play and other LIVE features included at no charge") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("www.gamesforwindows.com/live") > 0) { gfwl = true; }
		if (document.body.innerHTML.indexOf("www.gamesforwindows.com/live") > 0) { gfwl = true; }
		
		// Ubisoft Uplay detection
		if (document.body.innerHTML.indexOf("Uplay Account") > 0) { uplay = true; }
		if (document.body.innerHTML.indexOf("UPLAY ACCOUNT") > 0) { uplay = true; }
		if (document.body.innerHTML.indexOf("UPlay account") > 0) { uplay = true; }
		if (document.body.innerHTML.indexOf("HIGH SPEED INTERNET CONNECTION AND CREATION OF A UBISOFT ACCOUNT ARE REQUIRED") > 0) { uplay = true; }
		if (document.body.innerHTML.indexOf("HIGH SPEED INTERNET ACCESS AND CREATION OF A UBISOFT ACCOUNT ARE REQUIRED") > 0) { uplay = true; }
		if (document.body.innerHTML.indexOf("CREATION OF A UBISOFT ACCOUNT") > 0) { uplay = true; }
		
		// Securom detection
		if (document.body.innerHTML.indexOf("SecuROM") > 0) { securom = true; }
		if (document.body.innerHTML.indexOf("SECUROM") > 0) { securom = true; }
		
		// Tages detection
		if (document.body.innerHTML.indexOf("Tages") > 0) { tages = true; }
		if (document.body.innerHTML.indexOf("Angebote des Tages") > 0) { tages = false; }
		if (document.body.innerHTML.indexOf("TAGES") > 0) { tages = true; }
		if (document.body.innerHTML.indexOf("SOLIDSHIELD") > 0) { tages = true; }		
		if (document.body.innerHTML.indexOf("Solidshield Tages") > 0) { tages = true; }
		if (document.body.innerHTML.indexOf("Tages Solidshield") > 0) { tages = true; }
		// Stardock account detection
		if (document.body.innerHTML.indexOf("Stardock account") > 0) { stardock = true; }
		
		// Rockstar social club detection
		if (document.body.innerHTML.indexOf("Rockstar Social Club") > 0) { rockstar = true; }
		if (document.body.innerHTML.indexOf("Rockstar Games Social Club") > 0) { rockstar = true; }
		
		// Kalypso Launcher detection
		if (document.body.innerHTML.indexOf("Requires a Kalypso account") > 0) { kalypso = true; }
		
		// Detect other DRM
		if (document.body.innerHTML.indexOf("3rd-party DRM") > 0) { otherdrm = true; }
		if (document.body.innerHTML.indexOf("No 3rd Party DRM") > 0) { otherdrm = false; }
		
		if (gfwl) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (Games for Windows Live)</div>');
			otherdrm = false;
		}
		
		if (uplay) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (Ubisoft Uplay)</div>');
			otherdrm = false;
		}
		
		if (securom) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (SecuROM)</div>');
			otherdrm = false;
		}
		
		if (tages) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (Tages)</div>');
			otherdrm = false;
		}
		
		if (stardock) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (Stardock Account Required)</div>');
			otherdrm = false;
		}
		
		if (rockstar) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (Rockstar Social Club)</div>');
			otherdrm = false;
		}
		
		if (kalypso) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM (Kalypso Launcher)</div>');
			otherdrm = false;
		}
		
		if (otherdrm) {
			var drm = document.getElementById('game_area_purchase'); 
			drm.insertAdjacentHTML('beforebegin', '<div class="game_area_already_owned" style="background-image: url( http://www.enhancedsteam.com/firefox/game_area_warning.png );">Warning: This title uses 3rd party DRM</div>');
		}
	}

	// Changes Steam Community Groups pages
	function add_group_events() {
		var groupname = get_groupname(document.URL);
		if (groupname.indexOf("#") > 0) { groupname = groupname.substring(0, groupname.indexOf("#")); }

		$('.group_summary').after('<div class="group_content_rule"></div><div class="group_content"><div class="group_content_header"><div class="group_content_header_viewmore"><a href="http://steamcommunity.com/groups/' + groupname + '/events/">VIEW ALL</a></div>Events</div><div id="enhancedsteam_group_events"></div>');

		get_http("//steamcommunity.com/groups/" + groupname + "/events/", function (txt) {

			var events_start = txt.indexOf('<!-- events section -->');
			var events_end = txt.indexOf('<!-- /events section -->');
			var events = txt.substring(events_start, events_end);

			// now that we have the information, put it on the page
			document.getElementById('enhancedsteam_group_events').innerHTML = events;
		});

	}

	function add_carousel_descriptions() {
		var capsule_appids = $.map($(".cluster_capsule"), function(obj){return get_appid(obj.href);});

		get_http("//store.steampowered.com/api/appdetails/?appids=" + capsule_appids.join(","), function(txt) {
			
			var description_height_to_add = 62;  // 60 is good for 4 lines; most strings are 2 or 3 lines than this.
			$(".main_cluster_content").css("height", parseInt($(".main_cluster_content").css("height").replace("px", ""), 10) + description_height_to_add + "px");

			var data = JSON.parse(txt);

			$.each($(".cluster_capsule"), function(i, _obj) {
				var appid = get_appid(_obj.href),
					$desc = $(_obj).find(".main_cap_content"),
					$desc_content = $("<p></p>");
					
				if (data[appid] !== undefined) {
					if (data[appid].success) {					
						$desc.css("height", parseInt($desc.css("height").replace("px", ""), 10) + description_height_to_add + "px");
						$desc.parent().css("height", parseInt($desc.parent().css("height").replace("px", ""), 10) + description_height_to_add + "px");

						var raw_string = $(data[appid].data.about_the_game).text();  // jQuery into DOM then get only text; no html pls.

						// Split the string into sentences (we only want the first two).
						// Replace delimiters with themselves and a unique string to split upon, because we want to include the delimiter once split.
						raw_string = raw_string.replace(/([\.\!\?])/g, "$1 Wow_so_unique");
						var string_sentences = raw_string.split("Wow_so_unique"),
							display_string;

						if (string_sentences.length >= 2) {
							display_string = string_sentences[0] + string_sentences[1];
						}
						else {
							display_string = raw_string;
						}

						$desc_content.html(display_string);

						$desc.append($desc_content);
					}
				}    
			});
		});
	}

	// Changes Steam Greenlight pages
	function hide_greenlight_banner() {
		var banner = document.getElementById('ig_top_workshop');
		var html;
		html = '<link href="http://www.enhancedsteam.com/firefox/enhancedsteam.css" rel="stylesheet" type="text/css">';
		html = html + '<div id="store_nav_area"><div class="store_nav_bg"><div class="store_nav">';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/browse/?appid=765&section=items"><span>Games</a>';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/browse/?appid=765&section=software"><span>Software</a>';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/browse/?appid=765&section=concepts"><span>Concepts</a>';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/browse/?appid=765&section=collections"><span>Collections</a>';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/discussions/?appid=765"><span>Discussions</a>';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/about/?appid=765&section=faq"><span>About Greenlight</a>';
		html = html + '<a class="tab " href="http://steamcommunity.com/workshop/news/?appid=765"><span>News</a>';
		banner.insertAdjacentHTML('beforebegin', html);

		// now hide the greenlight banner
		if (banner) { banner.hidden = true;	}
	}

	// Changes user's edit page
	function add_return_to_profile_tab() {
		htmlstr = '<div class="tab" id="returnTabOff">';
		htmlstr += '<div class="tabOffL"><img src="http://cdn.steamcommunity.com/public/images/skin_1/greyCornerUpLeftDark.gif" width="2" height="2" border="0"></div>';
		htmlstr += '<div class="tabOff"><a href="http://steamcommunity.com/my/">Return to profile</a></div>';
		htmlstr += '<div class="tabOffR"><img src="http://cdn.steamcommunity.com/public/images/skin_1/greyCornerUpRightDark.gif" width="2" height="2" border="0"></div>';
		htmlstr += '</div>';

		document.getElementById("tabs").insertAdjacentHTML('beforeend', htmlstr);
	}

	function fix_community_hub_links() {
		element = document.querySelector( '.apphub_OtherSiteInfo a' );
				
		if( element && element.href.charAt( 26 ) === '/' ) {
			element.href = element.href.replace( /\/\/app\//, '/app/' ) + '/';
		}
	}
	
	function bind_ajax_content_highlighting () {
		var targetNodes = document.querySelectorAll ('#search_results');
		if (targetNodes  &&  targetNodes.length > 0) {			
			for (var J = targetNodes.length - 1;  J >= 0;  --J) {				
				start_highlights_and_tags();				
			}
		}	
		
		var targetNodes = document.querySelectorAll ('.tab_row');
		if (targetNodes  &&  targetNodes.length > 0) {
			for (var J = targetNodes.length - 1;  J >= 0;  --J) {				
				start_highlights_and_tags();				
			}
		}			
	}

	function add_app_page_highlights(appid) {
		if (window.location.host == "store.steampowered.com") node = $(".apphub_HeaderStandardTop")[0];
		if (window.location.host == "steamcommunity.com") node = $(".apphub_HeaderTop")[0];

		on_app_info(appid, function(){
			highlight_app(appid, node);
		});
	}

	function start_highlights_and_tags(){
		var selectors = [
				"div.tab_row",			// Storefront rows
				"div.dailydeal",		// Christmas deals; https://www.youtube.com/watch?feature=player_detailpage&v=2gGopKNPqVk#t=52s
				"div.wishlistRow",		// Wishlist row
				"a.game_area_dlc_row",	// DLC on app pages
				"a.small_cap",			// Featured storefront items, and "recommended" section on app pages.
				"a.search_result_row",	// Search result row.
				"a.match",				// Search suggestions row.
				"a.cluster_capsule",	// Carousel items.
				"div.recommendation_highlight",	// Recommendation page.
				"div.recommendation_carousel_item",	// Recommendation page.
				"div.friendplaytime_game"	// Recommendation page.
			];

		// Get all appids and nodes from selectors.
		$.each(selectors, function (i, selector) {
			$.each($(selector), function(j, node){
				var appid = get_appid(node.href || $(node).find("a")[0].href) || get_appid_wishlist(node.id);
				if (appid) {
					on_app_info(appid, function(){
						highlight_app(appid, node);
					});
				}
			});
		});
	}

	function on_app_info(appid, cb) {
		ensure_appid_deferred(appid);

		var expire_time = parseInt(Date.now() / 1000, 10) - 1 * 60 * 60; // One hour ago
		var last_updated = window.localStorage.getItem(appid) || expire_time - 1;

		// If we have no data on appid, or the data has expired; add it to appids to fetch new data.
		if (last_updated < expire_time) {
			get_app_details(appid);
		}
		else {
			appid_promises[appid].resolve();
		}

		// Bind highlighting.
		appid_promises[appid].promise.done(cb);
	}

	function highlight_app(appid, node) {
		if (!(node.classList.contains("wishlistRow") || node.classList.contains("wishlistRowItem"))) {
			if (getValue(appid + "wishlisted")) highlight_wishlist(node);
		}

		if (getValue(appid + "owned")) highlight_owned(node);
		// if (getValue(appid + "friendswant")) highlight_friends_want(node, appid);
	}

	function get_app_details(appids) {
		if (!(appids instanceof Array)) appids = [appids];
		get_http('//store.steampowered.com/api/appuserdetails/?appids=' + appids.join(","), function (data) {
			var storefront_data = JSON.parse(data);
			$.each(storefront_data, function(appid, app_data){
				if (app_data.success) {
					setValue(appid + "wishlisted", (app_data.data.added_to_wishlist === true));
					setValue(appid + "owned", (app_data.data.is_owned === true));

					if (app_data.data.friendswant) setValue(appid + "friendswant", app_data.data.friendswant.length);
				}
				// Time updated, for caching.
				setValue(appid, parseInt(Date.now() / 1000, 10));

				// Resolve promise, to run any functions waiting for this apps info.
				appid_promises[appid].resolve();
			});
		});
	}
	
	function change_user_background() {
		var profile_name = window.location.pathname.replace("/id/", "");
		profile_name = profile_name.replace("/", "");
		get_http("http://www.enhancedsteam.com/gamedata/profile.php?userid=" + profile_name, function (txt) {		
			if (txt) {
				$(".no_header")[0].style.backgroundImage = "url(" + txt + ")";
				if ($(".profile_background_image_content").length > 0) {
					$(".profile_background_image_content")[0].style.backgroundImage = "url(" + txt + ")";
				} else {				
					$(".no_header").addClass("has_profile_background");
					$(".profile_content").addClass("has_profile_background");
					$(".profile_content").prepend('<div class="profile_background_holder_content"><div class="profile_background_overlay_content"></div><div class="profile_background_image_content " style="background-image: url(' + txt + ');"></div></div></div>');
				}
			}
		});	
	}

	function add_es_background_selection() {
		var profile_name = window.location.pathname.replace("/id/", "");
		profile_name = profile_name.replace("/edit", "");
		profile_name = profile_name.replace("/settings", "");
		profile_name = profile_name.replace("/profiles", "");
		profile_name = profile_name.replace("/", "");
		get_http("http://www.enhancedsteam.com/gamedata/profile_bg_select.php?userid=" + profile_name, function (txt) {
			var html = "<form id='es_profile_bg' method='POST' action='http://www.enhancedsteam.com/gamedata/profile_bg_save.php'><div class='group_content group_summary'>";
				html += "	<input type='hidden' name='url' value='" + window.location.pathname + "'>";
				html += txt;		
				html += "</form>";
			$(".group_content_bodytext").before(html);
		});
	}

	$(document).ready(function(){
		
		if (window.location.pathname.startsWith("/api")) return;
		// On window load...
		add_enhanced_steam_options();
		remove_install_steam_button();
		add_spuf_link();    
		
		// attach event to the logout button
		$('a[href$="http://store.steampowered.com/logout/"]').bind('click', window.sessionStorage.clear());
		
		switch (window.location.host) {
			case "store.steampowered.com":			
				switch (true) {
					case /^\/cart\/.*/.test(window.location.pathname):
						add_empty_cart_button();
						break;

					case /^\/app\/.*/.test(window.location.pathname):
						var appid = get_appid(window.location.host + window.location.pathname);
						show_pricing_history(appid, "app");
						dlc_data_from_site(appid);

						drm_warnings();
						add_metracritic_userscore();

						fix_community_hub_links();
						add_widescreen_certification(appid);
						add_app_page_highlights(appid);
						add_steamdb_links(appid, "app");
						break;

					case /^\/sub\/.*/.test(window.location.pathname):
						var subid = get_subid(window.location.host + window.location.pathname);
						drm_warnings();
						subscription_savings_check();
						show_pricing_history(subid, "sub");
						add_steamdb_links(subid, "sub");
						break;

					case /^\/account\/.*/.test(window.location.pathname):
						account_total_spent();
						break;
						
					case /^\/search\/.*/.test(window.location.pathname):
						setInterval (bind_ajax_content_highlighting, 1500);
						break;
						
					case /^\/genre\/.*/.test(window.location.pathname):
						setInterval (bind_ajax_content_highlighting, 1500);
						break;

					// Storefront-front only
					case /^\/$/.test(window.location.pathname):
						add_carousel_descriptions();
						break;
				}

				/* Highlights & data fetching */
				start_highlights_and_tags();

				// Storefront homepage tabs.
				//setInterval (bind_ajax_content_highlighting, 1500);

				break;

			case "steamcommunity.com":

				switch (true) {
					case /^\/groups\/.*/.test(window.location.pathname):
						add_group_events();
						break;

					case /^\/(?:id|profiles)\/.+\/wishlist/.test(window.location.pathname):
						// add_cart_on_wishlist();
						fix_wishlist_image_not_found();
						add_empty_wishlist_button();

						// wishlist highlights
						//start_highlights_and_tags();
						break;

					case /^\/(?:id|profiles)\/.+\/home/.test(window.location.pathname):
						// start_friend_activity_highlights();
						//setInterval (bind_ajax_content_highlighting, 500);
						break;

					case /^\/(?:id|profiles)\/.+\/edit/.test(window.location.pathname):						
						add_es_background_selection();
						break;

					case /^\/(?:id|profiles)\/[^\/]+\/?$/.test(window.location.pathname):
						add_community_profile_links();
						change_user_background();
						break;

					case /^\/sharedfiles\/.*/.test(window.location.pathname):
						hide_greenlight_banner();
						break;

					case /^\/app\/.*/.test(window.location.pathname):
						var appid = get_appid(window.location.host + window.location.pathname);
						//add_app_page_highlights(appid);
						add_steamdb_links(appid, "gamehub");
						break;
						
					case /^\/games\/.*/.test(window.location.pathname):
						var appid = document.querySelector( 'a[href*="http://steamcommunity.com/app/"]' );
						appid = appid.href.match( /(\d)+/g );
						add_steamdb_links(appid, "gamegroup");
						break;
				}
				break;		
		}
	});  
}