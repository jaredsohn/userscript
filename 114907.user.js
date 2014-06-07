// ==UserScript==
// @id             4B610646-EFDF-11E0-A8B2-BF254924019B
// @name           Steam Store - Homepage DLC Filter
// @namespace      Takato
// @author         Takato
// @copyright      2010+, Takato (http://userscripts.org/users/82358)
// @licence        Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License; https://creativecommons.org/licenses/by-nc-sa/3.0/
// @description    Filter DLC from Steam's "New Release"/"Coming Soon"/"Specials" homepage lists.
// @version        2013.06.06
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/114907.meta.js
// @downloadURL    http://userscripts.org/scripts/source/114907.user.js
// @website        http://userscripts.org/scripts/show/114907
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @include        http://store.steampowered.com/
// ==/UserScript==
// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/
version = "2013.06.06";


// Check browser support for GM_getValue() and GM_setValue()
supportGM = false;
try {
	GM_setValue("gmSupport", true);
	doesIt = GM_getValue("gmSupport");
	if (doesIt) { debug("Supports GM");
		supportGM = true;
	} else { debug("Doesn't support GM");
		supportGM = false;
	}
} catch (ex) {
	supportGM = false;
}
if (!supportGM) {
	alert("'Homepage DLC Filter' requires a browser that supports GM_ functions. \nIf you are using Chrome, please uninstall this script, install the Tampermonkey extension, and then reinstall this script. \nIf you are using another browser, try the Greasemonkey Emulation Script. \n\n\nTampermonkey: https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo\nGreasemonkey Emulation Script: http://userscripts.org/scripts/show/105153");
	return;
}


function createNode(type, attributes, props, evls) { 
//"createNode" borrowed from http://userscripts.org/scripts/show/13333
	var node = document.createElement(type);
	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
		}
	}
	if (props) {
		for (var prop in props) {
			if ((props.hasOwnProperty(prop)) && (prop in node)) node[prop] = props[prop];
		}
	}
	if (evls instanceof Array) {
		evls.forEach(function(evl) {node.addEventListener.apply(node, evl);});
	}
	return node;
}


// Adds the "Options" button to the Steam homepage
//var optionsButton = createNode("div", {id: "dlcf-optionButton", class: "tab", title: "Preferences for 'Steam Store Game Filter'", type: "div"}, {textContent: "Options"}, [["click", settingsScreen, false]]);
//document.getElementsByClassName("leftcol")[0].getElementsByClassName("tabarea")[0].getElementsByClassName("tabbar")[0].appendChild(optionsButton);

// Style for the loading icon
var loadingStyle = "position:absolute !important; top:0 !important; left:0 !important; width: 100% !important; opacity:0.75 !important; height:100% !important; padding-bottom:24px !important; z-index:9000 !important; background:url(data:image/gif;base64,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) #262626 no-repeat center !important;";


// Abort if a holiday sale is on
tabarea = document.getElementsByClassName("tabarea")[0];
if (tabarea.getAttribute("class").indexOf("holiday") > -1) {;
	var abortBlock = document.createElement("div");
	abortBlock.setAttribute("id", "dlcf-aborted");
	abortBlock.setAttribute("class", "block");
	abortBlock.innerHTML = "<div class='block_content'> <div class='block_content_inner'>Steam appears to be running a sale. 'Homepage DLC Filter' has been disabled due to the games lists being in a different format during the sale.</div> </div>";
	tabarea.parentNode.insertBefore(abortBlock, tabarea.nextNode);
	return;
}

// Add a "loading" notice to the page
var loadingBlock = document.createElement("div");
loadingBlock.setAttribute("id", "dlcf-loadingBlock");
loadingBlock.setAttribute("style", loadingStyle);
document.getElementsByClassName("tabarea")[0].appendChild(loadingBlock);

$("#tab_1_content .new_releases_filter_block").remove();

