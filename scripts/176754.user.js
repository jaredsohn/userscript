// ==UserScript==
// @name The Super Mega Awesome Steam Community Market Assisting Helper Thingy
// @description Adds some features to Steam Market.
// @namespace The_Super_Mega_Awesome_Steam_Community_Market_Assisting_Helper_Thingy
// @include http*://steamcommunity.com/market/*
// @version 1.1
// @author KRS_L
// @updateURL https://userscripts.org/scripts/source/176754.meta.js
// @downloadURL https://userscripts.org/scripts/source/176754.user.js
// ==/UserScript==
window.addEventListener('load', function () {
	try {
		if (g_bLoggedIn) {
			window.LoadMarketHistory = LoadMarketHistory;
			localStorage.setItem("refreshIcon", "data:image/png;base64,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");
			new Ajax.Request('http://steamcommunity.com/profiles/' + g_steamID + '/inventory/json/753/6', {
				method : 'get',
				onSuccess : function (transport) {
					localStorage.setItem("CommunityInventory", JSON.stringify(transport.responseJSON));
				}
			});
			function markOwnedItems() {
				var markedItemWrapper = document.createElement('div');
				markedItemWrapper.innerHTML = response.results_html;
				var communityInventory = JSON.parse(localStorage.getItem("CommunityInventory"));
				var inventory = communityInventory.rgInventory;
				var descriptions = communityInventory.rgDescriptions;
				var marketListings = markedItemWrapper.getElementsByClassName('market_listing_row_link')
					for (var i = 0; i < marketListings.length; i++) {
						var iHTML = marketListings.item(i).outerHTML;
						for (var j in inventory) {
							var item = inventory[j].classid + "_0";
							var market_hash_name = encodeURIComponent(descriptions[item].market_hash_name);
							market_hash_name = market_hash_name + "?";
							if (iHTML.indexOf(market_hash_name) > -1) {
								iHTML = iHTML.replace("market_recent_listing_row\"", "market_recent_listing_row\" style=\"background-color:#3b551f;\"");
								marketListings.item(i).outerHTML = iHTML;
								break;
							}
						}
					}
					response.results_html = markedItemWrapper.innerHTML;
			}
			if (localStorage.getItem("QuickBuyChecked") == null)
				localStorage.setItem("QuickBuyChecked", false);
			var user_info_box = document.getElementsByClassName('user_info').item(0).innerHTML;
			user_info_box += "<div title=\"Enable singe click purchases\" style=\"position:absolute; right: 0px; top: 68px;\"><b><font color=\"#FFFFFF\">Enable Quick Buy</font></b><input type=\"checkbox\" id=\"QuickBuyCheckbox\"></div>";
			document.getElementsByClassName('user_info').item(0).innerHTML = user_info_box;
			$('QuickBuyCheckbox').checked = JSON.parse(localStorage.getItem("QuickBuyChecked"))
				$('QuickBuyCheckbox').onchange = function () {
				localStorage.setItem("QuickBuyChecked", $('QuickBuyCheckbox').checked);
			}
			function getFunctionBody(func) {
				func = func.toString();
				func = func.substring(func.indexOf("{") + 1, func.lastIndexOf("}"));
				return func;
			}
			function injectFunction(newFeature, target, method, injectAfter, params) {
				newFeature = getFunctionBody(newFeature);
				var funcStr = getFunctionBody(target[method]);
				if (injectAfter == null) {
					var injectPoint = funcStr.length;
				} else {
					var injectPoint = funcStr.indexOf(injectAfter) + injectAfter.length;
				}
				funcStr = funcStr.slice(0, injectPoint) + newFeature + funcStr.slice(injectPoint);
				var newFunc = Function(params, funcStr);
				target[method] = newFunc;
			}
			function modLoadMarketHistory() {
				if (response.results_html.indexOf("market_listing_gainorloss") > -1) {
					var assets = response.assets;
					var itemNames = response.results_html.match(/class=\"market_listing_item_name\" style=\"color\: \#(.*?)\;\">[\s]*(.*?)[\s]*</g);
					for (var x = 0; x < itemNames.length; x++) {
						var itemName = itemNames[x];
						var itemColor = itemName.substring(itemName.indexOf("#") + 1, itemName.lastIndexOf(";"));
						itemName = itemName.substring(itemName.indexOf(">") + 1, itemName.lastIndexOf("<"));
						for (var i in assets) {
							var appId = assets[i];
							for (var u in appId) {
								var contextId = appId[u];
								for (var e in contextId) {
									var id = contextId[e];
									var market_name = id.market_name;
									if (itemName == market_name) {
										var market_hash_name = id.market_hash_name;
										var newHTML = "class=\"market_listing_item_name\" style=\"color: #" + itemColor + ";\"><a class=\"market_listing_item_name_link\" href=\"http://steamcommunity.com/market/listings/753/" + encodeURIComponent(market_hash_name) + "\">" + itemName + "</a><";
										response.results_html = response.results_html.replace(itemNames[x], newHTML);
										break;
									}
								}
							}
						}
					}
				}
			}
			injectFunction(modLoadMarketHistory, window, "LoadMarketHistory", "var response = transport.responseJSON;", "");
			function modBuyItemDialog_Show() {
				if ($('QuickBuyCheckbox').checked) {
					market_buynow_dialog_accept_ssa.checked = true;
					$('market_buynow_dialog_purchase').click();
				}
			}
			injectFunction(modBuyItemDialog_Show, BuyItemDialog, "Show", null, "sElementPrefix, listingid, item");
			function modOnResponseRenderResults() {
				if ($('QuickBuyCheckbox').checked) {
					response.results_html = response.results_html.replace(/item_market_action_button_green\">[\\\s]*<span class=\"item_market_action_button_edge item_market_action_button_left\"><\/span>[\\\s]*<span class=\"item_market_action_button_contents\">[\\\s]*(.*?)[\\\s]*</g, "item_market_action_button_blue\"><span class=\"item_market_action_button_edge item_market_action_button_left\"></span><span class=\"item_market_action_button_contents\">Quick Buy<");
				}
				response.results_html = response.results_html.replace("<span class=\"market_listing_right_cell market_listing_action_buttons\">", "<span id=\"searchResults_btn_refresh\" class=\"market_listing_right_cell market_listing_action_buttons\"><a><img id =\"refreshImage\" src=\"" + localStorage.getItem("refreshIcon") + "\" width=\"21\" height=\"21\"></a>");
			}
			injectFunction(modLoadMarketHistory, CSearchResults.prototype, "OnResponseRenderResults", "var response = transport.responseJSON;", "transport");
			injectFunction(modOnResponseRenderResults, CSearchResults.prototype, "OnResponseRenderResults", "var response = transport.responseJSON;", "transport");
			injectFunction(markOwnedItems, CSearchResults.prototype, "OnResponseRenderResults", "var response = transport.responseJSON;", "transport");
			function setOnRefreshEvent() {
				if ($('searchResults_btn_refresh')) {
					$('searchResults_btn_refresh').onclick = function () {
						var element = $('refreshImage');
						element.src = "http://cdn.steamcommunity.com/public/images/login/throbber.gif";
						element.width = "21";
						element.height = "21";
						g_oSearchResults.m_iCurrentPage = 1;
						g_oSearchResults.GoToPage(0);
					}
				}
			}
			injectFunction(setOnRefreshEvent, CSearchResults.prototype, "UpdatePagingDisplay", null, "");
			if ($('QuickBuyCheckbox').checked) {
				var buyLinks = document.getElementsByClassName('market_listing_buy_button');
				for (var i = 0; i < buyLinks.length; i++) {
					var iHTML = buyLinks.item(i).innerHTML;
					iHTML = iHTML.replace(/item_market_action_button_contents">[\s]*(.*?)[\s]*</g, "item_market_action_button_contents\">Quick Buy<");
					iHTML = iHTML.replace("item_market_action_button_green", "item_market_action_button_blue");
					buyLinks.item(i).innerHTML = iHTML;
				}
			}
			var tableHeader = document.getElementsByClassName('market_listing_table_header').item(0).innerHTML;
			tableHeader = tableHeader.replace("<span class=\"market_listing_right_cell market_listing_action_buttons\">", "<span id=\"searchResults_btn_refresh\" class=\"market_listing_right_cell market_listing_action_buttons\"><a><img id=\"refreshImage\" src=\"" + localStorage.getItem("refreshIcon") + "\" width=\"21\" height=\"21\"></a>");
			document.getElementsByClassName('market_listing_table_header').item(0).innerHTML = tableHeader;
			var communityInventory = JSON.parse(localStorage.getItem("CommunityInventory"));
			var inventory = communityInventory.rgInventory;
			var descriptions = communityInventory.rgDescriptions;
			var marketListings = document.getElementsByClassName('market_listing_row_link');
			for (var i = 0; i < marketListings.length; i++) {
				var iHTML = marketListings.item(i).outerHTML;
				for (var j in inventory) {
					var item = inventory[j].classid + "_0";
					var market_hash_name = encodeURIComponent(descriptions[item].market_hash_name);
					market_hash_name = market_hash_name + "?";
					if (iHTML.indexOf(market_hash_name) > -1) {
						iHTML = iHTML.replace("market_recent_listing_row\"", "market_recent_listing_row\" style=\"background-color:#3b551f;\"");
						marketListings.item(i).outerHTML = iHTML;
						break;
					}
				}
			}
			function setShowMoreEvent() {
				$('sellListingsInfinite').onclick = function () {
					var elRows = $('sellListingRows');
					if (g_bBusyLoadingMore) {
						return;
					}
					var origOuterHTML = $('sellListingsInfinite').outerHTML;
					$('sellListingsInfinite').outerHTML = "<span id=\"sellListingsInfinite\"><img src=\"http://cdn.steamcommunity.com/public/images/login/throbber.gif\" width=\"21\" height=\"21\"></span>";
					g_bBusyLoadingMore = true;
					new Ajax.Request('http://steamcommunity.com/market/recent', {
						method : 'get',
						parameters : {
							time : g_rgRecents['sell_new']['time'],
							listing : g_rgRecents['sell_new']['listing']
						},
						onSuccess : function (transport) {
							if (transport.responseJSON) {
								var response = transport.responseJSON;
								if ($('QuickBuyCheckbox').checked) {
									response.results_html = response.results_html.replace(/item_market_action_button_green\">[\\\s]*<span class=\"item_market_action_button_edge item_market_action_button_left\"><\/span>[\\\s]*<span class=\"item_market_action_button_contents\">[\\\s]*(.*?)[\\\s]*</g, "item_market_action_button_blue\"><span class=\"item_market_action_button_edge item_market_action_button_left\"></span><span class=\"item_market_action_button_contents\">Quick Buy<");
								}
								if (response.assets.length != 0) {
									g_rgRecents['sell_new']['time'] = response.last_time;
									g_rgRecents['sell_new']['listing'] = response.last_listing;

									elRows.insert({
										'bottom' : response.results_html
									});
									MergeWithAssetArray(response.assets);
									MergeWithListingInfoArray(response.listinginfo);
									MergeWithAppDataArray(response.app_data);
									eval(response.hovers);
								}
							}
						},
						onComplete : function () {
							g_bBusyLoadingMore = false;
							$('sellListingsInfinite').outerHTML = origOuterHTML;
							setShowMoreEvent();
						}
					});
				}
			}
			if ($('sellListingsMore')) {
				$('sellListingsMore').outerHTML = $('sellListingsMore').outerHTML.replace("<a id=\"sellListingsMore\" href=\"#\">", "<span id=\"sellListingsInfinite\"><a>");
				setShowMoreEvent();
			}
			setOnRefreshEvent();
		}
	} catch (e) {
		console.log("Steam Market Plus: ", e);
	}
}, false);