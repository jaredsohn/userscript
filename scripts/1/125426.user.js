// ==UserScript==
// @name           Boxcar - DreamCatalyst enhancements - preview
// @namespace      http://doireallyneedadomainname.com
// @description    Fixes a small number of issues with usability.
// @include        http://www.boxcarhosting.net/Boxcar/portal/*
// @include        http://www.boxcarhosting.com/Boxcar/portal/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

// ==================================================================== //
// Global variables
// ==================================================================== //

var body = document.body;
var uri = "" + document.location;


// ==================================================================== //
// Dialog related functions
// ==================================================================== //

var showDialog = function(id) {
	$("#modalOverlay").css( {
		height: document.body.clientHeight + "px",
		display: "block" } );
	$(id).css("display", "block");
	
	$("#modalOverlay").fadeTo(400, 0.6);
	$(id).fadeTo(400, 1.0);
};

var hideDialog = function(id, keepModalShown) {
	$(id).fadeTo(400, 0.0, function() {
		$(id).css("display", "none");
	});
	
	if(!keepModalShown) {
		$("#modalOverlay").fadeTo(400, 0.0, function() {
			$("#modalOverlay").css("display", "none");
		});
	}
};

var showDialogView = function(dialogId, viewIdToShow, associatedMenuId) {
	$(dialogId + " .activeMenuOption").removeClass("activeMenuOption").addClass("menuOption");
	$(associatedMenuId).removeClass("menuOption").addClass("activeMenuOption");
	
	$(dialogId + " .activeDialogView").slideUp().removeClass("activeDialogView").addClass("dlgView");
	$(viewIdToShow).slideDown().addClass("activeDialogView");
};

// This saves pairs of dialogId => optionViewMap
// The value itself, optionViewMap, is a hash containing menuOptionId => viewId pairs
// Saving this map is ugly but late eval actually makes it necessary
var dialogsCallbackMap = {};

var optionClicked = function(optionIdClicked)
{
	var shown = false;
	for( var dlgId in dialogsCallbackMap ) {
		var optionIdToViewIdMap = dialogsCallbackMap[dlgId];
		for( var optionId in optionIdToViewIdMap) {
			if( optionId == ("#" + optionIdClicked) ) {
				showDialogView( dlgId, optionIdToViewIdMap[optionId], optionId );
				shown = true;
				break;
			}
		}
		if(shown)
			break;
	}
};

var setupDialogMenuHandlers = function(dialogId, optionIdToViewIdMap)
{
	dialogsCallbackMap[dialogId] = optionIdToViewIdMap;
	
	for(var optionId in optionIdToViewIdMap){
		var viewId = optionIdToViewIdMap[optionId];
		
		$(optionId).click( function() {
			//showDialogView(dialogId, viewId, optionId);  // I'd have preferred to do it this way, but alas! no go
			optionClicked($(this).attr("id"));
		});
	}
};


// ==================================================================== //
// Create the configuration 'dialog'
// ==================================================================== //

var modalOverlay = document.createElement("div");
modalOverlay.id = "modalOverlay";
// no innerHTML, this is a simple overlay
body.appendChild(modalOverlay);

var configDiv = document.createElement("div");
configDiv.id = "configDiv";
$(configDiv).addClass("dialog");
configDiv.innerHTML =
"<div class='dlgHead'>" +
	"<h3>Configure dream's additions</h3>" +
	"<span id='closeConfigDialog' class='closeDialogButton'>X</span>" +
"</div>" +
"<div class='dlgContainer'>" +
	// Menu
	"<div class='dlgMenu'>" +
		"<div class='activeMenuOption' id='cfgCategoryFunctional'>Functional</div>" +
		"<div class='menuOption' id='cfgCategoryUseability'>Useability</div>" +
		"<div class='menuOption' id='cfgCategoryReadability'>Readability</div>" +
		"<div class='menuOption' id='cfgCategoryMenu'>Menu</div>" +
	"</div>" +

	// Content
	"<div class='dlgContent'>" +

	// Functional (shown by default)
	"<div class='activeDialogView' id='cfgFunctionalModules'>" +
		// Country manager
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgCountryManager' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
				"<div class='cfgModuleName'>" +
					"Countries Manager" +
				"</div>" +
				"<div class='cfgSubLine'>" +
					"The countries manager allows you to keep track of what country belongs to which member. " +
					"Where it is applicable a member's name will be shown according to your own bookkeeping." +
				"</div>" +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
	"</div>" +

	// Useability
	"<div class='dlgView' id='cfgUseabilityModules' style='display: none'>" +
		// Selfhits
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgAddFilterSelfhits' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
				"<div class='cfgModuleName'>" +
					"Filter selfhits" +
				"</div>" +
				"Add \"filter selfhits\" controls to all news pages." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// Dead countries
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgAddFilterDeadCountries' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
				"<div class='cfgModuleName'>" +
					"Filter Dead" +
				"</div>" +
				"Add \"filter dead countries\" controls to all search results." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// Market selector
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgMarketSelector' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
				"<div class='cfgModuleName'>" +
					"Market Selector" +
				"</div>" +
				"When viewing specific market goods automatically select the goods you are viewing." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
	"</div>" +
	
	// Readability
	"<div class='dlgView' id='cfgReadabilityModules' style='display: none'>" +
		// Market funketizer
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgMarketFunketizer' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
				"<div class='cfgModuleName'>" +
					"Market New Funketizer" +
				"</div>" +
				"Enable it and have a look at the market news page.<br/>Disable it if you don't like it." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// Market ticker
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgRepositionTicker' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"Reposition Ticker" +
				"</div>" +
				"Reposition the market ticker so it is completely visible" +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// BgColor
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
			"<input type='checkbox' id='cfgChangeBackgroundColor' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"Change Background" +
			"</div>" +
			"Set the background to a color you like." +
			"<div class='cfgSubLine'>" +
				"Color: <input type='text' length='12' id='cfgUserBackgroundColor' />" +
			"</div>" +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// ReadableYellow
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgYellowReadability' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"ReadableYellow" +
			"</div>" +
			"Make yellow text readable." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// HideArcadePosts
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
				"<input type='checkbox' id='cfgHideArcadePosts' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"Hide Arcade Posts" +
			"</div>" +
			"Hide Arcade Room posts on the Recent Posts page." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
	"</div>" +
	
	// Menu
	"<div class='dlgView' id='cfgMenuModules' style='display: none'>" +
		// Remove Add HTML
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
			"<input type='checkbox' id='cfgRemoveAddHTML' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"Remove \"Add HTML\"" +
			"</div>" +
			"Remove the \"Add HTML\" link from the menu (it doesn't do anything)." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// Menu hover
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
			"<input type='checkbox' id='cfgHighlightMenu' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"Light up active menu" +
			"</div>" +
			"Highlight the menu option you're hovering over." +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
		// Custom menu
		"<div class='cfgLine'>" +
			"<div class='cfgLineToggleDiv'>" +
			"<input type='checkbox' id='cfgCustomMenu' />" +
			"</div>" +
			"<div class='cfgLineDescription'>" +
			"<div class='cfgModuleName'>" +
				"Customize menu" +
			"</div>" +
			"Change the menu any way you like. Add, remove options and complete menus.<br />" +
			"<input type='button' id='cfgMenuEditorButton' value='Edit menu' />" +
			"</div>" +
			"<div style='clear: both;'><!-- --></div>" +
		"</div>" +
	"</div>" +
	"</div>" +  // close dlgContent