// DLC checking
var dlcUpToDate = false;
var searchPages = new Array();
var dlcCount = 0;
var currentlyProcessing = 0;
pageRequest = new XMLHttpRequest();
pageRequest.onreadystatechange=stateChanged;
pageRequest.open("GET","http://store.steampowered.com/search/results?category1=21&sort_by=Released&sort_order=DESC&page=1",true);
pageRequest.send(null);

function stateChanged() {
	if (pageRequest.readyState != 4) return;
	theResponse = pageRequest.responseText;
	searchPages[0] = document.createElement("div");
	(searchPages[0]).innerHTML = theResponse;
	dlcCount = searchPages[0].getElementsByClassName("search_pagination_left")[0].innerHTML.substring(searchPages[0].getElementsByClassName("search_pagination_left")[0].innerHTML.indexOf("of")+3);
	dlcCount = parseInt(dlcCount)+0;
	if ((GM_getValue("dlcCount") == undefined) | (GM_getValue("dlcCount") == 0) | (GM_getValue("resetDLC") == true) | (dlcCount != GM_getValue("dlcCount"))){ // If DLC is missing or we are resetting DLC
		if ((GM_getValue("dlcCount") == undefined) | (GM_getValue("dlcCount") == 0) | (GM_getValue("resetDLC") == true) | (dlcCount != GM_getValue("dlcCount"))) { 
			// Reset DLC list
			GM_setValue("dlcCount", 0);
			GM_setValue("dlcList","");
			GM_setValue("resetDLC", false);
		}
		// Need to get DLC data
		if (howManyPages() == 1) {
			allPagesReturned = true;
			buildDLC();
		} else {
			function extraStateChanged() {
				if (pageRequest.readyState != 4) return;
				theResponse = pageRequest.responseText;
				searchPages[currentlyProcessing-1] = document.createElement("div");
				(searchPages[currentlyProcessing-1]).innerHTML = theResponse;
				//alert(pageRequest.responseText);
				if (currentlyProcessing < howManyPages()) {
					currentlyProcessing = currentlyProcessing + 1;
					pageRequest = new XMLHttpRequest();
					pageRequest.onreadystatechange=extraStateChanged;
					pageRequest.open("GET","http://store.steampowered.com/search/results?category1=21&sort_by=Released&sort_order=DESC&page="+currentlyProcessing,true);
					pageRequest.send(null);
				} else {
					// All DLC is now fetched
					buildDLC();
				}
			}
			pageRequest = new XMLHttpRequest();
			pageRequest.onreadystatechange=extraStateChanged;
			pageRequest.open("GET","http://store.steampowered.com/search/results?category1=21&sort_by=Released&sort_order=DESC&page=2",true);
			pageRequest.send(null);
			currentlyProcessing = 2;
		}	
	} else {
		dlcUpToDate = true;
	}
}


// How many pages of DLC results do we need to check?
function howManyPages() {
	count = 1;
	diff = dlcCount - GM_getValue("dlcCount");
	while (diff > 25) {
		count = count + 1;
		diff = diff - 25;
	}
	return count;
}


// Build (or update) DLC list
function buildDLC() {
	var tempList = "";
	var allLinks;
	var linkCollect = new Array();
	pageCount = 0;
	globalLinkCount = 0;
	localLinkCount = 0;
	for (x in searchPages) {
		allLinks = searchPages[pageCount].getElementsByClassName("search_result_row");
		localLinkCount = 0;
		while (localLinkCount < allLinks.length) {
			linkCollect[globalLinkCount] = allLinks[localLinkCount].toString();
			localLinkCount = localLinkCount + 1;
			globalLinkCount = globalLinkCount + 1;
		}
		pageCount = pageCount + 1;
	}

	count = 0;
	for (x in linkCollect) {
		linkCollect[count] = linkCollect[count].substring(0, linkCollect[count].indexOf("?")-1);
		linkCollect[count] = linkCollect[count].substring(linkCollect[count].lastIndexOf("/")+1);
		count = count + 1;
	}

	diff = dlcCount - GM_getValue("dlcCount");
	count = 0;
	while (count < diff) {
		tempList = tempList + linkCollect[count].toString() + ",";
		count = count + 1;
	}

	if (GM_getValue("dlcList") == "") {
		newList = "";
	} else {
		newList = GM_getValue("dlcList") + ",";
	}
	newList = newList + tempList.substring(0, tempList.length-1);

	GM_setValue("dlcList", newList);
	GM_setValue("dlcCount", dlcCount);

	dlcUpToDate = true;
}



