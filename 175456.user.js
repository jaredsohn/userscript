// ==UserScript==
// @name       steam_market_auto_buy
// @namespace 
// @version    0.2
// @description 
// @match      http://steamcommunity.com/market/listings/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// 
// ==/UserScript==
try
  {

   $(document).ready(function() {
  // Handler for .ready() called.


var buylist = [];
buylist.push({ name: "Dragonclaw Hook", price: 10 });  
       
      
       


var pricediv=document.getElementsByClassName('market_listing_row market_recent_listing_row')[0];
var price =pricediv.getElementsByClassName("market_listing_price market_listing_price_with_fee")[0].innerText;
var buy_button=pricediv.getElementsByClassName("item_market_action_button_contents")[0];
var Purchase_button=market_buynow_dialog_purchase.getElementsByTagName('span')[0];
price = price.substring(price.indexOf("$")+1,price.indexOf(" USD"));
var itemname=largeiteminfo_item_name.innerText;

for (i=0;i<buylist.length;i++){
    
    if(itemname==buylist[i].name)
    {
        if(price <=buylist[i].price)
        {
          
            buy_button.click();
            market_buynow_dialog_accept_ssa.click();
            Purchase_button.click();
        }else
        {
            window.location.href=window.location.href;
            window.setInterval(function(){window.location.href=window.location.href;}, 5000);
            
        }
    }
 }
     
});                         
  }
catch(err)
  {
  window.location.href=window.location.href;
  }
