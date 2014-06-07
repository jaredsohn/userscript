// ==UserScript==
// @name        CSGO Lounge item price displayer
// @namespace   http://www.enygma.ro
// @version     1.1
// @author      Jay
// @description Displays an item's lowest price offer from the Steam community market and also provides a helper to copy an item's name by clicking the panel under it. Based on the "Steam Market Price Matcher" script by tomatolicious available at http://userscripts.org/scripts/source/154071.user.js
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://csgolounge.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

// initialize the script for the items on the page
var initialize = function() {
    // find each item's name panel/slot
    var itemNamePanels = document.querySelectorAll(".item .name");
    attachExtraPanelsAndListeners(itemNamePanels);
    // watch the right list of items for changes, when it exists
    var rightItemList = document.querySelector("#rightlist #itemlist");
    if (rightItemList) {
        attachMutationObserver(rightItemList);
    }
    var offerPanel = document.querySelector("#messages #offer");
    if (offerPanel) {
        attachMutationObserver(offerPanel);
    }
}

// add to each item's name panel an extra panel that contains the price information and a click handler to facilitate copying the item's name 
var attachExtraPanelsAndListeners = function(itemNamePanels) {
    for (var i = 0, length = itemNamePanels.length; i < length; i++) {
        var itemNamePanel = itemNamePanels[i];
        // create our own panel to append..       
        var extraPanel = document.createElement('div');
        extraPanel.innerHTML = "<span class='scriptStatus'>Ready</span>";
        extraPanel.setAttribute("class", "extraPanel");
        // ..and do so
        itemNamePanel.appendChild(extraPanel);
        // set mouseover event listener on the item
        itemNamePanel.parentNode.addEventListener("mouseover", getLowestPriceHandler, false);
        // set click event handler for the item's name panel so that the item name can be copied to the clipboard easier
        itemNamePanel.addEventListener("click", copyItemNameHandler, false);
    }
}

// attach a mutation observer on the target item container
var attachMutationObserver = function(target) {     
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        // we`re intereste only in mutations that add nodes. This skips the mutation introduced by the "Add item to offer" button's removal
        if (mutations.length == 1 && mutations[0].removedNodes.length > 0) {
            return;
        }
        // when the mutation happens, augment the new items with price info and etc.
        itemNamePanels = target.querySelectorAll(".item .name");
        attachExtraPanelsAndListeners(itemNamePanels);
    });
     
    // configuration of the observer
    var config = { childList: true };
     
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}

// event handler to grab the price
var getLowestPriceHandler = function() {
    var itemNameElement = this.querySelector(".name");
    // don`t try to get the price if we've already retrieved it
    if (itemNameElement.querySelector(".scriptStatus").innerHTML != "Ready") {
        return;
    }
    var theItem = itemNameElement.querySelector("b").innerHTML.trim();
    var theItemString = encodeURIComponent(theItem);
    // from Steam's community market website
    var appID = 440;
    itemNameElement.querySelector(".scriptStatus").innerHTML = "Loading...";
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://steamcommunity.com/market/" + appID + "/" + theItemString + "/",
        onload: function (response) {
            var httpResponse = response.responseText;
            var match = lowestPriceWithFeeRegExp.exec(httpResponse);
            var priceWithFee = "<span class='" + (match ?
                "itemMarketable'>" + match[1] :
                "itemNotMarketable'>Not Marketable")
                + "</span>";
            match = lowestPriceWithoutFeeRegExp.exec(httpResponse);
            var priceWithoutFee = match ? match[1] + " - without fee (seller receives)" : ""; 
            itemNameElement.querySelector(".scriptStatus").innerHTML = "<span title='" + priceWithoutFee + "'>" + priceWithFee + "</span>";
        }
    });
}

// cached RegExps used to read the item's value from the Steam page.
var lowestPriceWithFeeRegExp = /<span class="market_listing_price market_listing_price_with_fee">\s*(.*?)\s*<\/span>/i;
var lowestPriceWithoutFeeRegExp = /<span class="market_listing_price market_listing_price_without_fee">\s*(.*?)\s*<\/span>/i;

// event handler to facilitate copying an item's name
var copyItemNameHandler = function(event) {
    // stop the element's parent (item) from getting the click event. This stops the item from being selected
    event.stopPropagation()
    // make sure we select the item name element
    var itemNameElement = event.target;
    while (!hasClass(itemNameElement, "name")) {
        itemNameElement = itemNameElement.parentNode;
    }
    // get and display the item's name
    var itemName = itemNameElement.querySelector("b").innerHTML.trim();
    window.prompt("Press CTRL+C to copy the item's name:", itemName);
}

// helper method to check if an element has the specified class name
var hasClass = function(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
}

// style
GM_addStyle(".itemNotMarketable { color : red } .itemMarketable { color: green }");

// initialize the script once the page has finished loading
window.onload = initialize;