// CSS to apply to the page
var cssString = "";
cssString = cssString + ".dlcf_block, .dlcf_dlc_delete {display:none !important;}";
cssString = cssString + ".tabarea {position:relative !important;}  .tab_page {height:auto !important; border:0 !important;}   .tab_row {width:100% !important;}   #tab_NewReleases_items, #tab_ComingSoon_items, #tab_Discounts_items {top:0px !important;}   .tab_page_link_holder {display:block !important; position:absolute !important; bottom:-24px !important; left: 0 !important; width:100% !important; text-align:left !important;}   #tab_1_content, #tab_2_content, #tab_3_content, #tab_discounts_content, #tab_1_dlc, #tab_2_dlc, #tab_3_dlc, #tab_4_dlc {overflow:auto !important; height:390px !important; border:1px solid #4D4B49 !important; margin-bottom:262px !important;}   #tab_1_content.dlcf_noDLC, #tab_2_content.dlcf_noDLC, #tab_3_content.dlcf_noDLC, #tab_discounts_content.dlcf_noDLC {height:624px !important; margin-bottom:0px !important;}  .dlcf_noDLC .tab_page_link_holder {display:none !important;}  #tab_1_dlc, #tab_3_dlc, #tab_4_dlc {height:208px !important; }  .tab_content_ctn {position:relative !important; }   #dlcf-optionButton {position:absolute !important; right:0 !important; top:0 !important; border-left:1px solid black !important;}   .dlcf-dlc-tab-button {padding-left:0 !important; padding-right:0 !important;}    .tab_discount.discount_pct {right:76px !important;}    .dlc_header {color:#FFFFFF !important; cursor:default !important; padding-left:3px !important; font-size:10px !important; text-transform:uppercase !important;}  .dlc_header img {margin-top:5px !important; margin-bottom:-5px !important;}    .tab_page_link_holder .tab_row, .tab_page_link_holder .tab_overlay img {height:54px !important;}    .tab_page_link_holder .tab_desc {top:0 !important; font-size:11px !important;}  .tab_page_link_holder .tab_item_img {top:5px !important;}  .tab_page_link_holder h4 {margin-bottom:0 !important;}  .tab_page_link_holder .tab_discount.discount_pct {top:22px !important;}  .tab_page_link_holder .tab_price {top:14px !important; line-height:16px !important;}";

// Insert CSS into page
var head=document.getElementsByTagName('head')[0];
if(!head)
	return;
var style=document.createElement('style');
style.setAttribute('type','text/css');
style.appendChild(document.createTextNode(cssString));
head.appendChild(style);

// Script override for Valve's "PageTab" function.
scriptString = "function PageTab( tab, delta, max, params ){	if ( tabTransition[tab] )return; if ( !tabStart[tab] ) tabStart[tab] = 0; if ( !tabMax[tab] ) tabMax[tab] = 0; if ( tabStart[tab] + delta >= max ) return; tabStart[tab] = 10 ; tabTransition[tab] = true; if ( tabStart[tab] > tabMax[tab] ) {	if ( !params )	params = {}; params.tab = tab; params.start = tabStart[tab]; 	params.count = delta; new Ajax.Updater( 'tab_' + tab + '_items', 'http://store.steampowered.com/search/tab', { parameters: params, method: 'get', insertion: 'bottom' } ); tabMax[tab] = tabStart[tab]; }else { TabUpdateCounts( tab, delta, max );}}";