"</div>"  // close dlgContainer
;

body.appendChild(configDiv);
// CSS gets added at the end


// ==================================================================== //
// Read stored GM values and initialize controls appropriately
// ==================================================================== //

var EnableModule_filterSelfhits = GM_getValue("module_filterSelfHits", false);
var EnableModule_filterDeadCountries = GM_getValue("module_filterDeadCountries", false);
var EnableModule_countryManager = GM_getValue("module_countryManager", false);
var EnableModule_marketSelector = GM_getValue("module_marketSelector", true);
var EnableModule_repositionTicker = GM_getValue("module_repositionTicker", true);
var EnableModule_readableYellow = GM_getValue("module_readableYellow", true);
var EnableModule_background = GM_getValue("module_background", false);
var UserConfigured_backgroundColor = GM_getValue("user_bgcolor", "#D6DFFF");
var EnableModule_removeAddHtml = GM_getValue("module_removeAddHtml", true);
var EnableModule_highlightMenu = GM_getValue("module_highlightMenu", true);
var EnableModule_customMenu = GM_getValue("module_customMenu", false);
var EnableModule_marketNewsFunketizer = GM_getValue("module_marketNewsFunketizer", true);  // default this to false ?
var EnableModule_hideArcadePosts = GM_getValue("module_hideArcadePosts", true);


if(EnableModule_filterDeadCountries)
  $("#cfgAddFilterDeadCountries").attr("checked", "checked");
if(EnableModule_filterSelfhits)
  $("#cfgAddFilterSelfhits").attr("checked", "checked");
if(EnableModule_marketSelector)
  $("#cfgMarketSelector").attr("checked", "checked");
if(EnableModule_readableYellow)
  $("#cfgYellowReadability").attr("checked", "checked");
if(EnableModule_background)
  $("#cfgChangeBackgroundColor").attr("checked", "checked");
if(EnableModule_removeAddHtml)
  $("#cfgRemoveAddHTML").attr("checked", "checked");
if(EnableModule_repositionTicker)
  $("#cfgRepositionTicker").attr("checked", "checked");
if(EnableModule_countryManager)
  $("#cfgCountryManager").attr("checked", "checked");
if(EnableModule_highlightMenu)
  $("#cfgHighlightMenu").attr("checked", "checked");
if(EnableModule_customMenu)
  $("#cfgCustomMenu").attr("checked", "checked");
if(EnableModule_marketNewsFunketizer)
  $("#cfgMarketFunketizer").attr("checked", "checked");
if(EnableModule_hideArcadePosts)
  $("#cfgHideArcadePosts").attr("checked", "checked");

$("#cfgUserBackgroundColor").val( UserConfigured_backgroundColor );


// ==================================================================== //
// Callbacks for the configure dialog
// ==================================================================== //

setupDialogMenuHandlers("#configDiv", {
	"#cfgCategoryFunctional": "#cfgFunctionalModules",
	"#cfgCategoryReadability": "#cfgReadabilityModules",
	"#cfgCategoryUseability": "#cfgUseabilityModules",
	"#cfgCategoryMenu": "#cfgMenuModules"
});

var checkBoxIdToPersistentKeyMap = {
	"#cfgAddFilterDeadCountries": "module_filterDeadCountries",
	"#cfgAddFilterSelfhits": "module_filterSelfHits",
	"#cfgMarketSelector": "module_marketSelector",
	"#cfgYellowReadability": "module_readableYellow",
	"#cfgRepositionTicker": "module_repositionTicker",
	"#cfgRemoveAddHTML": "module_removeAddHtml",
	"#cfgCountryManager": "module_countryManager",
	"#cfgHighlightMenu": "module_highlightMenu",
	"#cfgCustomMenu": "module_customMenu",
	"#cfgMarketFunketizer": "module_marketNewsFunketizer"
	// cfgChangeBackgroundColor is defined seperately
};

for( var cbId in checkBoxIdToPersistentKeyMap ) {
	$(cbId).change( function() {
		var id = "#" + $(this).attr("id");
		GM_setValue( checkBoxIdToPersistentKeyMap[id],
				$(this).attr("checked") == "checked" );
	});
};

$("#closeConfigDialog").click( function() {
	hideDialog("#configDiv");
});

$("#cfgChangeBackgroundColor").change( function() {
	EnableModule_background = $("#cfgChangeBackgroundColor").attr("checked") == "checked";
	GM_setValue("module_background", EnableModule_background);
	Module_Background();
});
$("#cfgUserBackgroundColor").change( function() {
	UserConfigured_backgroundColor = $("#cfgUserBackgroundColor").val();
	GM_setValue("user_bgcolor", UserConfigured_backgroundColor );
	Module_Background();
});

// ==================================================================== //
// Menu helper functions
// No idea where else to put these
// ==================================================================== //

var createMenuElement = function(title, clickCallback) {
	var linkElem = document.createElement("a");
	linkElem.href = "#";
	linkElem.innerHTML = title;
	linkElem.onclick = clickCallback;
	
	var menuElem = document.createElement("li");
	menuElem.appendChild(linkElem);
	
	return menuElem;
};

var addElementToPrivateMenu = function(title, clickCallback) {
	var privateMenu = 0;
	$("#menus > ul > li > span > a").each( function(idx, elem) {
		if(elem.innerHTML == "Private")
			privateMenu = elem.parentElement.parentElement;
	});
	if(privateMenu != 0) {
		$( $(privateMenu).find("ul")[0] ).prepend( createMenuElement( title, clickCallback) );
	} else {
		// create a toplevel menu entry
	}
};


// ==================================================================== //
// Start of the actual modules
// ==================================================================== //


// ==================================================================== //
// Module: Background
// Description: Change the background color
// ==================================================================== //

// Wrapping this in a function so we can call it when the config value changes
var original_bgcolor = body.style.backgroundColor;
var Module_Background = function() {
	if(EnableModule_background)
	{
		body.style.backgroundColor = UserConfigured_backgroundColor;
	}
	else if(body.style.backgroundColor != original_bgcolor)
	{
		body.style.backgroundColor = original_bgcolor;
	}
};
Module_Background();


// ==================================================================== //
// Module: ReadableYellow
// Description: Make yellow text readable
// ==================================================================== //

if(EnableModule_readableYellow)
{
	var fontElems = document.getElementsByTagName("font");
	for(var i = fontElems.length -1; i >= 0; i--) {
		var e = fontElems[i];
		if(e.color.toLowerCase() == "yellow")
			e.style.backgroundColor = "#858585";
	}
}


// ==================================================================== //
// Module: MarketSelector
// Description: Selects the filter that's in use
// ==================================================================== //

