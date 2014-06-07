// ==UserScript==
// @name         Market Helper EUD
// @version      1.2.5
// @description  Podrás ver los objetos que has comprado y dónde los has comprado.
// @author       William Manney
// @namespace    http://www.elultimoduelo.com
// @include	http://*.the-west.*/game.php*
// ==/UserScript==

/**
 * Market Helper
 * 
 * @version 1.2.6
 * Improve market purchase items filters, link filters with towns displayed on map
 * Run auto-update check maximum once per 24 hours (use less bandwidth)
 * 
 * @version 1.2.5
 * Improve speed for collect all functionality
 * Increase market helper window size
 * Filter towns and items by auction ended, in progress or display all
 * 
 * @version 1.2.4
 * Fix duplicate items from purchase
 * Show items that are still in auction
 * Display items for purchase in main window
 * 
 * @version 1.2.3
 * Fix when current location is a town from where you can collect items
 * Improve collect all functionality
 * 
 * @version 1.2.2
 * Minimize and restore market helper window
 * Add Help tab
 * 
 * @version 1.2.1
 * Fix auto-update for FireFox
 *
 * @version 1.2.0
 * Remove register using TheWestApi, issues from TheWestApi
 * Async script initialization and auto-update
 * Show items that need to be purchased for each town
 * Button for collect all items from a town (you must be in that town)
 * Button to open town overview or center map on town
 *
 * @version 1.1.1
 * Fix button position, overlap with minimap when town has own forts
 * Fix auto-update logic
 * 
 * @version 1.1
 * Display loading icon until data is calculated
 * Auto update functionality, register using TheWestApi for version compatibility
 * 
 * @version 1.0
 * Display a list of towns from where you need to collect purchased items
 * 
 */

var dyMarketHelperGeneral = (function () {
	"use strict";
	var SCRIPT_VERSION = "1.2.6",
		SCRIPT_WEBSITE = "http://userscripts.org/scripts/show/119454",
		PREFIX = "dyMarketHelper";
	return {
		getVersion: function () {
			return SCRIPT_VERSION;
		},
		getWebsite: function () {
			return SCRIPT_WEBSITE;
		},
		getPrefix: function () {
			return PREFIX;
		}
	};
}());

