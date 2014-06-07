// ==UserScript==
// @name            Steam Market Auto Price Matcher
// @namespace       oldmanclub.org
// @version         0.9
// @author          Pezmc, based on tomatolicious
// @description     Adds an option to grab the lowest listed price of an item to the sell dialogue, so that you can match that price.
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include         http*://steamcommunity.com/id/*/inventory*
// @updateURL       http://userscripts.org/scripts/source/414396.user.js
// @downloadURL     http://userscripts.org/scripts/source/414396.user.js
// ==/UserScript==

// FEATURE: auto check SSA
document.getElementById('market_sell_dialog_accept_ssa').checked = true;

// find the existing panel from steam
var steamPanel = document.getElementById('market_sell_dialog_input_area');
// create our own panel to append..       
var extraPanel = document.createElement('div');
extraPanel.innerHTML = '<a id="getPriceButton" class=\"btn_green_white_innerfade\"><span>Get Price</span></a><span id=\"scriptStatus\">Ready</span>';
extraPanel.setAttribute('id', 'extraPanel');
// ..and do so
steamPanel.appendChild(extraPanel);
// set event listeners
document.getElementById("getPriceButton").addEventListener("click", GetLowestPrice, false);
document.getElementById("market_sell_dialog_cancel").addEventListener("click", ResetStuff, false);
document.getElementById("market_sell_dialog_ok").addEventListener("click", ResetStuff, false);

// css
GM_addStyle("#extraPanel { padding-top: 5px;text-align: left; margin-top: 10px; border-top:1px solid #7a9b05; } #getPriceButton { margin-right: 10px; }");

GetLowestPrice()

// function to reset the labels
function ResetStuff() {
    document.querySelector("#scriptStatus").innerHTML = "Ready";
    console.log("reset price");
}
// function to grab the price
function GetLowestPrice() {
    var theItem = unsafeWindow.g_ActiveInventory.selectedItem;
    var theItemString = encodeURIComponent(theItem.market_hash_name);  
    // error correction for items without hash names, thanks sm00th!
    if (theItemString == "undefined") {
        theItemString = encodeURIComponent(theItem.market_name);
    }
    var appID = theItem.appid;
    var theURL = "http://steamcommunity.com/market/listings/" + appID + "/" + theItemString + "/";
    //console.log("selected: " + theItem);
    console.log("url: " + theURL);
    document.querySelector("#scriptStatus").innerHTML = "Loading...";
    GM_xmlhttpRequest({
        method: "GET",
        url: theURL,
        onload: function (response) {
            var httpResponse = response.responseText;
            var match = /<span class="market_listing_price market_listing_price_with_fee">([\s\S]*?)<\/span>/i.exec(httpResponse);
            var result = match ? match[1] : "Unknown"; 
            match = /<span class="market_listing_price market_listing_price_without_fee">([\s\S]*?)<\/span>/i.exec(httpResponse);
            var result2 = match ? match[1] : "Unknown"; 

          	debugger;
          
          	if(!isNaN(result2)) {
              	
            	var priceField = document.querySelector("#market_sell_buyercurrency_input");
              	priceField.value = result2.substring(1)
                
                var evt = document.createEvent("HTMLEvents");
   				evt.initEvent("keyup", false, true);
              	priceField.dispatchEvent(evt)
            }

            document.querySelector("#scriptStatus").innerHTML = "Current lowest price: <span title='without fee - seller receive'>" + result2 + "</span> / <span title='with fee - buyer pays (this is shown on the market)'>" + result + "</span>";
        }
    });
    
}