if(EnableModule_marketSelector)
{
	if(uri.match("marketnews.php")) {
		var contentDiv = document.getElementById("content");
		var currentSelection = contentDiv.getElementsByTagName("span")[1].innerHTML;
		
		if(currentSelection != "") {
			var selectElem = contentDiv.getElementsByTagName("select")[0];
			var optionElems = selectElem.getElementsByTagName("option");
			for(var i = optionElems.length -1; i >= 0; i--) {
				if(optionElems[i].value == currentSelection) {
					optionElems[i].setAttribute("selected", "true");
					break;
				}
			}
		}
	}
}


// ==================================================================== //
// Module: RepositionMarketTicker
// Description: Repositions the ticker to make it fully visible
// ==================================================================== //

if(EnableModule_repositionTicker)
{
	var topleft = document.getElementById("topleft");
	topleft.style.width = "240px";

	var header = document.getElementById("header");
	header.style.height = "130px";
	header.style.width = "100%";
}


// ==================================================================== //
// Module: FilterSelfhits
// Description: Adds controls to filter selfhits
// ==================================================================== //

if(EnableModule_filterSelfhits)
{
	var selfhitsVisible = true;

	var toggleSelfhits = function(evt)
	{
		selfhitsVisible = !evt.target.checked;
		var contentDiv = document.getElementById("content");
		var table = contentDiv.getElementsByTagName("table")[0];
		
		var rows = table.getElementsByTagName("tr");
		for(var i = rows.length -1; i >= 0; i--) {
			var links = rows[i].getElementsByTagName("a");
			if(links.length == 4 && links[1].text == links[3].text) {
				rows[i].style.display = (selfhitsVisible? "" : "none");
			}
		}
	};

	if(uri.match("attacking.php") || uri.match("defending.php") || uri.match("servernews.php") )
	{
		var textElem = document.createTextNode("Hide selfhits");
		var cbElem = document.createElement("input");
		cbElem.setAttribute("type", "checkbox");
		cbElem.addEventListener("change", toggleSelfhits, false);
		
		var contentDiv = document.getElementById("content");
		var children = contentDiv.childNodes;
		contentDiv.insertBefore(textElem, children[2]);
		contentDiv.insertBefore(cbElem, textElem);
	}
}

// ==================================================================== //
// Module: FilterDead
// Description: Adds controls to filter dead countries
// ==================================================================== //


if(EnableModule_filterDeadCountries)
{
	var deadCountriesVisible = true;

	var toggleDeadCountryVisibility = function(evt)
	{
		deadCountriesVisible = !evt.target.checked;
		
		var contentDiv = document.getElementById("content");
		var table = contentDiv.getElementsByTagName("table")[0];
		
		var rows = table.getElementsByTagName("tr");
		for(var i = rows.length -1; i >= 0; i--) {
			var firstTd = rows[i].getElementsByTagName("td")[0];
			if(firstTd == null) {
				continue;
			}
			var fonts = firstTd.getElementsByTagName("font");
			if(fonts.length > 0 && fonts[0].getAttribute("color") == "red") {
				rows[i].style.display = (deadCountriesVisible? "" : "none");
			}
		}
	};

	if(uri.match("countryresults.php")) {
		var textElem = document.createTextNode("Hide dead countries");
		var cbElem = document.createElement("input");
		cbElem.setAttribute("type", "checkbox");
		cbElem.addEventListener("change", toggleDeadCountryVisibility, false);
		
		var contentDiv = document.getElementById("content");
		var children = contentDiv.childNodes;
		contentDiv.insertBefore(textElem, children[1]);
		contentDiv.insertBefore(cbElem, textElem);
	}
}


// ==================================================================== //
// Module: RemoveAddHTML
// Description: Remove the "Add html" link from the menu
// ==================================================================== //

if(EnableModule_removeAddHtml)
{
	var li_e = 0;
	$("#menus > ul > li > span > a").each( function(idx,elem) {
		if(elem.innerHTML.match("Add HTML"))
			li_e = elem.parentElement.parentElement;
	});
	if(li_e != 0)
		li_e.parentElement.removeChild(li_e);
}


// ==================================================================== //
// Module: MarketNewsFunketizer
// Description: Basically replace the entire presentation of the marketnews page
// ==================================================================== //

if(EnableModule_marketNewsFunketizer)
{
	var onSpecificGoodsPage = function() {
		var goods = $("#content center div span")[1].innerHTML;
		if(goods == "" || goods.match(/All/))
			return false;
		return true;
	};
	var rebuildRows = function() {
		$("#content table").css("display", "none");
		// Completely reprocess each row, working from the bottom up
		var lastPrice = 0;
		var prevRow = $("#content tbody tr:last");
		var currRow = prevRow;
		while( currRow.find("td:last").size() != 0 ) {
			lastPrice = processRow(currRow, lastPrice);
			prevRow = currRow;
			currRow = prevRow.prev();
		}
		$("#content table").css("display", "");
	};
	
	var processRow = function(row, previousPrice) {
		row.addClass( (isRowSale(row)? "saleRow" : "placementRow") );  // I know, placementRow right? /me is tired
		
		var newRowContent =
				"<b><div class='amountMarker'>" + getRowAmount(row) + "</div>" +
				getRowGoodsAndPrice(row);
		
		var currentPrice = getRowSellPrice(row);
		if(onSpecificGoodsPage() && previousPrice != 0 && currentPrice != 0 && currentPrice != previousPrice) {
			newRowContent += "<div class='movementMarker'>";
			if(previousPrice > currentPrice)
				newRowContent += " - " + (previousPrice-currentPrice) + " &dArr;";
			else
				newRowContent += " + " + (currentPrice-previousPrice) + " &uArr;";
			newRowContent += "</div>";
		}
		
		newRowContent += "</b>";
		row.find("td:last")[0].innerHTML = newRowContent;
		
		return currentPrice;
	};
	
	var isRowSale = function(row) {
		return row.find("td:last")[0].innerHTML.match("bought") !== null;
	};
	
	var getRowAmount = function(row) {
		return row.find("td:last")[0].innerHTML.match(/([0-9,]+)/)[1];
	};
	
	var getRowGoodsAndPrice = function(row) {
		return row.find("td:last")[0].innerHTML.match(/[0-9,]+(.*[0-9]+)/)[1];
	};
	
	var getRowSellPrice = function(row) {
		var price_str = row.find("td:last")[0].innerHTML.match(/\$([0-9,]+)/)[1];
		return parseInt( price_str.replace(/,/g, "") );
	};
	
	var hideForm = function() {
		//$("#content form").css("display", "none");
	};
	
	var createMarketGoodsSelector = function() {
		var goodsSelectorContent = getGoodsSelectorMenuRow(
			[ "Troops", "Jets", "Turrets", "Tanks", "Bushels" ] );
		goodsSelectorContent += getGoodsSelectorMenuRow(
			[ "Military", "Medical", "Business", "Residential", "Agricultural"] );
		goodsSelectorContent += getGoodsSelectorMenuRow(
			[ "Warfare", "Military Strategy", "Weapons", "Industrial", "Spy", "SDI"] );
		var selectorDiv = document.createElement("div");
		selectorDiv.innerHTML = goodsSelectorContent;
		
		$("#content form").before(selectorDiv);
		$(".marketGoodSelectorEntry").click( function() {
			$("option[selected=\"true\"]").removeAttr("selected", "true");
			var optionToFind = $(this)[0].innerHTML;
			var optionElem = $("option[value=\"" + optionToFind + "\"]");
			optionElem.attr("selected", "true");
			//$("input[type=\"submit\"]").click();
			$("#content form").submit();
		});
	};
	
	var getGoodsSelectorMenuRow = function(goods) {
		var str = "<div class='marketGoodSelectorRow'>";
		for(var idx in goods) {
			str += "<div class='marketGoodSelectorEntry'>" + goods[idx] + "</div>";
		}
		str += "</div>";
		return str;
	};
	
	if(uri.match("marketnews.php") && $("#content tbody tr").size() >= 2) {
		hideForm();
		createMarketGoodsSelector();
		
		rebuildRows();
		
		// Make the table smaller
		$("#content table").css("width", "550px");
		$("#content table thead th:first").css("width", "100px");
		// inlining markers
		$(".amountMarker").css( {
			"display": "inline-block",
			"min-width": "5em",
			"text-align": "right"
		});
		$(".movementMarker").css( {
			"float": "right",
			"text-align": "center"
		});
		// visualise put/get rows
		$("style")[0].innerHTML += 
			"\n.saleRow { background-color: #A8DDE0; }\n" +
			".placementRow { background-color: #BFFFBF; }\n" +
			"#content table tbody tr:hover { background-color: #DDDDDD }\n" +  // the hover class here makes this 'hack' necessary
			".marketGoodSelectorEntry {\n" +
			  "background-color: #E3AD00;\n"+
			  "border: 1px solid black;\n"+
			  "cursor: pointer;\n"+
			  "display: inline-block;\n"+
			  "margin-bottom: 5px;\n"+
			  "margin-right: 8px;\n"+
			  "padding: 6px;\n"+
			  "width: 150px; }\n" +
			".marketGoodSelectorEntry:hover { background-color: #F3C300 }\n";
			
	}
}

