// ==UserScript==
// @name Autobuy Dota2 Key
// @include http://steamcommunity.com/market/listings/730/CS%3AGO%20Weapon%20Case
// @description WinniePooh
// @version 1.0
// ==/UserScript==
 
var maxPrice = 5;
 
var item = document.getElementsByClassName('market_listing_row');
var itemPrice = document.getElementsByClassName('market_listing_price_with_fee');
var itemButton = document.getElementsByClassName('item_market_action_button_green');
 
var i = 0;
 
while(item[i])
{
    var price = itemPrice[i].innerHTML.replace(/\s+/g, ' ');
    price = price.replace(',', '.');
    price = price.substring(1,price.length-6);
    if(price > maxPrice)
        console.log('item '+i+' ('+price+') is more than '+maxPrice+' and was skipped');
    else
    {
        var found = true;
        console.log('item '+i+' ('+price+') is less than '+maxPrice+', time to buy!');
        itemButton[i].click();
        //make sure modal loads before continuing
        setTimeout(buyItem,40+Math.floor(Math.random()*4));
    }
    i++;
}
 
if(found != true)
{
    setTimeout(refresh,2000+Math.floor(Math.random()*300));
}
 
function buyItem()
{
    document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
    setTimeout(buyItemconfirm,50+Math.floor(Math.random()*5));
}
 
function buyItemconfirm()
{
    document.getElementById('market_buynow_dialog_purchase').click();
    setTimeout(refresh,2000+Math.floor(Math.random()*100));
}
 
 
function refresh()
{
    location.reload(true);
}