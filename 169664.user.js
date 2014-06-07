    // ==UserScript==
    // @name         Steam Community Market Steam Trading Card Beta Autobuy
    // @include 
http://steamcommunity.com/market/listings/753/Steam%20Trading%20Card%20Beta
    // @description   For my eyes only.
    // ==/UserScript==
     
    var maxPrice = 2.5;
     
    var item = document.getElementsByClassName('market_listing_row');
    var itemPrice = document.getElementsByClassName('market_listing_price_with_fee');
    var itemButton = document.getElementsByClassName('item_market_action_button_green');
     
    var i = 0;
     
    while(item[i])
    {
            var price = itemPrice[i].innerHTML.replace(/\s+/g, ' ');
            price = price.substring(2);
            if(price > maxPrice)
                    console.log('item '+i+' is more than '+maxPrice+' and was skipped');
            else
            {
                    var found = true;
                    console.log('item '+i+' is less than '+maxPrice+', time to buy!');
                    itemButton[i].click();
                    //make sure modal loads before continuing
                    setTimeout(buyItem,40);
            }
            i++;
    }
     
    if(found != true)
    {
            setTimeout(refresh,2000);
    }
     
    function buyItem()
    {
            document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
            document.getElementById('market_buynow_dialog_purchase').click();
            setTimeout(refresh,2000);
    }
     
    function refresh()
    {
            location.reload(true);
    }