// ==================================================================== //
// Module: HighlightMenu
// Description: Add a simple hover class to submenu items
// ==================================================================== //

if(EnableModule_highlightMenu)
{
	// jQuery and hover classes don't make for short readable code
	var highlightMenuStyle = document.createElement("style");
	highlightMenuStyle.innerHTML =
	  "#menu ul li ul li:hover { background-color: #B3C2D8; }\n" +
	  "#menu ul li ul li { padding: 2px 5px; }"
	document.head.appendChild(highlightMenuStyle);
}

// ==================================================================== //
// Module: HideArcadePosts
// Description: Hide Arcade Room posts in the viewrecentposts page
// ==================================================================== //

if(EnableModule_hideArcadePosts && uri.match("viewrecentposts"))
{
	$("#content tbody tr").each( function() {
		if( $(this).find("td").size() >= 2 &&
			$( $(this).find("td")[1] ).text().match("Arcade room") )
		{
			$(this).css("display", "none");
		}
	});
}

// ==================================================================== //
// Module: CustomMenu
// Description: Offer a way for the user to specify his own menu.
// ==================================================================== //

// Since we can launch the menuEditor from the configure dialog we always create
// the editor (hidden) regardless of whether the module is enabled or not

var menuEditor = document.createElement("div");
menuEditor.id = "menuEditor";
$(menuEditor).addClass("dialog");
menuEditor.innerHTML = 
"<div class='dlgHead'>" +
	"<h3>Menu editor</h3>" +
	"<span class='closeDialogButton'>X</span>" +
"</div>" +
"<div class='dlgContainer'>" +
	// Main menu
	"<div class='leftContainer'>" +
		"<h3>Main menu</h3>" +
		"<div id='menuEditor_mainMenuList'>" +
			"<!-- -->" + // menu entries get added here dynamically
		"</div>" +
		// selected entry display
		"<div>" +
			"<table>" +
				"<tr>" +
					"<td><input type='button' value='&#923;' id='menuEditor_mainMenuMoveUpButton' class='menuEditor_moveButton' /></td>" +
					"<td>Label: </td><td><input id='menuEditor_mainMenuLabel' type='text' size='15' /></td>" +
				"</tr>" +
				"<tr>" +
					"<td><input type='button' value='V' id='menuEditor_mainMenuMoveDownButton' class='menuEditor_moveButton' /></td>" +
					"<td>Url: </td><td><input id='menuEditor_mainMenuUrl' type='text' size='15' /></td>" +
				"</tr>" +
				"<tr>" +
					"<td></td><td>Visible: </td><td><input id='menuEditor_mainMenuEnabled' type='checkbox' /></td>" +
				"</tr>" +
			"</table>" +
			"<input type='button' value='New' id='menuEditor_mainMenuNewButton' />" +
			"<input type='button' value='Delete' id='menuEditor_mainMenuDeleteButton' />" +
		"</div>" +
	"</div>" +
  
	// Sub menus
	"<div class='rightContainer'>" +
		"<h3>Sub menu</h3>" +
		"<div id='menuEditor_subMenuList'>" +
			"<!-- -->" + // submenu entries gets added here dynamically
		"</div>" +
		// selected entry display
		"<div>" +
			"<table>" +
				"<tr>" +
					"<td><input type='button' value='&#923;' id='menuEditor_subMenuMoveUpButton' class='menuEditor_moveButton' /></td>" +
					"<td>Label: </td><td><input id='menuEditor_subMenuLabel' type='text' size='30' /></td>" +
				"</tr>" +
				"<tr>" +
					"<td><input type='button' value='V' id='menuEditor_subMenuMoveDownButton' class='menuEditor_moveButton' /></td>" +
					"<td>Url: </td><td><input id='menuEditor_subMenuUrl' type='text' size='30' /></td>" +
				"</tr>" +
				"<tr>" +
					"<td></td><td>Visible: </td><td><input id='menuEditor_subMenuEnabled' type='checkbox' /></td>" +
				"</tr>" +
			"</table>" +
			"<input type='button' value='New' id='menuEditor_subMenuNewButton' />" +
			"<input type='button' value='Delete' id='menuEditor_subMenuDeleteButton' />" +
		"</div>" +
	"</div>" +

	"<div class='dlgFooter'>" +
		"<input type='button' value='Save changes' id='menuEditor_saveChangesButton' />" +
		"<input type='button' value='Reset' id='menuEditor_resetButton' />" +
	"</div>" +
"</div>"
;
body.appendChild(menuEditor);

// ==================================================================== //
// Global vars and helper functions for the menu editor
// ==================================================================== //

var UserConfigured_customMenu = GM_getValue("user_customMenu", "");
var menuList = [];
var menuEditorChanged = false;

var readBoxcarMenu = function() {
	var lst = [];
	$("#menus > ul > li").each( function(idx)
	{
		var submenuList = [];
		var additionsMenuFound = false;
		$(this).find("ul li a").each( function(idx)
		{
			if($(this).text() == "Configure additions") {
				additionsMenuFound = true;
				return;
			}
			if(additionsMenuFound)
				idx = idx-1;
			
			submenuList[idx] = {
				name: $(this).text(),
				url: $(this).attr("href"),
				enabled: true
			};
		});
		
		var mainMenuLink = $(this).find("span a");
		
		lst[idx] = {
			name: mainMenuLink.text(),
			url: mainMenuLink.attr("href"),
			enabled: true,
			submenus: submenuList
		};
	});
	return lst;
};

