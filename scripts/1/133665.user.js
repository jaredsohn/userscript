// ==UserScript==
// @name         The-west aiuto mercato
// @version      1.3
// @description   The west Aiuto Mercato, permette di vedere le città da cui è necessario raccogliere gli oggetti acquistati
// @author       darkyndy
// @author versione italiana Tw81
// @include	     http://*.the-west.*/game.php*
// ==/UserScript==


/**
* Market Helper
* 
* @version 1.3
* Graphic adjustments
* Added the button to the displacement in the city
* 
* @version 1.2.8.4
* Fix to work for version 1.36
* 
* @version 1.2.8.3
* Fix number of items
* 
* @version 1.2.8.2
* Change icon position
* Fix script for game versions with old market layout
* 
* @version 1.2.8.1
* Fix duplicate items issue
* Add support back for 1.33 and new version (1.34 and 1.35) 
* 
* @version 1.2.8
* Fix to work for 1.35 game version
* Update script icon
* 
* @version 1.2.7
* Fix bug on item count after minimize
* Add loading at collect all purchased items
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
	var SCRIPT_VERSION = "1.3",
		SCRIPT_WEBSITE = "http://userscripts.org/scripts/show/133665";
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

function AjaxRequest(){
	var request = null;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();	// Mozilla, Opera, Safari + IE <7
	} else if (window.ActiveXObject) {
		try {
			request = new ActiveXObject ('Microsoft.XMLHTTP');	// IE <6
        } catch (e) {
        	request = new ActiveXObject ('Msxml2.XMLHTTP');	// IE <5
        }
	}
	return request;
}

function TownGo(){
	var request = AjaxRequest();
	if (request != null) {
		request.open ('POST', 'game.php?window=fingerboard&action=start&h='+h, false);//FrboardLocation, locationX + "_" + locationY
		request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
		request.onreadystatechange = function () {
			if(request.readyState == 4) {
				Tasks.replace_all(JSON.parse(request.responseText)['task_queue']);
			}
		};
		request.send(encodeURI('unitId='+Character.home_town.town_id+'&type=town'));
	}
}

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
		scriptName = "The-west aiuto Mercato",
		scriptAuthor = "Tw81",
		marketHelperTab = null,
		marketHelperTabContent = null,
		marketHelperTabLoader = null,
		$mapEl = null,
		$filtersEl = null,
		$townsEl = null,
		$helpEl = null,
		mapWidth = 671,
		mapHeight = 137,
		debug = false,
		gameUrl = "http://" + window.location.hostname + "/game.php",
		marketItemsPerPage = 11,
		lastMarketOfferId = 0,
		isVersionWithNewMarket = true,
		marketHelperTabReopenEventInProgress = false,
		scriptIconSrc = "data:image/png;base64," +
        "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",
		collectIconF =  "data:image/png;base64," +
        "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA" + "IGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAACnSURBVHjaYvhPIWAY" +
        "OgZsWtB35PPH96fINmBqZfidaXUpl9ENId6A0sAnNRGGvyZVJ17+/PHdKRQD1kwuOzu1POTB1DLs" +
        "eFKR35OGWNNfeb6a/zPc1X9NqIAb8oHh/////6eVhzzI99P6n+2tgRt7afzP8FD7n+6u9j/dXe1X" +
        "urvawWQvRXnqGECqF9Ld1Y/NbMnx+f///3tKAvEDfaOR4oQ0eDMTYACH+3HwkQYZCQAAAABJRU5E" +
        "rkJggg%3D%3D",
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
			"height: 140px;" +
			"border: 0;" +
			"position: relative;" +
			"margin: 0 12px;" +
			"overflow: auto;" +
			"}" +
			"." + prefix + "Square {" +
			"width: 66px;" +
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
			"width: 650px;" +
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
			"." + prefix + "locationFrboard {" +
			"cursor: pointer;" +
			"float: left;" +
			"background: transparent url(" + collectIconF + ") no-repeat;" +
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
			"background: #FFFF33;" +
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
		var initTown = {"name": "La tua posizione", "x": 0, "y": 0, "extraClass": prefix + "Current", "id": "currentLocation"},
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
	function getAjaxUrl(actionName) {
		var finalUrl = gameUrl,
			actionParam = "mode";
		if (isVersionWithNewMarket) {
			actionParam = "action";
		}
		switch (actionName) {
			case "fetch_bids":
				finalUrl = finalUrl + "?window=building_market&" + actionParam +"=fetch_bids"
                    break;
		}
		if (isVersionWithNewMarket) {
			finalUrl = finalUrl + "&h=" + h;
		}
		return finalUrl;
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
			helpContentHtml = '<b>Ogólne</b><br/>' +
				'Versione: ' + currentVersion + '<br/>' +
				'Script: <a href="' + scriptWebsite + '" target="_blank" title="' + scriptWebsite + ', otwórz w nowym oknie">' + scriptWebsite + '</a><br/>' +
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
			setMessage("Mappa acquisti");
		} else {
			displayHelpData = true;
			setMessage("Info");
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
		var html = '<h2 id="' + prefix + 'Message">Ładowanie</h2><br/>',
			tabName = "Acquisti",
			//tabName_ = "Sprzedaż na targu", // dodano
			$marketHelperTab = null;
		marketHelperTab = wman.open(prefix).setMiniTitle(tabName).setSize(750, 485)
			.addTab(tabName, prefix, marketHelperTabClick)
			//.addTab(tabName_, prefix + "Sprzedaż", marketHelperTabClick) // dodano
			.addTab("Info", prefix + "Info", marketHelperTabClick);
		$marketHelperTab = jQuery(marketHelperTab.divMain);
		marketHelperTabContent = $marketHelperTab.find(".tw2gui_window_content_pane");
		marketHelperTabLoader = $marketHelperTab.find(".tw2gui_window_pane div.loader");
		marketHelperTabContent.append(html);
		startLoading();
	}
	/**
* Functions to be executed at reload for market helper tab
*/
	function marketHelperTabReopenEvent() {
		if (!marketHelperTabReopenEventInProgress) {
			marketHelperTabReopenEventInProgress = true;
			initializeParams();
			buildWindow();
			getPurchase();
		}
	}
	/**
* Attach event for reopen market helper window
*/
	function marketHelperTabReopen() {
		//console.log("marketHelperTabReopen");
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
* Function executed after collect all was clicked for purchased items
*/
	function collectAllPurchasedItems(locationId, townPurchasedItemsTab) {
		var $townPurchasedItemsTab = null,
			$townPurchasedItemsTabClose = null,
			$townPurchasedItemsTabLoad = null;
		if (townPurchasedItemsTab) {
			if (locationId > 0) {
				$townPurchasedItemsTab = jQuery(townPurchasedItemsTab.divMain);
				//close window
				$townPurchasedItemsTabClose = $townPurchasedItemsTab.find(".tw2gui_window_buttons_close");
				$townPurchasedItemsTab.find(".tw2gui_window_pane div.loader").toggle(true);
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
					}
					afterCollectAllPurchasedItems($townPurchasedItemsTabClose);
				});
			}
		}
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
						'<span class="button_middle">Ritira tutti gli oggetti</span>' +
						'<span class="button_right"></span>' +
						'<span style="clear: both;"></a></span>';
				} else {
					itemCollectHtml = "Per raccogliere tutti gli oggetti è neccessario essere nella città: " + locationName;
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
					locationItem.name = locationItem.name.replace(/"/gi, "");
					locationItemTitle = locationItem.name;
					locationItemTitle = locationItemTitle + '<br/> E\' possibile raccogliere ' + locationItemCountToCollect + ' oggetti/o ' + ', ' +
						locationItemCountInAuction + ' oggetti/o ' + ' sono ancora in asta';
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
						collectAllPurchasedItems(locationId, townPurchasedItemsTab);
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
		$tabHeader = jQuery("<h2>").attr({"class": prefix + "Message"}).html("Oggetti da acquistare presso:  " + locationName);
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
			$locationFrboard = null,
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
			.attr({"id": baseLocationId + "OnMap", "class": setClass, "style": townStyle, "title": "Centra nella mappa: " + locationName})
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
			.attr({"class": prefix + "TownCenter", "title": "Centra nella mappa: " + locationName})
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
		$locationFrboard = jQuery("<div>")
			.attr({"class": prefix + "locationFrboard"})
			.hover(
				function () {
					jQuery("#" + baseLocationId + "OnMap").addClass("hover");
				},
				function () {
					jQuery("#" + baseLocationId + "OnMap").removeClass("hover");
				}
			);
		$locationCollect = jQuery("<div>")
			.attr({"class": baseId + "Collect", "title": "Clicca per visualizzare gli articoli che possono essere raccolti presso: " + locationName})
			.click(function () {
				townPurchasedItemsWindow(location);
			});
		if (location.itemsCount && location.itemsCount > 0) {
			$locationTown
				.attr({"title": "Città: " + locationName})
				.click(function () {
					var townLocation = null;
					if (locationId > 0) {
						townLocation = {"town_id": locationId};
					}
					AjaxWindow.show("town", townLocation, locationX + "_" + locationY);
				});
			$locationFrboard
				.attr({"title": "Vai alla Città: " + locationName})
				.click(function () {
					var FrboardLocation = null; //Open town
					if (locationId > 0) {
						FrboardLocation = {"town_id": locationId};
					}
					AjaxWindow.show("fingerboard", FrboardLocation, locationX + "_" + locationY);
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
		$locationTownRow.append($locationFrboard).append($locationTownCenter).append($locationCollect).append($locationTown);
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
		filtersHtml = "Articoli acquistati: ";
		//all
		$purchasedItemsAll = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterAll", "checked": "checked"})
			.click(function () {
				$mapEl.removeClass();
				$townsEl.removeClass();
			});
		purchasedItemsAllLabel = '<label for="' + prefix + 'PurchasedItemsFilterAll" ' +
			'title="Mostra tutte le città e gli oggetti acquistati e in fase d\'asta">Tutto</label>';
		//finish
		$purchasedItemsFinish = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterFinish"})
			.click(function () {
				$mapEl.removeClass().addClass(prefix + "FilterPurchaseFinish");
				$townsEl.removeClass().addClass(prefix + "FilterPurchaseFinish");
			});
		purchasedItemsFinishLabel = '<label for="' + prefix + 'PurchasedItemsFilterFinish" ' +
			'title="Mostra solo le città e gli oggetti che è possibile raccogliere subito">Acquisti</label>';
		//progress
		$purchasedItemsProgress = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterProgress"})
			.click(function () {
				$mapEl.removeClass().addClass(prefix + "FilterPurchaseProgress");
				$townsEl.removeClass().addClass(prefix + "FilterPurchaseProgress");
			});
		purchasedItemsProgressLabel = '<label for="' + prefix + 'PurchasedItemsFilterProgress" ' +
			'title="Mostra solo le città e gli oggetti in fase d\'asta">Aste</label>';
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
		setMessage("Mappa Acquisti");
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
		marketHelperTabReopenEventInProgress = false;
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
* Test if market offer wasn't added to town purchased items
*/
	function testUniqueMarketOfferId(usedTownIndex, thisItemId, thisMarketOfferId) {
		var isUnique = true,
			thisMarketOfferIds = [];
		if (townInfo[usedTownIndex]) {
			if (townInfo[usedTownIndex].items[thisItemId]) {
				if (townInfo[usedTownIndex].items[thisItemId].marketOfferIds) {
					thisMarketOfferIds = townInfo[usedTownIndex].items[thisItemId].marketOfferIds;
					if (thisMarketOfferIds.indexOf(thisMarketOfferId) > -1) {
						isUnique = false;
					}
				}
			}
		}
		return isUnique;
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
			isItemInAuction = false,
			thisMarketOfferId = 0,
			marketOfferIdUnique = false;
		marketTownId = purchaseData.market_town_id;
		usedTownIndex = getTownIndexForId(marketTownId);
		if (townInfo[usedTownIndex]) {
			townData = townInfo[usedTownIndex];
			townItems = townData.items;
			thisItemId = purchaseData.item_id;
			thisMarketOfferId = purchaseData.market_offer_id;
			marketOfferIdUnique = testUniqueMarketOfferId(usedTownIndex, thisItemId, thisMarketOfferId);
			itemCount = parseInt(purchaseData.item_count, 10);
			if (thisMarketOfferId) {
				if (townItems[thisItemId]) {
					itemData = townItems[thisItemId];
					oldItemCount = itemData.count;
					oldItemInAuction = itemData.countItemInAuction;
					itemCount = oldItemCount + itemCount;
				} else {
					if (isVersionWithNewMarket) {
						itemData = Object.create(ItemManager.get(thisItemId));
					} else {
						if (itemsData[thisItemId]) {
							itemData = Object.create(itemsData[thisItemId]);
						} else {
							return;
						}
					}
					itemData.marketOfferIds = [];
				}
				isItemInAuction = isAuctionInProgress(purchaseData);
				if (isItemInAuction) {
					addCountItemInAuction = 1;
				}
				itemData.countItemInAuction = oldItemInAuction + addCountItemInAuction;
				itemData.count = itemCount;
				itemData.marketOfferIds.push(thisMarketOfferId);
				townItemsCount = townData.itemsCount + itemCount - oldItemCount;
				townInfo[usedTownIndex].items[thisItemId] = itemData;
				townInfo[usedTownIndex].itemsCount = townItemsCount;
			}
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
					marketTownName = "Città fantasma";
				}
				if (isCurrentLocation) {
					townInfo[useTownIndex].name = "( " + marketTownName + " )";
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
							if (!isVersionWithNewMarket && itemsAtPage === marketItemsPerPage) {
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
			url: getAjaxUrl("fetch_bids"),
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
		if (marketHelperTabReopenEventInProgress) {
			alert("Il mercato sta caricando i dati, attendere prego");
		} else {
			marketHelperTabReopenEventInProgress = true; 
			initializeParams();
			buildWindow();
			marketHelperTabReopen();
			if (!debug) {
				getPurchase();
			}
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
                       "title": scriptName, "style": "position:absolute;left:310px;top:10px;cursor:pointer;"});
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
			maxVersion = "2.00";
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
		autoUpdateTab = wman.open(updatePrefix + " nominimize noreload").setMiniTitle("Pomocnik tragarza update")
			.addTab("MH updater", updatePrefix, function () {});
		autoUpdateTabContent = jQuery(autoUpdateTab.divMain).find(".tw2gui_window_content_pane");
		$updateHeader = jQuery("<h2>").attr({"class": prefix + "Message"}).html("Pomocnik tragarza - dostępna jest nowa wersja");
		contentHtml = 'Używasz wersji: ' + currentVersion + '<br/>' +
			'Najnowsza wersja to: ' + latestVersion + '<br/>' +
			'Odwiedź stronę <a href="' + scriptWebsite + '" target="_blank">' + scriptWebsite + '</a> ' +
			'i zaktualizuj do najnoweszej wersji.<br/>' +
			'Po aktualizacji odśwież tą stronę lub kliknij ten link: ' +
			'<a href="' + gameUrl + '">' + gameUrl + '</a>';
		$updateHtml = jQuery("<div>").css({"margin": "5px"}).html(contentHtml);
		autoUpdateTabContent.append($updateHeader).append($updateHtml);
	}
	/**
* Check if game version is 2.00
*/
	function checkVersionWithNewMarket() {
		if (TheWestApi && TheWestApi.version) {
			insertStyle();
			addButton();
		} else {
			window.setTimeout(function () { checkVersionWithNewMarket(); }, 100);
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
				checkVersionWithNewMarket();
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
		modifyBaseFunction: modifyBaseFunction,
		newMarketVersion: function () {return isVersionWithNewMarket;}
	};
};

/**
* Greasemonkey base support
* @copyright      2009, 2010 James Campos
* @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
*/
/*global localStorage, GM_addStyle, GM_deleteValue, GM_getValue, GM_log, GM_setValue, console */
if (typeof GM_deleteValue === "undefined") {
	GM_addStyle = function (css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};
	GM_deleteValue = function (name) {
		localStorage.removeItem(name);
	};
	GM_getValue = function (name, defaultValue) {
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
	GM_log = function (message) {
		console.log(message);
	};
	GM_setValue = function (name, value) {
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