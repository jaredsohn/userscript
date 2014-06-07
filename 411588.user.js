// ==UserScript==
// @name            Steam Auto Market Price
// @namespace       Likecyber.in.th
// @version         1.0
// @author          Cyber2friends
// @description     Auto Check Current Price for Fast Sell
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include         http*://steamcommunity.com/id/*/inventory*
// @updateURL       http://userscripts.org/scripts/source/411588.user.js
// @downloadURL     http://userscripts.org/scripts/source/411588.user.js
// ==/UserScript==

document.getElementById('market_sell_dialog_accept_ssa').checked = true;
MarketPrice();

function MarketPrice() {
    unsafeWindow.PopulateMarketActions = function(Action, item){
        Action.update("");
        if ( !item.marketable || ( item.is_currency && CurrencyIsWalletFunds( item ) ) )
        {
            Action.hide();
            return;
        }
        
        if ( typeof(g_bViewingOwnProfile) != 'undefined' && g_bViewingOwnProfile )
        {
            var SellButton = CreateMarketActionButton('green', 'javascript:SellCurrentSelection()', "Sell");
            SellButton.onclick = function(){
                var theItem = unsafeWindow.g_ActiveInventory.selectedItem;
                var theItemString = encodeURIComponent(theItem.market_hash_name);
                if (theItemString == "undefined") {
                    theItemString = encodeURIComponent(theItem.market_name);
                }
                var appID = theItem.appid;
                var theURL = "http://steamcommunity.com/market/listings/" + appID + "/" + theItemString + "/";
                GM_xmlhttpRequest({
                    method: "GET",
                    url: theURL,
                    onload: function (response) {
                        var httpResponse = response.responseText;
                        
                        var match = /<span class="market_listing_price market_listing_price_without_fee">\r\n					&#36;([\s\S]*?) USD				<\/span>/i.exec(httpResponse);
                        var result1 = match ? match[1] : "";
                        
                        var match = /<span class="market_listing_price market_listing_price_with_fee">\r\n					&#36;([\s\S]*?) USD				<\/span>/i.exec(httpResponse);
                        var result2 = match ? match[1] : "";
                        
                        var input1 = document.getElementById("market_sell_currency_input");
                        input1.value = "$" + result1;
                        
                        var input2 = document.getElementById("market_sell_buyercurrency_input");
                        input2.value = "$" + result2;
                    }
                });  
            };
            Action.appendChild( SellButton );
        }
        else
        {
            Action.hide();
            return;
        }
        Action.show();
    }
}