var getCurrentSelectedMainMenu = function() {
	return menuList[ getCurrentSelectedMainMenuIdx() ];
};

var getCurrentSelectedMainMenuIdx = function() {
	var selectedIdx;
	$("#menuEditor_mainMenuList .menuEditor_listEntry").each( function(idx) {
		if($(this).hasClass("active")) {
			selectedIdx = idx;
			return false;
		}
	});
	return selectedIdx;
};

var getCurrentSelectedSubMenu = function() {
	var mainMenuObj = getCurrentSelectedMainMenu();
	//if(mainMenuObj) {  // this should never fail
		var subMenuIdx = getCurrentSelectedSubMenuIdx();
		return mainMenuObj.submenus[subMenuIdx]
	//}
};

var getCurrentSelectedSubMenuIdx = function() {
	var selectedIdx;
	$("#menuEditor_subMenuList .menuEditor_listEntry").each( function(idx) {
		if($(this).hasClass("active")) {
			selectedIdx = idx;
			return false;
		}
	});
	return selectedIdx;
};

var updateButtons = function() {
	var selectedMain = getCurrentSelectedMainMenu();
	var selectedSub = getCurrentSelectedSubMenu();
	var mmIdx = getCurrentSelectedMainMenuIdx();
	var smIdx = getCurrentSelectedSubMenuIdx();
	
	toggleButton("#menuEditor_mainMenuMoveUpButton",
			mmIdx !== undefined && mmIdx != 0);
	toggleButton("#menuEditor_mainMenuMoveDownButton",
			mmIdx !== undefined && mmIdx < menuList.length-1 );
	
	toggleButton("#menuEditor_subMenuMoveUpButton",
			smIdx !== undefined && smIdx != 0);
	toggleButton("#menuEditor_subMenuMoveDownButton",
			smIdx !== undefined && smIdx < selectedMain.submenus.length-1 );
	
	toggleButton("#menuEditor_mainMenuDeleteButton", mmIdx !== undefined);
	toggleButton("#menuEditor_subMenuDeleteButton", smIdx !== undefined);
	
	toggleButton("#menuEditor_saveChangesButton", menuEditorChanged);
	
	// might need to disable the cbs entirely too when their list is empty
	checkCheckBox("#menuEditor_subMenuEnabled", selectedSub.enabled);
	checkCheckBox("#menuEditor_mainMenuEnabled", selectedMain.enabled);
};

var enableButton = function(id) {
	$(id).removeAttr("disabled", "true");
};

var disableButton = function(id) {
	$(id).attr("disabled", "true");
};

var toggleButton = function(id, enable) {
	if(enable || enable === undefined)
		enableButton(id);
	else
		disableButton(id);
};

// enableCheck will be either undefind or "checked"
// only in the case of "checked" should we add the checked attribute
var checkCheckBox = function(id, enableCheck) {
	if(enableCheck == "checked" || enableCheck === true)
		$(id).attr("checked", "checked");  // true or checked?
	else
		$(id).removeAttr("checked", "true");
};

var switchArrayValues = function(arr, firstIdx, secondIdx) {
	var tmp = arr[firstIdx];
	arr[firstIdx] = arr[secondIdx];
	arr[secondIdx] = tmp;
};

// Creates the div associated with a menu entry in container
var addMainMenuListEntry = function(idx)
{
	var mmEntry = document.createElement("div");
	mmEntry.innerHTML = menuList[idx].name != "" ? menuList[idx].name : "(empty)";
	$(mmEntry).addClass("menuEditor_listEntry");
	
	// Adding our div is a bit tricky since we can start out with an empty list. This is the only time idx can be zero
	if( $("#menuEditor_mainMenuList .menuEditor_listEntry").size() == 0) {
		$("#menuEditor_mainMenuList").append(mmEntry);
	} else {
		$( $("#menuEditor_mainMenuList .menuEditor_listEntry")[idx - 1] ).after(mmEntry);
	}
	
	// Handle selection
	$(mmEntry).click( function() {
		$(this).parent().find(".active").removeClass("active");
		$(this).addClass("active");
		
		// Set the 'display' values
		var menuObj = getCurrentSelectedMainMenu();
		$("#menuEditor_mainMenuLabel").val( menuObj.name != "" ? menuObj.name : "(empty)");
		$("#menuEditor_mainMenuUrl").val( menuObj.url );
		if(menuObj.enabled)
			$("#menuEditor_mainMenuEnabled").attr("checked", "checked");
		
		// Clear the submenu entries and create the new ones
		$("#menuEditor_subMenuList").empty();
		
		for(var idx in menuObj.submenus) {
			addSubmenuEntry(idx);
		}
		
		// Init the submenu display values
		if($("#menuEditor_subMenuList .menuEditor_listEntry:first").size() == 0) {
			$("#menuEditor_subMenuLabel").val("");
			$("#menuEditor_subMenuUrl").val("");
			$("#menuEditor_subMenuEnabled").attr("disabled", "true");
			updateButtons();
		} else
			$("#menuEditor_subMenuList .menuEditor_listEntry:first").click();
	});
	
	return mmEntry;
};

var addSubmenuEntry = function(idx)
{
	var submenus = getCurrentSelectedMainMenu().submenus;
	
	var smEntry = document.createElement("div");
	smEntry.innerHTML = (submenus[idx].name != "" ? submenus[idx].name : "(empty)");
	$(smEntry).addClass("menuEditor_listEntry");
	
	// Again the possibility of an empty list occurs
	if( $("#menuEditor_subMenuList .menuEditor_listEntry").size() == 0 ) {
		$("#menuEditor_subMenuList").append(smEntry);
	} else {
		$( $("#menuEditor_subMenuList .menuEditor_listEntry")[idx -1] ).after(smEntry);
	}
	
	// Handle selection
	$(smEntry).click( function() {
		$(this).parent().find(".active").removeClass("active");
		$(this).addClass("active");
		
		var smo = getCurrentSelectedSubMenu();
		
		$("#menuEditor_subMenuLabel").val( smo.name );
		$("#menuEditor_subMenuUrl").val( smo.url );
		$("#menuEditor_subMenuEnabled").removeAttr("disabled");
		if(smo.enabled)
			$("#menuEditor_subMenuEnabled").attr("checked", "checked");
		
		updateButtons();
	});
	return smEntry;
};

// ==================================================================== //
// Initialize the menu editor
// ==================================================================== //

var initMenuList = function() {
	if(UserConfigured_customMenu != "") {
		menuList = JSON.parse(UserConfigured_customMenu);
	} else {
		menuList = readBoxcarMenu();
	}

	// Fill up the main menu list
	for(var idx in menuList) {
		addMainMenuListEntry(idx);
	}
	// and click the first entry to initialize properly
	$("#menuEditor_mainMenuList .menuEditor_listEntry:first").click();
};

initMenuList();

// ==================================================================== //
// Setup event handlers for the menu editor
// ==================================================================== //

$("#cfgMenuEditorButton").click( function() {
	showDialog("#menuEditor");
});