// Script to grab all 100 NewReleases
scriptString = scriptString + "PageTab('NewReleases', 90, 100, {'bHoverEnabled':true,'style':''});";

totalGameCount = 100;

// Script to grab all TopSellers, if more than 10
try {
	gameCountSection = document.getElementById("tab_TopSellers_count");
	gameCount = gameCountSection.innerHTML.substring(gameCountSection.innerHTML.indexOf("of")+3);
	scriptString = scriptString + "PageTab('TopSellers', " + (gameCount-10) + ", " + gameCount + ", {'bHoverEnabled':true,'style':''});";
	totalGameCount = parseInt(totalGameCount) + parseInt(gameCount);
}catch(ex){
}

// Script to grab all ComingSoon, if more than 10
try {
	gameCountSection = document.getElementById("tab_ComingSoon_count");
	gameCount = gameCountSection.innerHTML.substring(gameCountSection.innerHTML.indexOf("of")+3);
	scriptString = scriptString + "PageTab('ComingSoon', " + (gameCount-10) + ", " + gameCount + ", {'bHoverEnabled':true,'style':''});";
	totalGameCount = parseInt(totalGameCount) + parseInt(gameCount);
}catch(ex){
}

// Script to grab all Discounts, if more than 10
try {
	gameCountSection = document.getElementById("tab_Discounts_count");
	gameCount = gameCountSection.innerHTML.substring(gameCountSection.innerHTML.indexOf("of")+3);
	scriptString = scriptString + "PageTab('Discounts', " + (gameCount-10) + ", " + gameCount + ", {'bHoverEnabled':true,'style':''});";
	totalGameCount = parseInt(totalGameCount) + parseInt(gameCount);
}catch(ex){
}

// Insert script into page
var script=document.createElement('script');
script.setAttribute('type','text/javascript');
script.appendChild(document.createTextNode(scriptString));
head.appendChild(script);


function removeLoading() {
	// All done. Remove the loading image
	document.getElementById("dlcf-loadingBlock").parentNode.removeChild(document.getElementById("dlcf-loadingBlock"));
}



function checkRows() {
	//Checking that all rows have loaded, and that DLC has been checked.

	tabSection = document.getElementsByClassName("tab_content_ctn")[0];
	tabRows = tabSection.getElementsByClassName("tab_row");
	count = 0;
	count = tabRows.length;

	if (count >= totalGameCount) {
		// Row count is good
		if (dlcUpToDate) {
			// DLC is up-to-date, stop checking
			window.clearInterval(intervalID);
			makeTabsDLC();
			removeLoading();
		} 
	}
}

