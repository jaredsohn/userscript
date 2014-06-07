// ==UserScript==
// @name         Item Market Page Link
// @namespace    potatoes
// @version      0.2
// @description  Adds a link on the "Sell" dialog towards the item's market page
// @include      http*://steamcommunity.com/id/*/inventory*
// @copyright    2014+, Tase
// @require      file://C:\jquery-2.1.0.min.js
// @run-at       document-body
// ==/UserScript==

$(document).ready(function()
{ 
    $(".market_dialog_iteminfo").append("<a id='marketLink' href='#'>Link to market page</a>");
    
    $(document).on("click", ".item_market_action_button_contents", function() 
    {
        var item = unsafeWindow.g_ActiveInventory.selectedItem;
    	var itemString = encodeURIComponent(item.market_hash_name);  

    	if (itemString == "undefined") {
        	itemString = encodeURIComponent(item.market_name);
    	}
        var appid = item.appid;
   		var url = "http://steamcommunity.com/market/listings/" + appid + "/" + itemString + "/";
        $("#marketLink").attr("href", url);
    });
});