$("#menuEditor .closeDialogButton").click( function() {
	if(menuEditorChanged && confirm("Changes were made\nDo you want to save?"))
		$("#menuEditor_saveChangesButton").click();
	hideDialog("#menuEditor", true);
});

$("#menuEditor_saveChangesButton").click( function() {
	//alert("saving changes");
	UserConfigured_customMenu = JSON.stringify(menuList)
	GM_setValue("user_customMenu", UserConfigured_customMenu);
	menuEditorChanged = false;
	updateButtons();
});

$("#menuEditor_resetButton").click( function() {
	// ask for confirmation
	if(!confirm("Are you sure you want to reset?\nAny customized menu entries you made will be lost"))
		return;
	
	$("#menuEditor_mainMenuList").empty();
	$("#menuEditor_subMenuList").empty();
	
	GM_setValue("user_customMenu", "");
	UserConfigured_customMenu = "";
	initMenuList();
});

// ==================================================================== //
// Move buttons
// ==================================================================== //

$("#menuEditor_mainMenuMoveUpButton").click( function() {
	var current = $("#menuEditor_mainMenuList .active");
	current.prev().before(current);
	
	var idx = getCurrentSelectedMainMenuIdx();
	switchArrayValues(menuList, idx, idx+1);
	updateButtons();
	menuEditorChanged = true;
});

$("#menuEditor_mainMenuMoveDownButton").click( function() {
	var current = $("#menuEditor_mainMenuList .active");
	current.next().after(current);
	
	var idx = getCurrentSelectedMainMenuIdx();
	switchArrayValues(menuList, idx, idx-1);
	updateButtons();
	menuEditorChanged = true;
});

$("#menuEditor_subMenuMoveUpButton").click( function() {
	var current = $("#menuEditor_subMenuList .active");
	current.prev().before(current);
	
	var menu = getCurrentSelectedMainMenu();
	var idx = getCurrentSelectedSubMenuIdx();
	switchArrayValues(menu.submenus, idx, idx+1);
	updateButtons();
	menuEditorChanged = true;
});

$("#menuEditor_subMenuMoveDownButton").click( function() {
	var current = $("#menuEditor_subMenuList .active");
	current.next().after(current);
	
	var menu = getCurrentSelectedMainMenu();
	var idx = getCurrentSelectedSubMenuIdx();
	switchArrayValues(menu.submenus, idx, idx-1);
	updateButtons();
	menuEditorChanged = true;
});

// ==================================================================== //
// New/Delete buttons
// ==================================================================== //

$("#menuEditor_mainMenuNewButton").click( function() {
	var newMenuObj = {
		name: "",
		url: "",
		enabled: true,
		submenus: []
	};
	var newIdx = getCurrentSelectedMainMenuIdx() + 1;
	menuList.splice(newIdx, 0, newMenuObj );
	var newMenuElem = addMainMenuListEntry(newIdx);
	$(newMenuElem).click();
	menuEditorChanged = true;
});

$("#menuEditor_mainMenuDeleteButton").click( function() {
	if(!confirm("This will remove the submenu as well.\n\nAre you sure?"))
		return;
	
	var currentMMIdx = getCurrentSelectedMainMenuIdx();
	menuList.splice(currentMMIdx, 1);
	$("#menuEditor_mainMenuList .active").remove();
	
	if($("#menuEditor_mainMenuList .menuEditor_listEntry").size() != 0) {
		$("#menuEditor_mainMenuList .menuEditor_listEntry").click();
	} else {
		// disable cb's ?
		//clear submenus
		$("#menuEditor_subMenuList").empty();
		updateButtons();
	}
	menuEditorChanged = true;
});

$("#menuEditor_subMenuNewButton").click( function() {
	var newMenuObj = {
		name: "",
		url: "",
		enabled: true
	};
	
	var smElem;
	var submenuList = getCurrentSelectedMainMenu().submenus;
	if( submenuList.length == 0 ) {
		submenuList[0] = newMenuObj;
		smElem = addSubmenuEntry(0);
	} else {
		var newIdx = getCurrentSelectedSubMenuIdx() + 1;
		submenuList.splice(newIdx, 0, newMenuObj);
		smElem = addSubmenuEntry(newIdx);
	}
	$(smElem).click();
	menuEditorChanged = true;
});

$("#menuEditor_subMenuDeleteButton").click( function() {
	var currentSMIdx = getCurrentSelectedSubMenuIdx();
	var submenuList = getCurrentSelectedMainMenu().submenus;
	submenuList.splice(currentSMIdx, 1);
	$("#menuEditor_subMenuList .active").remove();
	
	if( $("#menuEditor_subMenuList .menuEditor_listEntry").size() != 0  )
		$("#menuEditor_subMenuList .menuEditor_listEntry:first").click();
	else {
		updateButtons();
		// disable checkbox
	}
	menuEditorChanged = true;
});


// ==================================================================== //
// Change handlers for the textfields and checkboxes
// ==================================================================== //


$("#menuEditor_subMenuLabel").change( function() {
	var submenuObject = getCurrentSelectedSubMenu();
	submenuObject.name = $(this).val();
	$("#menuEditor_subMenuList .active:first")[0].innerHTML = $(this).val();
	menuEditorChanged = true;
	updateButtons();
});

$("#menuEditor_subMenuUrl").change( function() {
	var submenuObject = getCurrentSelectedSubMenu();
	submenuObject.url = $(this).val();
	menuEditorChanged = true;
	updateButtons();
});

$("#menuEditor_subMenuEnabled").change( function() {
	var submenuObject = getCurrentSelectedSubMenu();
	submenuObject.enabled = $(this).attr("checked");
	//alert( "user changed cb submenu: " + submenuObject.enabled );
	menuEditorChanged = true;
	updateButtons();
});

$("#menuEditor_mainMenuLabel").change( function() {
	var menuObject = getCurrentSelectedMainMenu();
	menuObject.name = $(this).val();
	$("#menuEditor_mainMenuList .active:first")[0].innerHTML = $(this).val();
	menuEditorChanged = true;
	updateButtons();
});

$("#menuEditor_mainMenuUrl").change( function() {
	var menuObject = getCurrentSelectedMainMenu();
	menuObject.url = $(this).val();
	menuEditorChanged = true;
	updateButtons();
});

$("#menuEditor_mainMenuEnabled").change( function() {
	var menuObject = getCurrentSelectedMainMenu();
	menuObject.enabled = $(this).attr("checked");
	//alert( "user changed cb mainmenu: " + menuObject.enabled );
	menuEditorChanged = true;
	updateButtons();
});

// ==================================================================== //
// Replace menu if module is enabled
// ==================================================================== //

if(EnableModule_customMenu && UserConfigured_customMenu != "")
{
	var totalMenuStr = "";
	for(var idx in menuList) {
		var mainMenuObj = menuList[idx];
		
		if(!mainMenuObj.enabled)
			continue;
		
		var menuStr =
			"<li><span id='topItem'><a href='" + mainMenuObj.url + "'>" +
				mainMenuObj.name + "</a></span>";
		
		menuStr += "<ul style='visibility: hidden; width: 150px'>";
		var submenus = mainMenuObj.submenus;
		for(var subMenuIdx in submenus) {
			var submenuObj = submenus[subMenuIdx];
			if(submenuObj.enabled)
				menuStr += "<li><a href='" + submenuObj.url + "'>" + submenuObj.name + "</a></li>";
		}
		menuStr += "</ul></li>";
		
		totalMenuStr += menuStr;
	}
	$("#menus").empty();
	var menu = document.createElement("ul");
	menu.innerHTML = totalMenuStr;
	$("#menus").append(menu);
	// setup hover handler?
}