function makeTabsDLC() {
	// DLC will be moved to DLC tabs

	markDLC("dlcf_dlc");
	
	var dlcTab1=document.createElement("div");
	dlcTab1.setAttribute("id", "tab_1_dlc");
	dlcTab1.innerHTML = "<div class=\"tab_page\"><div id=\"tab_dlc1_items\" class=\"v5 \"></div></div>";

	var dlcTab3=document.createElement("div");
	dlcTab3.setAttribute("id", "tab_3_dlc");
	dlcTab3.innerHTML = "<div class=\"tab_page\"><div id=\"tab_dlc3_items\" class=\"v5 \"></div></div>";

	var dlcTab4=document.createElement("div");
	dlcTab4.setAttribute("id", "tab_4_dlc");
	dlcTab4.innerHTML = "<div class=\"tab_page\"><div id=\"tab_dlc4_items\" class=\"v5 \"></div></div>";

	
	tabBarBtns = document.getElementsByClassName("leftcol")[0].getElementsByClassName("tabarea")[0].getElementsByClassName("tabbar")[0].getElementsByClassName("tab");
	tabStatBars = document.getElementsByClassName("tab_content_ctn")[0].getElementsByClassName("tab_page_link_holder");
	
	count = 0;
	while (count < 4) {
		tabStatBars[count].innerHTML = "<div class=\"dlc_header\"> <img src=\"http://cdn.store.steampowered.com/public/images/ico/ico_type_dlc.gif\"/> <span>DLC " + tabBarBtns[count].innerHTML +  "</span> </div>";
		count++;
	}
	
	tabStatBars[0].appendChild(dlcTab1);
	tabStatBars[2].appendChild(dlcTab3);
	tabStatBars[3].appendChild(dlcTab4);

	
	tab1 = document.getElementById("tab_NewReleases_items");
	tab2 = document.getElementById("tab_TopSellers_items");
	tab3 = document.getElementById("tab_ComingSoon_items");
	tab4 = document.getElementById("tab_Discounts_items");

	tab1stuff = tab1.getElementsByClassName("dlcf_dlc");
	tab3stuff = tab3.getElementsByClassName("dlcf_dlc");
	tab4stuff = tab4.getElementsByClassName("dlcf_dlc");

	tabContainer1 = document.getElementById("tab_1_content");
	tabContainer2 = document.getElementById("tab_2_content");
	tabContainer3 = document.getElementById("tab_3_content");
	tabContainer4 = document.getElementById("tab_discounts_content");
	
	if (tab1stuff.length < 1) {
		tabContainer1.setAttribute("class", tabContainer1.getAttribute("class") + " dlcf_noDLC");
	} else if (tab1stuff.length < 4) {
		tabContainer1.setAttribute("class", tabContainer1.getAttribute("class") + " dlcf_count" + tab1stuff.length);
	}
	tabContainer2.setAttribute("class", tabContainer2.getAttribute("class") + " dlcf_noDLC");
	if (tab3stuff.length < 1) {
		tabContainer3.setAttribute("class", tabContainer3.getAttribute("class") + " dlcf_noDLC");
	} else if (tab3stuff.length < 4) {
		tabContainer3.setAttribute("class", tabContainer3.getAttribute("class") + " dlcf_count" + tab3stuff.length);
	}
	if (tab4stuff.length < 1) {
		tabContainer4.setAttribute("class", tabContainer4.getAttribute("class") + " dlcf_noDLC");
	} else if (tab4stuff.length < 4) {
		tabContainer4.setAttribute("class", tabContainer4.getAttribute("class") + " dlcf_count" + tab4stuff.length);
	}
	
	try {
		for (x in tab1stuff) {
			document.getElementById("tab_dlc1_items").appendChild(tab1stuff[0]);
		}
	} catch(ex) {}

	try {
		for (x in tab3stuff) {
			document.getElementById("tab_dlc3_items").appendChild(tab3stuff[0]);
		}
	} catch(ex) {}

	try {
		for (x in tab4stuff) {
			document.getElementById("tab_dlc4_items").appendChild(tab4stuff[0]);
		}
	} catch(ex) {}

	


}


function markDLC(dlcClassName) {
	// DLC will be marked as DLC
	tabSection = document.getElementsByClassName("tab_content_ctn")[0];
	tabRows = tabSection.getElementsByClassName("tab_row");

	dlcIDs = GM_getValue("dlcList").split(",");

	try {
		for (x in tabRows) {
			lineID = tabRows[x].getAttribute("id");
			lineIndex = lineID.lastIndexOf("_")+1;
			gameID = lineID.substring(lineIndex);
			for (y in dlcIDs) {
				if (gameID == dlcIDs[y]) {
					tabRows[x].setAttribute("class", tabRows[x].getAttribute("class") + dlcClassName + " ");
				}
			}
		}
	} catch(ex) {
	}
}


function settingsScreen() {
	alert("Homepage DLC Filter, by Takato");
}



intervalID = 0;

intervalID = window.setInterval(checkRows,1000);

// End of script