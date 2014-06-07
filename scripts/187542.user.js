// ==UserScript==
// @name       	Latest Market Prices in Badge Page
// @namespace  	mF4dUS.MarketPriceBadge
// @version    	0.3.2
// @description List 5 latest price of each card that need to be collected. A new button to Foil Card Market of that Card.
// @match      	http://steamcommunity.com/id/*/gamecards/*/
// @match      	http://steamcommunity.com/id/*/gamecards/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @copyright  	2014, mF4dUS
// ==/UserScript==

var totalPrice = 0.0;
var marketBadgeAnchor = $(".badge_card_to_collect_links a:last-child");

marketBadgeAnchor.each(function(dvIndex, dvElement){
    var marketUrl = $(dvElement).attr('href');
    var foilUrl = marketUrl.indexOf('%28Trading%20Card%29') < 0 ? (marketUrl + '%20%28Foil%29') : marketUrl.replace('%28Trading%20Card%29', '%28Foil%20Trading%20Card%29');

    $(dvElement).parent().append(' &nbsp; <a href="'+foilUrl+'" class="btn_grey_grey btn_medium"><span>Search the Market (Foil)</span></a>');
    
    $.get(marketUrl, function(data,status){
        if(status == 'success') {
            var price = [];
            var html = $('<div></div>');
            html.append($(data));
            
            html.find('span .market_listing_price_with_fee').each(function(index, spElement) {
                var priceText = $(spElement).text();
                price.push(priceText);
                
                if (index == 0 && priceText.indexOf("Sold!") < 0) {
                    var actPrice = parseFloat(priceText.replace(/\s/g, '').replace("USD", '').substring(1));                    
                    updateTotalPrice(actPrice);
                }
                
                if (index > 4) return false;
        	});

            $(dvElement).parent().next('div').next('div').append('<div style="height:10px"></div><div align="right" style="color:#E6E4A5;" >'+price.join(', ')+'</div>');
        }
    })
    .fail(function() {
        $(dvElement).parent().next('div').next('div').append('<div style="height:10px"></div><div align="right" style="color:#E6A5A5;" >Error!!</div>');
    });
    
    if (dvIndex == marketBadgeAnchor.length - 1) {
        $(dvElement).parent().next('div').next('div').next('div').append('<div style="height:10px"></div><div class="totalPrice" align="right" style="color:#E6E4A5;" >Total Cheapest Price: 0.0</div>');
    }
});
    
function updateTotalPrice(price) {
    totalPrice += price;
    $(".totalPrice").text('Total Cheapest Price: '+totalPrice);
}