// ==================================================================== //
// Module: CountryManager
// Description: -
// ==================================================================== //

// TODO Consider starting the country manager from the config dialog
// that way there is no need for an additional menu entry.

if(EnableModule_countryManager)
{
	// Persistent variables for this module
	var CountryManager_sourceText = GM_getValue("countryManager_sourceText", "");
	var tmp = GM_getValue("countryManager_playerCountryNums.json", "");
	var CountryManager_PlayerCountryNums = ( tmp == "" ? { } : JSONParse(tmp) );
	
	// Parsing related functions
	
	var saveAndProcessCountryText = function() {
		CountryManager_sourceText = $("#countryManager_textArea").val();
		GM_setValue("countryManager_sourceText", CountryManager_sourceText);
		// 
	};
	
	
	// create and insert the dialog html
	var contentDiv = document.createElement("div");
	contentDiv.id = "countryManagerDialog";
	$(contentDiv).addClass("dialog");
	contentDiv.innerHTML =
"<div class='dlgHead'>" +
  "<h3>Countries Manager</h3>" +
  "<span class='closeDialogButton'>X</span>" +
"</div>" +
"<div class='dlgContainer'>" +
  "<div class='dlgMenu'>" +
    "<div class='activeMenuOption' id='dlgCountryManager_MenuInput'>" +
	  "Input" +
	"</div>" +
	"<div class='menuOption' id='dlgCountryManager_MenuManage'>" +
	  "Manage" +
	"</div>" +
  "</div>" +
  "<div class='dlgContent'>" +
    "<div class='activeDialogView' id='dlgCountryManager_ViewInput'>" +
	  "<h3 class='viewHeader'>Add or remove country lists</h3>" +
	  "<textarea id='countryManager_textArea' cols='58' rows='20'></textarea><br />" +
	  "<div class='dlgButtonList'>" +
	    "<input type='button' id='countryManager_clearButton' value='Clear' />" +
		"<input type='button' id='countryManager_saveButton' value='Save' />" +
		"<input type='button' id='countryManager_helpButton' value='Help' />" +
	  "</div>" +
	  "<input type='checkbox' id='countryManager_readCountryNames' /> Read country names (could take a while)" +
	"</div>" +
	"<div class='dlgView' id='dlgCountryManager_ViewManage' style='display: none;'>" +
	  "<div class='memberListContainer'>" +
	    "<h3>Members</h3>" +
		"<div id='memberList''>" +
		"</div>" +
	  "</div>" +
	  "<div class='countryListContainer'>" +
	    "<h3>Countries</h3>" +
		"<div id='countryList''>" +
		"</div>" +
	  "</div>" +
	"</div>" +
  "</div>" +
"</div>" +
"<div style='clear:both'><!-- --></div>"
;
	body.appendChild(contentDiv);
	
	// Create and insert the help div (getting a bit tedious)
	var helpDiv = document.createElement("div");
	helpDiv.id = "helpScreen";
	//$(helpDiv).css("display", "none");
	helpDiv.innerHTML =
"<div class='helpHeader'>" +
  "<span class='closeDialogButton'>X</span>" +
  "<h2>How to add countries</h2>" +
"</div>" +
"<div class='helpContent'>" +
  "<p>" +
  "CountryManager requires that the text you input adheres to a specific format. " +
  "The format is actually quite simple:" +
  "</p><p>" +
  "<ol>" +
    "<li>For each player you enter their name on a new line.</li>" +
	"<li>Set the line immediately following the players name to '====' (*).</li>" +
	"<li>Copy/Paste the country lists topic for that player</li>" +
  "</ol>" +
  "</p><p>" +
    "*): You can add more '=' characters, just make sure there are no other " +
	"characters on the line immediately following the player's name" +
  "</p><p>" +
    "CountryManager is quite forgiving in the way the country list is presented. " +
	"If the country list for a particular player doesn't work then you can remove " +
	"their list and replace it with a line containing a range of country numbers." +
  "</p><p>" +
    "For example: <br/>" +
	"'250-265' would work<br/>" +
	"as would '#250-#265'" +
  "</p>" +
"</div>"
;
	body.appendChild(helpDiv);
	
	// setup dialog eventhandlers
	
	setupDialogMenuHandlers("#countryManagerDialog", {
		"#dlgCountryManager_MenuInput": "#dlgCountryManager_ViewInput",
		"#dlgCountryManager_MenuManage": "#dlgCountryManager_ViewManage" });
		
	$("#countryManagerDialog .closeDialogButton").click( function() {
		hideDialog( "#countryManagerDialog" );
	});
	
	addElementToPrivateMenu("Countries manager", function() {
		showDialog( "#countryManagerDialog" );
	});
	
	// show/hide help
	$("#countryManager_helpButton").click( function() {
		showDialog("#helpScreen");
		//$("#helpScreen").css("display", "block");
	});
	$("#helpScreen .closeDialogButton").click( function() {
		//$("#helpScreen").css("display", "none");
		hideDialog("#helpScreen");
	});
	
	$("#countryManager_clearButton").click( function() {
		$("#countryManager_textArea").val("");
	});
	
	$("#countryManager_saveButton").click( function() {
		saveAndParseCountryText();
	});
	
	// different page implementations (
}

// ==================================================================== //
// End of the modules
// ==================================================================== //


// ==================================================================== //
// Add the configure option to the menu
// (moved below the other menu code so this entry gets added every time)
// ==================================================================== //

addElementToPrivateMenu("Configure additions", function() {
	showDialog("#configDiv");
});


// ==================================================================== //
// Add the css for the configuration dialog and country manager
// ==================================================================== //

var styleElement = document.createElement("style");
styleElement.innerHTML = 
".dialog {\n" +
	"z-index:          1000;\n" +
	"background-color: white;\n" +
	"width:            740px;\n" +
	"position:         absolute;\n" +
	"top:              50px;\n" +
	"left:             150px;\n" +
	"border-radius:    10px 10px 10px 10px;\n" +
	"border:           4px solid #cccccc;\n" +
	"box-shadow:       10px 10px 10px #aaaaaa;\n" +
	"display:          none;\n" +
	"padding:          2em;\n" +
	"opacity:          0.0;\n" +
"}\n" +
"#modalOverlay {\n" +
	"z-index:          999;\n" +
	"background-color: #cccccc;\n" +
	"opacity:          0.0;\n" +
	"width:            100%;\n" +
	"position:         absolute;\n" +
	"top:              0;\n" +
	"left:             0;\n" +
	"display:          none;\n" +
