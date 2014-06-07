// ==UserScript==
// @name       Steam Market Crate Helper
// @description  Shows the crate series on tf2 new/listings
// @match      http://steamcommunity.com/market/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
var crateListings = [];
function scanCrates() {
    $('.market_listing_buy_button').each( function() {
         var re1='BuyMarketListing.*?';	// Non-greedy match on filler
         var re2='(\\d+)';	// Integer Number 1
         var re3='.*?';	// Non-greedy match on filler
         var re4='(\\d+)';	// Integer Number 2
         var re5='.*?';	// Non-greedy match on filler
         var re6='(\\d+)';	// Integer Number 3
         var re7='.*?';	// Non-greedy match on filler
         var re8='(\\d+)';	// Integer Number 4
   
         var p = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8,["i"]);
         var m = p.exec($(this).html());
         if (m != null)
         {
             var itemid=m[4];
             crateListings.push(m);
         }
    });
    jQuery.each(unsafeWindow.g_rgAssets[440][2], function(i, item) {
          // get crate number
          var re1='.*?';	// Non-greedy match on filler
          var re2='(\\d+)';	// Integer Number 1
   
          var p = new RegExp(re1+re2,["i"]);
          var m = p.exec(item.descriptions[0].value);
          if (m != null)
          {   
              jQuery.each( crateListings, function(key, val)
              {
                 if(val[4] == item.id)
                 { 
                     var elem = $('#listing_sell_new_'+ val[1] +'_name');
                     if(!$(elem).hasClass('done'))
                         $('#listing_sell_new_'+ val[1] +'_name').addClass('done').append(' #' + m[1]);
                 }
              });
          }
    });
}
              
setInterval( function() { scanCrates(); }, 300 );