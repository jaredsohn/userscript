// ==UserScript==
// @name       Steam Crate Helper by backpack.tf
// @namespace  http://backpack.tf/market
// @version    0.3
// @description  shows the crate/chest series on tf2 and dota2 
// @match      http://steamcommunity.com/market*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright  2012+, backpack.tf
// ==/UserScript==
var crateListings = [];
function scanCrates() {
    $('.market_listing_buy_button').each( function(e) {
        if($(this).hasClass('done') == 0)
        {
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
            $(this).addClass('done');
        } 
    });
    
    jQuery.each(unsafeWindow.g_rgAssets, function(appid, apps) {
        jQuery.each(apps, function(instanceid, assets) {
            jQuery.each(assets, function(i, item) {
                  // get crate number
                  var re1='Series .*?';	// Non-greedy match on filler
                  var re2='(\\d+)';	// Integer Number 1
            
                  var p = new RegExp(re1+re2,["i"]);
                  var m = p.exec(item.descriptions[0].value);
                  if (m != null)
                  {   
                      jQuery.each( crateListings, function(key, val)
                      {
                         if(val[4] == item.id)
                         {
                             var elem = $('#listing_'+ val[1] +'_name, #listing_sell_new_' + val[1] +'_name');
                             if(!$(elem).hasClass('done'))
                                 $(elem).addClass('done').append(' #' + m[1]).nextAll('span').append(' - Series ' + m[1]);
                        }
                      });
                  }
            });
        });
    });
}
$( function() {
    scanCrates();
    setInterval( function() { scanCrates(); }, 500 );
});