var dyMarketHelperCode = function (currentVersion, scriptWebsite) {
	"use strict";
	/*global window, document, alert, jQuery, WMap, wman, pos, console, TheWestApi, dyMarketHelper, AjaxWindow, Market, Ajax*/
	var lastPageParsed = -1,
		townInfo = [],
		townCoords = [],
		townIndex = 0,
		townCoordsIndex = 0,
		townIdToIndex = {},
		currentLocationXY = "",
		prefix = "dyMarketHelper",
		scriptName = "The-west market helper",
		scriptAuthor = "darkyndy",
		marketHelperTab = null,
		marketHelperTabContent = null,
		marketHelperTabLoader = null,
		$mapEl = null,
		$filtersEl = null,
		$townsEl = null,
		$helpEl = null,
		mapWidth = 761,
		mapHeight = 137,
		debug = false,
		gameUrl = "http://" + window.location.hostname + "/game.php",
		marketItemsPerPage = 11,
		lastMarketOfferId = 0,
		is134 = false,
		scriptIconSrc = "data:image/png;base64," +
				"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",
		collectIconSrc = "data:image/png;base64," +
				"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB" +
				"HElEQVR4nJWSwY6CMBCGp9ga9AK8gN58BxITOfOiHrl5IOHAG/AI6AESL40REminnT10lxhl1/U7" +
				"dTrzd2b+lBERfAJ/vbLW9n0PAEII3/ffC7quy7IMAHa7XRzH7wVENI4jACDia9b71+APsMeljTF5" +
				"njdNY4wBAMbYer1O0zSKovkOi8XicDhMaSHEfr9/rH7u4Ljf70VR3G63JEm22+3zTERkjLler1JK" +
				"+kFKeT6frbUu7Pu+bVutNRF5AKCUKsuyqqrplTAMN5sNY8yFdV2fTqeu68DZSkSIiIjW2llnjDGI" +
				"6IbnAICISqnL5XI8HmcFWuvpzJ05QRAMwzBbDQCc89Vq5Xnet0tE5Bb6TeBYLpeMsRlb/+bjr/EF" +
				"KZOnkChfTOoAAAAASUVORK5CYII=";
	/**
	 * Get custom style
	 */
	function getStyle() {
		var customStyle = ".tw2gui_window." + prefix + " {" +
			"height: 655px;" +
			"}" +
			".tw2gui_window." + prefix + " div.tw2gui_window_inset {" +
			"background: transparent url(/images/window/premium/premium_buy_bg.jpg) no-repeat;" +
			"}" +
			"#" + prefix + "Map {" +
			"width: " + mapWidth + "px;" +
			"height: " + mapHeight + "px;" +
			"border: 0;" +
			"position: relative;" +
			"background: #847a3c;" +
			"margin: 0 12px;" +
			"}" +
			"#" + prefix + "Filters {" +
			"width: " + mapWidth + "px;" +
			"height: 50px;" +
			"border: 0;" +
			"position: relative;" +
			"margin: 5px 12px;" +
			"}" +
			"#" + prefix + "Filters input, #" + prefix + "Filters label {" +
			"cursor: pointer;" +
			"}" +
			"#" + prefix + "Towns {" +
			"width: " + mapWidth + "px;" +
			"height: 320px;" +
			"border: 0;" +
			"position: relative;" +
			"margin: 0 12px;" +
			"overflow: auto;" +
			"}" +
			"." + prefix + "Square {" +
			"width: 75px;" +
			"height: 33px;" +
			"float:left;" +
			"border: 1px solid #000;" +
			"border-left: 0;" +
			"border-top: 0;" +
			"position: relative;" +
			"}" +
			"." + prefix + "Square.top {" +
			"border-top: 1px solid #000;" +
			"}" +
			"." + prefix + "Square.left {" +
			"border-left: 1px solid #000;" +
			"}" +
			"." + prefix + "Clear {" +
			"clear: both;" +
			"}" +
			"#" + prefix + "Message, ." + prefix + "Message {" +
			"text-align: center;" +
			"font-weight: bold;" +
			"text-style: italic;" +
			"}" +
			"." + prefix + "Town {" +
			"position: absolute;" +
			"z-index: 9;" +
			"top: 0;" +
			"right: 0;" +
			"width: 7px;" +
			"height: 7px;" +
			"line-height: 7px;" +
			"font-size: 5px;" +
			"background: #F00;" +
			"cursor: pointer;" +
			"text-align: center;" +
			"}" +
			"." + prefix + "Town.hover {" +
			"z-index: 10;" +
			"width: 5px;" +
			"height: 5px;" +
			"border: 2px solid #000;" +
			"}" +
			"." + prefix + "LocationRow {" +
			"width: 365px;" +
			"float: left;" +
			"margin: 4px 5px 0 0;" +
			"border-bottom: 2px solid #000;" +
			"}" +
			"." + prefix + "LocationTownRow {" +
			"height: 16px;" +
			"line-height: 16px;" +
			"float: left;" +
			"}" +
			"." + prefix + "LocationName {" +
			"cursor: pointer;" +
			"float: left;" +
			"}" +
			"." + prefix + "LocationCollect {" +
			"cursor: pointer;" +
			"float: left;" +
			"background: transparent url(" + collectIconSrc + ") no-repeat;" +
			"width: 16px;" +
			"height: 16px;" +
			"margin-right: 3px;" +
			"}" +
			"." + prefix + "LocationItemsRow {" +
			"float: left;" +
			"margin: 3px 0 3px 0;" +
			"}" +
			"." + prefix + "TownCenter {" +
			"cursor: pointer;" +
			"margin-right: 3px;" +
			"background: transparent url(images/icons/center.png) no-repeat;" +
			"width: 16px;" +
			"height: 16px;" +
			"float: left;" +
			"}" +
			"." + prefix + "ItemBlock {" +
			"float: left;" +
			"border: 1px solid transparent;" +
			"}" +
			"." + prefix + "ItemBlock." + prefix + "ItemPurchaseProgress {" +
			"border: 1px solid #F00;" +
			"}" +
			/* Filter town with purchased items */
			"#" + prefix + "Map." + prefix + "FilterPurchaseProgress ." + prefix + "Town ," +
			"#" + prefix + "Map." + prefix + "FilterPurchaseFinish ." + prefix + "Town ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "LocationRow ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "LocationRow {" +
			"display: none;" +
			"}" +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ." + prefix + "ItemBlock ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ." + prefix + "ItemBlock {" +
			"display: none;" +
			"}" +
			/* Filter town with purchased items - progress state*/
			"#" + prefix + "Map." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ." + prefix + "ItemPurchaseProgress {" +
			"display: block;" +
			"}" +
			/* Filter town with purchased items - finish state*/
			"#" + prefix + "Map." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ." + prefix + "ItemPurchaseFinish {" +
			"display: block;" +
			"}" +
			/* end filters */
			"." + prefix + "BagItemSmall .bag_item_count {" +
			"background: transparent url(/images/inventory/bag_small.png) no-repeat;" +
			"position: absolute;" +
			"width: 31px;" +
			"height: 25px;" +
			"left: 3px;" +
			"bottom: 0px;" +
			"color: white;" +
			"font-weight: bold;" +
			"z-index: 2;" +
			"overflow: hidden;" +
			"opacity: 0.7;" +
			"}" +
			"." + prefix + "BagItemSmall .bag_item_count > p {" +
			"text-align: center;" +
			"font-size: 14px;" +
			"line-height: 19px;" +
			"padding: 0 3px 0 0;" +
			"margin: 3px 3px 0 0;" +
			"}" +
			"#" + prefix + "HelpContent {" +
			"margin: 0 12px;" +
			"}" +
			"." + prefix + "Current {" +
			"background: #FF8000;" +
			"}";
		return customStyle;
	}
	/**
	 * Insert custom style
	 */
	function insertStyle() {
		var head = document.getElementsByTagName("head")[0],
			style;
		if (!head) {
			return;
		}
		style = document.createElement("style");
		style.setAttribute("type", "text/css");
		style.textContent = getStyle();
		head.appendChild(style);
	}
	/**
	 * Modify The-west base functions
	 */
	function modifyBaseFunction(Obj, objMethod, objString) {
		//TODO:
		var func  = "",
			modifyIdentifier = objString + "-" + objMethod,
			modifyWasMade = true,
			customChange = false;
		try {
			if (!Obj) {
				return;
			}
			if (modifyIdentifier === "Market-prepareTraderControl") {
				customChange = true;
				func = Obj.prototype[objMethod].toString();
				func = func.replace("n>1&&false", "n > 1");
				Obj.prototype[objMethod] = eval("(" + func + ")");
			} else {
				modifyWasMade = false;
			}
			if (modifyWasMade && !customChange) {
				Obj[objMethod] = eval("(" + func + ")");
			}
		} catch (ex) {
			console.log("modifyBaseFunction error");
		}
	}
	/**
	 * Start loading
	 */
	function startLoading() {
		marketHelperTabContent.toggle(false);
		marketHelperTabLoader.toggle(true);
	}
	/**
	 * End loading
	 */
	function endLoading() {
		marketHelperTabContent.toggle(true);
		marketHelperTabLoader.toggle(false);
	}
	/**
	 * Initialize market parameters
	 */
	function initializeParams() {
		var initTown = {"name": "current location", "x": 0, "y": 0, "extraClass": prefix + "Current", "id": "currentLocation"},
			initCoordsX = 0,
			initCoordsY = 0;
		lastPageParsed = -1;
		townInfo = [];
		townCoords = [];
		townIndex = 0;
		townCoordsIndex = 0;
		townIdToIndex = {};
		initCoordsX = pos.x;
		initCoordsY = pos.y;
		initTown.x = initCoordsX;
		initTown.y = initCoordsY;
		townInfo[townIndex] = initTown;
		currentLocationXY = initCoordsX + "_" + initCoordsY;
		//townCoords[townIndex] = currentLocationXY;
		townIndex = townIndex + 1;
		lastMarketOfferId = 0;
	}
	/**
	 * Set heading message
	 */
	function setMessage(msg) {
		msg = msg || "";
		jQuery("#" + prefix + "Message").html(msg);
	}
	/**
	 * Create help tab content
	 */
	function createTabHelpContent() {
		var $helpContent = jQuery("#" + prefix + "HelpContent"),
			helpContentHtml = "";
		if ($helpContent.length === 0) {
			helpContentHtml = '<b>General</b><br/>' +
				'Version: ' + currentVersion + '<br/>' +
				'Website: <a href="' + scriptWebsite + '" target="_blank" title="' + scriptWebsite + ', open in new tab">' + scriptWebsite + '</a><br/>' +
				'<br/>';
			$helpContent = jQuery("<div>")
				.attr({"id": prefix + "HelpContent"})
				.css({"display": "none"})
				.html(helpContentHtml);
			marketHelperTabContent.append($helpContent);
		}
	}
	/**
	 * Market Helper, main window, tab click
	 */
	function marketHelperTabClick(tabObj, tabId) {
		var displayHelpData = false;
		if (tabId === prefix) {
			setMessage("towns from where you need to collect purchased items");
		} else {
			displayHelpData = true;
			setMessage("Help");
		}
		jQuery("#" + prefix + "Map").toggle(!displayHelpData);
		jQuery("#" + prefix + "Filters").toggle(!displayHelpData);
		jQuery("#" + prefix + "Towns").toggle(!displayHelpData);
		jQuery("#" + prefix + "HelpContent").toggle(displayHelpData);
		marketHelperTab.activateTab(tabId);
	}
	/**
	 * Build popup window
	 */
	function buildWindow() {
		var html = '<h2 id="' + prefix + 'Message">Loading</h2><br/>',
			tabName = "Market purchase";
		marketHelperTab = wman.open(prefix).setMiniTitle(tabName).setSize(840, 655)
			.addTab(tabName, prefix, marketHelperTabClick)
			.addTab("Help", prefix + "Help", marketHelperTabClick);
		//console.log(marketHelperTab);
		marketHelperTabContent = jQuery(marketHelperTab.divMain).find(".tw2gui_window_content_pane");
		marketHelperTabLoader = jQuery(marketHelperTab.divMain).find(".tw2gui_window_pane  div.loader");
		marketHelperTabContent.append(html);
		startLoading();
	}
	/**
	 * Functions to be executed at reload for market helper tab
	 */
	function marketHelperTabReopenEvent() {
		initializeParams();
		buildWindow();
		getPurchase();
	}
	/**
	 * Attach event for reopen market helper window
	 */
	function marketHelperTabReopen() {
		var tabIdReg = "^" + prefix + "$";
		wman.registerReopenHandler(tabIdReg, function () {
			marketHelperTabReopenEvent();
	    });
	}
	/**
	 * Get town info
	 */
	function getTownInfo() {
		return townInfo;
	}
	/**
	 * Get market helper tab
	 */
	function getMarketHelperTab() {
		return marketHelperTab;
	}
	/**
	 * Get HTML for clear element
	 */
	function getClearHtml() {
		var clearHtml = '<div class="' + prefix + 'Clear"></div>';
		return clearHtml;
	}
	/**
	 * Test if player is at specified location
	 */
	function isPlayerAtLocation(locationX, locationY) {
		var currentX = parseInt(pos.x, 10),
			currentY = parseInt(pos.y, 10),
			isAtLocation = false;
		if (currentX === locationX && currentY === locationY) {
			isAtLocation = true;
		}
		return isAtLocation;
	}
	/**
	 * Callback function executed after all purchased items ware collected
	 */
	function afterCollectAllPurchasedItems($townPurchasedItemsTabClose) {
		$townPurchasedItemsTabClose.trigger("click");
		//reload market purchase
		marketHelperTabReopenEvent();
	}
	/**
	 * Paint town purchased items
	 */
	function paintTownPurchasedItems(location, $container, bigSizeItems, displayHeadingInfo, townPurchasedItemsTab) {
		var contentHtml = "",
			locationName = location.name,
			locationId = parseInt(location.id, 10),
			locationX = location.x,
			locationY = location.y,
			locationItems = {},
			locationItem = {},
			itemId = 0,
			$itemBlock = null,
			itemBlockHtml = "",
			itemBlockCssClass = "",
			$itemCollect = null,
			itemCollectHtml = "",
			marketOfferIdsForItem = [],
			marketOfferIdsForItemLength = 0,
			marketOfferIds = [],
			marketOfferIdsLength = 0,
			playerAtLocation = false,
			divClear = getClearHtml(),
			i = 0,
			locationItemCount = 0,
			locationItemCountInAuction = 0,
			locationItemCountToCollect = 0,
			locationItemTitle = '',
			itemCountHtml = '',
			$townPurchasedItemsTab = null,
			$townPurchasedItemsTabClose = null,
			hasItemPurchaseFinish = false,
			hasItemPurchaseProgress = false,
			hasTownPurchaseFinish = false,
			hasTownPurchaseProgress = false,
			townPurchaseFlags = {};
		bigSizeItems = bigSizeItems || false;
		displayHeadingInfo = displayHeadingInfo || false;
		if (location.items) {
			locationItems = location.items;
			playerAtLocation = isPlayerAtLocation(locationX, locationY);
			if (displayHeadingInfo) {
				//set HTML for heading
				if (playerAtLocation) {
					//purchase all
					itemCollectHtml = '<a class="button_wrap button" href="javascript:void(0);">' +
						'<span class="button_left"></span>' +
						'<span class="button_middle">Collect all</span>' +
						'<span class="button_right"></span>' +
						'<span style="clear: both;"></a></span>';
				} else {
					itemCollectHtml = "To collect all items you need to be in " + locationName + " town";
				}
				$itemCollect = jQuery("<div>")
					.html(itemCollectHtml);
				$container.append(divClear).append($itemCollect).append(divClear);
			}
			//parse all items for location
			for (itemId in locationItems) {
				itemId = parseInt(itemId, 10);
				if (!isNaN(itemId) && itemId > 0) {
					hasItemPurchaseFinish = false;
					hasItemPurchaseProgress = false;
					locationItem = locationItems[itemId];
					locationItemCount = locationItem.count;
					locationItemCountInAuction = locationItem.countItemInAuction;
					locationItemCountToCollect = locationItemCount - locationItemCountInAuction;
					if (locationItemCountToCollect > 0) {
						hasItemPurchaseFinish = true;
					}
					if (locationItemCountInAuction > 0) {
						hasItemPurchaseProgress = true;
					}
					locationItemTitle = locationItem.name;
					locationItemTitle = locationItemTitle + '<br/> You can collect ' + locationItemCountToCollect + ', ' +
						locationItemCountInAuction + ' are still in auction';
					itemCountHtml = '<div class="bag_item_count" style="cursor: default; "><p>' + locationItemCount + '</p></div>';
					if (bigSizeItems) {
						itemBlockHtml = '<span class="bag_item"><div class="bag_item yield auctionable">' +
							'<img src="' + locationItem.image + '" alt="' + locationItem.name + '" title="' + locationItemTitle + '" style="max-height: 73px;" />' +
							itemCountHtml +
							'</div></span>';
					} else {
						itemBlockHtml = '<div class="popup_yield_image ' + prefix + 'BagItemSmall">' +
							'<img src="' + locationItem.image_micro + '" alt="' + locationItem.name + '" title="' + locationItemTitle + '" style="max-height: 43px;" />' +
							itemCountHtml +
							'</div>';
					}
					itemBlockHtml = itemBlockHtml + divClear;
					if (playerAtLocation) {
						marketOfferIdsForItem = locationItem.marketOfferIds;
						marketOfferIdsForItemLength = marketOfferIdsForItem.length;
						if (marketOfferIdsForItemLength > 0) {
							for (i = 0; i < marketOfferIdsForItemLength; i = i + 1) {
								marketOfferIds.push(marketOfferIdsForItem[i]);
							}
						}
					}
					itemBlockCssClass = prefix + "ItemBlock";
					//add under auction specific class 
					if (hasItemPurchaseProgress) {
						itemBlockCssClass = itemBlockCssClass + " " + prefix + "ItemPurchaseProgress";
					}
					if (hasItemPurchaseFinish) {
						itemBlockCssClass = itemBlockCssClass + " " + prefix + "ItemPurchaseFinish";
					}
					$itemBlock = jQuery("<div>")
						.attr({"class": itemBlockCssClass})
						.html(itemBlockHtml);
					$container.append($itemBlock);
				}
				if (!hasTownPurchaseProgress && hasItemPurchaseProgress) {
					hasTownPurchaseProgress = true;
				}
				if (!hasTownPurchaseFinish && hasItemPurchaseFinish) {
					hasTownPurchaseFinish = true;
				}
			}
			if (playerAtLocation && displayHeadingInfo) {
				marketOfferIdsLength = marketOfferIds.length;
				if (marketOfferIdsLength > 0) {
					$itemCollect.click(function () {
						$townPurchasedItemsTab = jQuery(townPurchasedItemsTab.divMain);
						//close window
						$townPurchasedItemsTabClose = $townPurchasedItemsTab.find(".tw2gui_window_buttons_close");
						Ajax.remoteCall('building_market', 'fetch_all', {
							townId: locationId
						}, function (data) {
							var hasError = false;
							if (data) {
								if (data.error && data.error === true) {
									hasError = true;
								}
							}
							if (hasError) {
								alert(data.msg);
							} else {
								afterCollectAllPurchasedItems($townPurchasedItemsTabClose);
							}
						});
						//Market.getInstance(locationId).fetchAll();
						//for (i = 0; i < marketOfferIdsLength; i = i + 1) {
							//Market.getInstance(locationId).fetch(marketOfferIds[i], locationX, locationY);
						//}
					});
				}
			}
		}
		townPurchaseFlags = {
			hasTownPurchaseProgress: hasTownPurchaseProgress,
			hasTownPurchaseFinish: hasTownPurchaseFinish
		};
		return townPurchaseFlags;
	}
	/**
	 * Town purchase items window
	 */
	function townPurchasedItemsWindow(location) {
		var townPurchasedItemsTab = null,
			$townPurchasedItemsTab = null,
			townPurchasedItemsTabContent,
			locationName = location.name,
			locationId = parseInt(location.id, 10),
			tabIdentifier = "",
			$tabHeader = null,
			$tabHtml = null;
		tabIdentifier = prefix + locationId + "Items";
		townPurchasedItemsTab = wman.open(tabIdentifier + " nominimize noreload").setMiniTitle(locationName)
			.addTab(locationName, tabIdentifier, function () {});
		$townPurchasedItemsTab = jQuery(townPurchasedItemsTab.divMain);
		townPurchasedItemsTabContent = $townPurchasedItemsTab.find(".tw2gui_window_content_pane");
		$tabHeader = jQuery("<h2>").attr({"class": prefix + "Message"}).html("Items to be purchased from " + locationName);
		$tabHtml = jQuery("<div>").css({"margin": "5px", "overflow": "auto", "height": "355px"});
		paintTownPurchasedItems(location, $tabHtml, true, true, townPurchasedItemsTab);
		townPurchasedItemsTabContent.append($tabHeader).append($tabHtml);
	}
	/**
	 * Paint location
	 */
	function paintTown(location) {
		var x,
			y,
			$townEl,
			townStyle = "",
			setClass = "",
			locationX = 0,
			locationY = 0,
			locationId = "",
			locationName = "",
			$locationRow = null,
			$locationTownRow = null,
			$locationTown = null,
			$locationTownCenter = null,
			$locationCollect = null,
			baseId = prefix + "Location",
			baseLocationId = "",
			$locationItems = null,
			townPurchaseFlags = {};
		locationX = location.x;
		locationY = location.y;
		locationId = parseInt(location.id, 10);
		if (isNaN(locationId) || locationId < 0) {
			locationId = 0;
		}
		locationName = location.name;
		baseLocationId = baseId + locationId;
		x = Math.round(locationX / 1000 * parseInt(mapWidth, 10) - 3);
		y = Math.round(locationY / 1000 * parseInt(mapHeight, 10) - 3);
		townStyle = "top: " + y + "px;right: " + x + "px;";
		setClass = prefix + "Town";
		if (location.extraClass) {
			setClass = setClass + " " + location.extraClass;
		}
		$townEl = jQuery("<div>")
			.attr({"id": baseLocationId + "OnMap", "class": setClass, "style": townStyle, "title": "Center map on: " + locationName})
			.click(function () {
				WMap.scroll_map_to_pos(locationX, locationY);
			});
		$mapEl.append($townEl);
		//append town to towns list
		$locationRow = jQuery("<div>")
			.attr({"id": baseLocationId + "Row", "class": baseId + "Row"});
		$locationItems = jQuery("<div>")
			.attr({"id": baseLocationId + "ItemsRow", "class": baseId + "ItemsRow"});
		$locationTownRow = jQuery("<div>")
			.attr({"id": baseLocationId + "TownRow", "class": baseId + "TownRow"});
		$locationTownCenter = jQuery("<div>")
			.attr({"class": prefix + "TownCenter", "title": "Center map on: " + locationName})
			.click(function () {
				WMap.scroll_map_to_pos(locationX, locationY);
			});
		$locationTown = jQuery("<div>")
			.attr({"id": baseLocationId, "class": baseId + "Name"})
			.html(locationName)
			.hover(
				function () {
					jQuery("#" + baseLocationId + "OnMap").addClass("hover");
				},
				function () {
					jQuery("#" + baseLocationId + "OnMap").removeClass("hover");
				}
			);
		$locationCollect = jQuery("<div>")
			.attr({"class": baseId + "Collect", "title": "Click to see items that can be collected from " + locationName})
			.click(function () {
				townPurchasedItemsWindow(location);
			});
		if (location.itemsCount && location.itemsCount > 0) {
			$locationTown
				.attr({"title": "Open town " + locationName})
				.click(function () {
					var townLocation = null;
					if (locationId > 0) {
						townLocation = {"town_id": locationId};
					}
					AjaxWindow.show("town", townLocation, locationX + "_" + locationY);
				});
			townPurchaseFlags = paintTownPurchasedItems(location, $locationItems, false, false, null);
			if (townPurchaseFlags.hasTownPurchaseProgress) {
				$townEl.addClass(prefix + "TownPurchaseProgress");
				$locationRow.addClass(prefix + "TownPurchaseProgress");
			}
			if (townPurchaseFlags.hasTownPurchaseFinish) {
				$townEl.addClass(prefix + "TownPurchaseFinish");
				$locationRow.addClass(prefix + "TownPurchaseFinish");
			}
		} else {
			//no items to collect from here
			$locationCollect.css({"display": "none"});
		}
		$locationTownRow.append($locationTownCenter).append($locationCollect).append($locationTown);
		$locationRow.append($locationTownRow).append(getClearHtml()).append($locationItems);
		$townsEl.append($locationRow);
	}
	/**
	 * Create HTML block
	 */
	function createHtmlBlock(blockId, emptyBlock) {
		var $block = jQuery("#" + prefix + blockId);
		emptyBlock = emptyBlock || true;
		if ($block.length === 0) {
			$block = jQuery("<div>")
				.attr({"id": prefix + blockId});
		}
		if (emptyBlock) {
			$block.html("");
		}
		return $block;
	}
	/**
	 * Populate filters block
	 */
	function populateFiltersBlock($filters) {
		var filtersHtml = '',
			divClear = getClearHtml(),
			$purchasedItemsAll = null,
			purchasedItemsAllLabel = '',
			$purchasedItemsFinish = null,
			purchasedItemsFinishLabel = '',
			$purchasedItemsProgress = null,
			purchasedItemsProgressLabel = '';
		$filters.html("");
		filtersHtml = "Purchased items: ";
		//all
		$purchasedItemsAll = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterAll", "checked": "checked"})
			.click(function () {
				$mapEl.removeClass();
				$townsEl.removeClass();
			});
		purchasedItemsAllLabel = '<label for="' + prefix + 'PurchasedItemsFilterAll" ' +
			'title="Show all towns and items">All</label>';
		//finish
		$purchasedItemsFinish = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterFinish"})
			.click(function () {
				$mapEl.removeClass().addClass(prefix + "FilterPurchaseFinish");
				$townsEl.removeClass().addClass(prefix + "FilterPurchaseFinish");
			});
		purchasedItemsFinishLabel = '<label for="' + prefix + 'PurchasedItemsFilterFinish" ' +
			'title="Show only towns and items that you can collect now">Finished</label>';
		//progress
		$purchasedItemsProgress = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterProgress"})
			.click(function () {
				$mapEl.removeClass().addClass(prefix + "FilterPurchaseProgress");
				$townsEl.removeClass().addClass(prefix + "FilterPurchaseProgress");
			});
		purchasedItemsProgressLabel = '<label for="' + prefix + 'PurchasedItemsFilterProgress" ' +
			'title="Show only towns and items from where you have placed bids and auction didn\'t finished">Progress</label>';
		$filters.append(divClear).append(filtersHtml)
			.append($purchasedItemsAll).append(purchasedItemsAllLabel)
			.append($purchasedItemsFinish).append(purchasedItemsFinishLabel)
			.append($purchasedItemsProgress).append(purchasedItemsProgressLabel)
			.append(divClear);
		return $filters;
	}
	/**
	 * Plot market purchase data
	 */
	function plotData() {
		var i = 0,
			j = 0,
			otherClass = [],
			$map,
			$filters = null,
			$towns,
			$square,
			clearHtml = getClearHtml();
		setMessage("towns from where you need to collect purchased items");
		$map = createHtmlBlock("Map");
		$filters = createHtmlBlock("Filters", false);
		$filters = populateFiltersBlock($filters);
		$towns = createHtmlBlock("Towns");
		for (j = 1; j < 5; j = j + 1) {
			for (i = 1; i < 11; i = i + 1) {
				otherClass = [];
				if (i === 1) {
					otherClass.push("left");
				}
				if (j === 1) {
					otherClass.push("top");
				}
				otherClass.push(prefix + "Square");
				otherClass = otherClass.join(" ");
				$square = jQuery("<div>").attr({"id": prefix + "Square" + i + "_" + j, "class": otherClass});
				$map.append($square);
			}
			$map.append(clearHtml);
		}
		marketHelperTabContent.append($map).append($filters).append($towns);
		$mapEl = jQuery("#" + prefix + "Map");
		$filtersEl = jQuery("#" + prefix + "Filters");
		$townsEl = jQuery("#" + prefix + "Towns");
		for (i = 0; i < townIndex; i = i + 1) {
			paintTown(townInfo[i]);
			if (i % 2 === 1) {
				$townsEl.append(clearHtml);
			}
		}
		createTabHelpContent();
		endLoading();
	}
	/**
	 * Set townIndex for townId
	 */
	function setTownIndexForId(townId, townIndex) {
		townIdToIndex[townId] = townIndex;
	}
	/**
	 * Get townIndex based on townId
	 */
	function getTownIndexForId(townId) {
		return townIdToIndex[townId];
	}
	/**
	 * Check if auction for item is in progress
	 */
	function isAuctionInProgress(itemData) {
		var auctionInProgress = false,
			auctionEndIn = 0,
			currentBid = 0,
			maxPrice = 0;
		auctionEndIn = parseInt(itemData.auction_ends_in, 10);
		if (auctionEndIn > 0) {
			maxPrice = parseInt(itemData.max_price, 10);
			if (isNaN(maxPrice)) {
				auctionInProgress = true;
			} else {
				currentBid = parseInt(itemData.current_bid, 10);
				if (currentBid < maxPrice) {
					auctionInProgress = true;
				}
			}
		}
		return auctionInProgress;
	}
	/**
	 * Add purchased item to town
	 */
	function addPurchaseItemToTown(purchaseData, itemsData) {
		var itemCount = 1,
			usedTownIndex = 0,
			marketTownId = 0,
			itemData = {},
			thisItemId = 0,
			townItems = {},
			townItemsCount = 0,
			oldItemCount = 0,
			townData = {},
			oldItemInAuction = 0,
			addCountItemInAuction = 0,
			isItemInAuction = false;
		marketTownId = purchaseData.market_town_id;
		usedTownIndex = getTownIndexForId(marketTownId);
		if (townInfo[usedTownIndex]) {
			townData = townInfo[usedTownIndex];
			townItems = townData.items;
			thisItemId = purchaseData.item_id;
			if (townItems[thisItemId]) {
				itemData = townItems[thisItemId];
				oldItemCount = itemData.count;
				oldItemInAuction = itemData.countItemInAuction;
				itemCount = oldItemCount + parseInt(purchaseData.item_count, 10);
			} else {
				itemData = itemsData[thisItemId];
				itemData.marketOfferIds = [];
			}
			isItemInAuction = isAuctionInProgress(purchaseData);
			if (isItemInAuction) {
				addCountItemInAuction = 1;
			}
			itemData.countItemInAuction = oldItemInAuction + addCountItemInAuction;
			itemData.count = itemCount;
			itemData.marketOfferIds.push(purchaseData.market_offer_id);
			townItemsCount = townData.itemsCount + itemCount - oldItemCount;
			townInfo[usedTownIndex].items[thisItemId] = itemData;
			townInfo[usedTownIndex].itemsCount = townItemsCount;
		}
	}
	/**
	 * Filter response from AJAX
	 */
	function filterMarketPurchaseResponse(data, itemsData) {
		var dataLength = data.length,
			i = 0,
			marketTownId = "",
			marketTownName = "",
			marketTownX = "",
			marketTownY = "",
			marketTownCoords = "",
			purchaseData = {},
			isCurrentLocation = false,
			useTownIndex = 0,
			startParseFrom = 0,
			firstMarketOfferId = 0;
		if (dataLength === marketItemsPerPage) {
			if (lastMarketOfferId !== 0) {
				firstMarketOfferId = data[0].market_offer_id;
				if (firstMarketOfferId === lastMarketOfferId) {
					startParseFrom = 1;
				}
			}
			lastMarketOfferId = firstMarketOfferId = data[10].market_offer_id;
		}
		for (i = startParseFrom; i < dataLength; i = i + 1) {
			purchaseData = data[i];
			marketTownId = purchaseData.market_town_id;
			marketTownName = purchaseData.market_town_name;
			marketTownX = purchaseData.market_town_x;
			marketTownY = purchaseData.market_town_y;
			marketTownCoords = marketTownX + "_" + marketTownY;
			isCurrentLocation = false;
			useTownIndex = townIndex;
			if (currentLocationXY === marketTownCoords) {
				isCurrentLocation = true;
				useTownIndex = 0;
			}
			if (townCoords.indexOf(marketTownCoords) === -1) {
				//town isn't added in the list of towns
				if (marketTownName === null) {
					marketTownName = "ghost town";
				}
				if (isCurrentLocation) {
					townInfo[useTownIndex].name = townInfo[0].name + " (" + marketTownName + ")";
				} else {
					townInfo[useTownIndex] = {"name": marketTownName, "x": marketTownX, "y": marketTownY};
				}
				townInfo[useTownIndex].id = marketTownId;
				townInfo[useTownIndex].items = {};
				townInfo[useTownIndex].itemsCount = 0;
				townCoords[townCoordsIndex] = marketTownCoords;
				setTownIndexForId(marketTownId, useTownIndex);
				if (!isCurrentLocation) {
					townIndex = townIndex + 1;
				}
				townCoordsIndex = townCoordsIndex + 1;
			}
			//add purchase item to town info
			addPurchaseItemToTown(purchaseData, itemsData);
		}
	}
	/**
	 * Parse market purchase response
	 */
	function parseResponse(data, isPurchase) {
		var itemsData = {},
			itemsAtPage = 0,
			endOfMarketRequests = true;
		isPurchase = isPurchase || true;
		if (data) {
			if (data.msg) {
				if (data.msg.item_info) {
					itemsData = data.msg.item_info;
				}
				if (data.msg.search_result) {
					itemsAtPage = data.msg.search_result.length;
					if (itemsAtPage > 0) {
						if (isPurchase) {
							//parse market purchase
							filterMarketPurchaseResponse(data.msg.search_result, itemsData);
							if (!is134 && itemsAtPage === marketItemsPerPage) {
								endOfMarketRequests = false;
								getPurchase();
							}
						} else {
							//parse market sell
						}
					}
				} else {
					console.log(" cannot get data.msg.search_result");
				}
			} else {
				console.log(" cannot get data.msg");
			}
		} else {
			console.log(" cannot get data");
		}
		if (endOfMarketRequests) {
			if (isPurchase) {
				//end of market purchase
				plotData();
			} else {
				//end of market sell
			}
		}
	}
	/**
	 * Get purchase data
	 */
	function getPurchase() {
		lastPageParsed = lastPageParsed + 1;
		jQuery.ajax({
			url: gameUrl + "?window=building_market&mode=fetch_bids",
			type: "POST",
			data: {page: lastPageParsed},
			dataType: "json",
			success: function (data) {
				//console.log(data);
				parseResponse(data, true);
			}
		});
	}
	/**
	 * Calculate
	 */
	function calculate() {
		initializeParams();
		buildWindow();
		marketHelperTabReopen();
		if (!debug) {
			getPurchase();
		}
	}
	/**
	 * Add market helper icon/button
	 */
	function addButton() {
		var $scriptButton = jQuery("#" + prefix + "Button");
		if ($scriptButton.length === 0) {
			$scriptButton = jQuery("<img>")
				.attr({"src": scriptIconSrc, "id": prefix + "Button", "alt": scriptName,
					"title": scriptName, "style": "position:absolute;left:270px;top:10px;cursor:pointer;"});
			jQuery('#footer_minimap_icon').parent().after($scriptButton);
		}
		$scriptButton.unbind().click(function () {
			dyMarketHelper.calculate();
		});
	}
	/**
	 * Register script with the-west
	 */
	function registerScript() {
		var minVersion = "1.33",
			maxVersion = "1.34";
		if (TheWestApi) {
			TheWestApi.register(prefix, scriptName, minVersion, maxVersion, scriptAuthor, scriptWebsite);
		}
	}
	/**
	 * Callback function to prompt user for update
	 */
	function updateCallback(currentVersion, latestVersion) {
		var autoUpdateTab = null,
			autoUpdateTabContent,
			updatePrefix = prefix + "Updater",
			$updateHtml = null,
			$updateHeader = null,
			contentHtml = "";
		autoUpdateTab = wman.open(updatePrefix + " nominimize noreload").setMiniTitle("Market Helper update")
			.addTab("MH updater", updatePrefix, function () {});
		autoUpdateTabContent = jQuery(autoUpdateTab.divMain).find(".tw2gui_window_content_pane");
		$updateHeader = jQuery("<h2>").attr({"class": prefix + "Message"}).html("Market helper - new version available");
		contentHtml = 'You are using version: ' + currentVersion + '<br/>' +
			'Latest version is: ' + latestVersion + '<br/>' +
			'Please visit <a href="' + scriptWebsite + '" target="_blank">' + scriptWebsite + '</a> ' +
			'and update to the latest version.<br/>' +
			'After update refresh this page, or click on the link: ' +
			'<a href="' + gameUrl + '">' + gameUrl + '</a>';
		$updateHtml = jQuery("<div>").css({"margin": "5px"}).html(contentHtml);
		autoUpdateTabContent.append($updateHeader).append($updateHtml);
	}
	/**
	 * Check if game version is 1.34
	 */
	function checkVersion134() {
		if (TheWestApi && TheWestApi.version) {
			if (TheWestApi.version === "1.34") {
				is134 = true;
			}
		}
	}
	/**
	 * Initialize script
	 */
	function init(waitCounter) {
		waitCounter = waitCounter || 0;
		if (waitCounter < 10) {
			waitCounter = waitCounter + 1;
			if (typeof jQuery === "undefined") {
				window.setTimeout(function () { init(waitCounter); }, 100);
			} else {
				checkVersion134();
				insertStyle();
				addButton();
				//comment register script, TheWestApi not working properly
				//registerScript();
			}
		}
	}
	//public
	return {
		calculate: calculate,
		init: init,
		updateCallback: updateCallback,
		getTownInfo: getTownInfo,
		getMarketHelperTab: getMarketHelperTab,
		modifyBaseFunction: modifyBaseFunction
	};
};

/**
 * Greasemonkey base support
 * @copyright      2009, 2010 James Campos
 * @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (typeof GM_deleteValue === "undefined") {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};
	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	};
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name),
			type = "";
		if (!value) {
			return defaultValue;
		}
		type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == "true";
			case 'n':
				return Number(value);
			default:
				return value;
		}
	};
	GM_log = function(message) {
		console.log(message);
	};
	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
}

/**
 * Auto update
 */
var dyAutoUpdate = (function () {
	"use strict";
	/*global ActiveXObject, XMLHttpRequest, dyMarketHelperGeneral, GM_xmlhttpRequest, GM_addStyle, GM_deleteValue, GM_getValue, GM_setValue, GM_log, navigator*/
	var updateAvailable = false,
		currentVersion = dyMarketHelperGeneral.getVersion(),
		prefix = "",
		latestVersion = "0",
		alwaysCheck = false,
		checkAfterDays = 1;
	function getUpdateAvailable() {
		return updateAvailable;
	}
	function getCurrentVersion() {
		return currentVersion;
	}
	function getLatestVersion() {
		return latestVersion;
	}
	function runUpdateScript() {
		var dyMarketHelperUpdateJsString = "dyMarketHelperUpdate_js",
			dyMarketHelperUpdateJs = null,
			dyMarketHelperUpdateString = "if (dyMarketHelper) { dyMarketHelper.updateCallback('" + currentVersion + "', '" + latestVersion + "'); }";
		dyMarketHelperUpdateJs = document.getElementById(dyMarketHelperUpdateJsString);
		if (!dyMarketHelperUpdateJs) {
			dyMarketHelperUpdateJs = document.createElement("SCRIPT");
			dyMarketHelperUpdateJs.setAttribute("id", dyMarketHelperUpdateJsString);
			dyMarketHelperUpdateJs.innerHTML = dyMarketHelperUpdateString;
			document.getElementsByTagName("body")[0].appendChild(dyMarketHelperUpdateJs);
		} else {
			dyMarketHelperUpdateJs.innerHTML = dyMarketHelperUpdateString;
		}
	}
	/**
	 * Transform version string to number
	 */
	function versionToNumber(versionString) {
		var versionNumber = 0;
		versionNumber = versionString.replace(/\./g, "");
		versionNumber = parseInt(versionNumber, 10);
		if (isNaN(versionNumber) || versionNumber < 0) {
			versionNumber = 0;
		}
		return versionNumber;
	}
	/**
	 * Check for update
	 */
	function parseUrlResponse(data) {
		var currentVersionNumber = 0,
			latestVersionNumber = 0,
			versionReg = /Version:<\/b>\s*([0-9\.]+)/;
		currentVersionNumber = versionToNumber(currentVersion);
		latestVersion = data.match(versionReg)[1];
		latestVersionNumber = versionToNumber(latestVersion);
		if (latestVersionNumber > 0 && currentVersionNumber < latestVersionNumber) {
			updateAvailable = true;
			runUpdateScript();
		}
	}
	function errorAtXhr() {
		//loadScript();
	}
	/**
	 * Greasemonkey AJAX
	 */
	function doGreasemonkeyAjax(reqMethod, reqUrl, reqData, successFn, errorFn) {
		GM_xmlhttpRequest({
			method: reqMethod,
			url: reqUrl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Referer": document.location
			},
			onload: function (responseDetails) {
				if (successFn) {
					successFn(responseDetails.responseText);
				}
			}
		});
	}
	/**
	 * XHR
	 */
	function doAjax(reqMethod, reqUrl, reqData, successFn, errorFn) {
		var xhr = null,
			aSync = true,
			noCache = true,
			concatString = "?";
		try {
			xhr = new XMLHttpRequest(); //FireFox, Safari, Chrome, Opera ...
		} catch (e) {
			//console.log(e.message);
			try {
				xhr = new ActiveXObject('Msxml2.XMLHTTP'); //IE
			} catch (e2) {
				//console.log(e2.message);
				try {
					xhr = new ActiveXObject('Microsoft.XMLHTTP'); //IE
				} catch (e3) {
					//console.log(e3.message);
					//XMLHttpRequest not supported
				}
			}
		}
		if (xhr) {
			xhr.onreadystatechange  = function () {
				if (xhr.readyState  === 4) {
					if (xhr.status  === 200) {
						//XHR request is ok
						//xhr.responseText;
						if (successFn) {
							successFn(xhr.responseText);
						}
					} else {
						//ERROR
						if (errorFn) {
							errorFn(xhr.status);
						}
					}
				}
			};
			try {
				if (noCache === true) {
					reqUrl = reqUrl + "?" + (new Date()).getTime();
					concatString = "&";
				}
				if (reqMethod.toUpperCase() === "GET") {
					reqUrl = reqUrl + concatString + reqData;
					reqData = null;
				}
				xhr.open(reqMethod, reqUrl, aSync);
				try {
					xhr.send(reqData);
				} catch (eS) {
					//we have error when sending request
					console.log(eS.message);
				}
			} catch (eL) {
				//we have error when loading request
				console.log(eL.message);
			}
		} else {
			//cannot execute request
		}
	}
	/**
	 * XHR request
	 */
	function doRequest(reqMethod, reqUrl, reqData, successFn, errorFn) {
		if (GM_xmlhttpRequest) {
			doGreasemonkeyAjax(reqMethod, reqUrl, reqData, successFn, errorFn);
		} else {
			doAjax(reqMethod, reqUrl, reqData, successFn, errorFn);
		}
	}
	/**
	 * Test for update script
	 */
	function testUpdate() {
		var executeRequest = false,
			lastUpdateTime = 0,
			currentTime = 0,
			maxDiference = 0,
			checkDifference = 0;
		if (alwaysCheck) {
			executeRequest = true;
		} else {
			lastUpdateTime = parseInt(GM_getValue(prefix + "LastCheck", 0), 10);
			currentTime = (new Date()).getTime();
			checkDifference = currentTime - lastUpdateTime;
			maxDiference = checkAfterDays * 24 * 60 * 60 * 1000;
			if (checkDifference >= maxDiference) {
				GM_setValue(prefix + "LastCheck", currentTime);
				executeRequest = true;
			}
		}
		if (executeRequest) {
			doRequest("GET", dyMarketHelperGeneral.getWebsite(), "", parseUrlResponse, errorAtXhr);
		}
	}
	/**
	 * Initialize auto-update
	 */
	function init(appPrefix) {
		prefix = appPrefix;
		testUpdate();
	}
	//public
	return {
		init: init,
		errorAtXhr: errorAtXhr,
		doRequest: doRequest,
		getUpdateAvailable: getUpdateAvailable,
		getCurrentVersion: getCurrentVersion,
		getLatestVersion: getLatestVersion
	};
}());

/**
 * add MarketHelper script
 */
function loadMarketHelperScript() {
	"use strict";
	/*global document, dyMarketHelperGeneral*/
	var dyMarketHelperJsString = "dyMarketHelper_js",
		dyMarketHelperJs = null,
		currentVersion = dyMarketHelperGeneral.getVersion(),
		scriptWebsite = dyMarketHelperGeneral.getWebsite(),
		dyMarketHelperString = "",
		dyMarketHelperParams = "";
	dyMarketHelperParams = "'" + currentVersion + "', '" + scriptWebsite + "'";
	dyMarketHelperString = "var dyMarketHelper = (" + dyMarketHelperCode.toString() + "(" + dyMarketHelperParams + "));dyMarketHelper.init();";
	dyMarketHelperJs = document.getElementById(dyMarketHelperJsString);
	if (!dyMarketHelperJs) {
		dyMarketHelperJs = document.createElement("SCRIPT");
		dyMarketHelperJs.setAttribute("id", dyMarketHelperJsString);
		dyMarketHelperJs.innerHTML = dyMarketHelperString;
		document.getElementsByTagName("body")[0].appendChild(dyMarketHelperJs);
	} else {
		dyMarketHelperJs.innerHTML = dyMarketHelperString;
	}
}
//init script
if (location.href.indexOf(".the-west.") !== -1 && location.href.indexOf("game.php") !== -1) {
	loadMarketHelperScript();
	//check for updates
	dyAutoUpdate.init(dyMarketHelperGeneral.getPrefix());
}