"}\n" +
".closeDialogButton {\n" +
	"border:       1px solid #cccccc;\n" +
	"position:     absolute;\n" +
	"right:        9px;\n" +
	"top:          9px;\n" +
	"font:         12px/22px Verdana, sans-serif;\n" +
	"color:        #9a958e;\n" +
	"cursor:       pointer;\n" +
	"text-align:    center;\n" +
	"padding-left:  1em;\n" +
	"padding-right: 1em;\n" +
"}\n" +
".closeDialogButton:hover {\n" +
  "background-color: #808080;\n" +
  "color: white;\n" +
"}\n" +
".dlgContainer {\n" +
  "width: 100%;\n" +
"}\n" +
".dlgHead > h3 {\n" +
  "text-align: center;\n" +
  "font-size: 1.8em;\n" +
  "margin-top: 0;\n" +
"}\n" +
".dlgMenu {\n" +
  "width: 220px;\n" +
  "margin-left: 4px;\n" +
  "float: left;\n" +
  "display: inline;\n" +
  "clear: left;\n" +
"}\n" +
".dlgMenu > div {\n" +
  "width: 200px;\n" +
  "border: 3px solid #808080;\n" +
  "border-radius: 8px;\n" +
  "text-align: center;\n" +
  "padding-top: 17%;\n" +
  "padding-bottom: 17%;\n" +
  "margin-top: 3px;\n" +
  "cursor: pointer;\n" +
  "font-weight: bold;\n" +
  "font-size: 1.3em;\n" +
"}\n" +
".dlgMenu > div:hover {\n" +
  "border: 3px solid #303030;\n" +
  "text-decoration: underline;\n" +
"}\n" +
".activeMenuOption {\n" +
  "background-color: #A7B8FC;\n" +
"}\n" +
".menuOption {\n" +
  "background-color: #f0f3fc;\n" +
"}\n" +
".dlgContent {\n" +
  "left: 250px;\n" +
  "width: 63%;\n" +
  "height: 430px;\n" +
  "border: 1px solid #c0c0c0;\n" +
  "overflow: auto;\n" +
  "float: right;\n" +
  "display: inline;\n" +
  "padding-bottom: 8px;\n" +
"}\n" +
".cfgLine {\n" +
  "min-height: 60px;\n" +
  "width: 90%;\n" +
  "margin-left: auto;\n" +
  "margin-right: auto;\n" +
  "background-color: #f0f3fc;\n" +
  "margin-top: 2em;\n" +
  "border-top: 2px dashed #808080;\n" +
  "border-bottom: 2px dashed #808080;\n" +
  "font-size: 1.1em;\n" +
"}\n" +
".cfgLineToggleDiv {\n" +
  "float: left;\n" +
  "padding-left: 25px;\n" +
  "padding-top: 18px;\n" +
  "padding-right: 18px;\n" +
  "height: 60px;\n" +
  "float: left;\n" +
  "clear: left;\n" +
  "display: inline;\n" +
"}\n" +
".cfgLineDescription {\n" +
  "margin-top: 18px;\n" +
  "margin-right: 8px;\n" +
  "float: right;\n" +
  "display: inline;\n" +
  "width: 82%;\n" +
  "text-align: justify;\n" +
"}\n" +
".cfgLine input {\n" +
  "margin: 0;\n" +
"}\n" +
".cfgSubLine {\n" +
  "margin-top: 8px;\n" +
  "margin-bottom: 12px;\n" +
"}\n" +
".cfgModuleName {\n" +
  "font-size: 1.2em;\n" +
  "font-weight: bold;\n" +
"}\n" +
".dlgButtonList {\n" +
  "margin-top: 4px;\n" +
"}\n" +
".dlgButtonList input {\n" +
  "margin-left: 12px;\n" +
  "font-size: 1.1em;\n" +
"}\n" +
".memberListContainer {\n" +
  "float: left;\n" +
  "display: inline;\n" +
  "clear: left;\n" +
  "width: 28%;\n" +
"}\n" +
".countryListContainer {\n" +
  "float: right;\n" +
  "display: inline;\n" +
  "width: 58%;\n" +
  "height: 250px;\n" +
  "border-left: 1px dashed #808080;\n" +
"}\n" +
"h3.viewHeader {\n" +
  "margin-top: 18px;\n" +
  "margin-left: 8px;\n" +
"}\n" +
".dialog textarea {\n" +
  "margin-left: 6px;\n" +
"}\n" +
"#helpScreen {\n" +
  "position: absolute;\n" +
  "z-index: 1001;\n" +
  "top: 200px;\n" +
  "left: 50px;\n" +
  "width: 320px;\n" +
  "padding: 1em;\n" +
  "background-color: white;\n" +
  "display: none;\n" +
  "border-radius: 10px 10px 10px 10px;\n" +
  "border: 4px solid #cccccc;\n" +
  "box-shadow: 10px 10px 10px #aaaaaa;\n" +
"}\n" +
".helpHeader {\n" +
"}\n" +
".helpContent {\n" +
"}\n" +
".helpContent p {\n" +
"}\n" +
"#menuEditor {\n" +
  "z-index: 1001;\n" +
  "top: 100px;\n" +
  "left: 200px;\n" +
  "width: 640px;\n" +
"}\n" +
"#menuEditor .dlgContainer .leftContainer {\n" +
  "width: 220px;\n" +
  "margin-left: 4px;\n" +
  "float: left;\n" +
  "display: inline;\n" +
  "clear: left;\n" +
"}\n" +
"#menuEditor .dlgContainer .rightContainer {\n" +
  "left: 250px;\n" +
  "width: 400px;\n" +
  "height: 325px;\n" +
  "border-left: 1px dashed #c0c0c0;\n" +
  "float: right;\n" +
  "display: inline;\n" +
  "padding-left: 12px;\n" +
"}\n" +
"#menuEditor_mainMenuList {\n" +
  "height: 100px;\n" +
  "border: 1px solid #c0c0c0;\n" +
  "border-radius: 8px;\n" +
  "margin-right: 8px;\n" +
  "margin-bottom: 8px;\n" +
  "overflow-y: auto;\n" +
"}\n" +
"#menuEditor_subMenuList {\n" +
  "height: 180px;\n" +
  "border: 1px solid #c0c0c0;\n" +
  "border-radius: 8px;\n" +
  "margin-bottom: 8px;\n" +
  "overflow-y: auto;\n" +
"}\n" +
"#menuEditor h3 {\n" +
  "margin: 0 0 8px 0;\n" +
"}\n" +
"#menuEditor .dlgFooter {\n" +
  "padding-top: 1em;\n" +
  "clear: both;\n" +
  "text-align: right;\n" +
"}\n" +
".menuEditor_listEntry {\n" +
  "cursor: pointer;\n" +
  "padding: 4px 0 3px 4px;\n" +
"}\n" +
".menuEditor_listEntry:hover {\n" +
  "background-color: #F0F3FC;\n" +
"}\n" +
"#menuEditor_mainMenuList .active {\n" +
  "background-color: #F0F3FC;\n" +
"}\n" +
"#menuEditor_subMenuList .active {\n" +
  "background-color: #F0F3FC;\n" +
"}\n" +
".menuEditor_moveButton {\n" +
  "padding: 0 2px;\n" +
  "font-size: 0.8em;\n" +
"}\n"
;
document.head.appendChild(styleElement);
