// ==UserScript==
// @name           TradeHill Ticker
// @namespace      http://twitter.com/GDorn
// @description    Embeds a self-refreshing data from the TradeHill API on all TH pages.
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include        https://www.tradehill.com/*
// ==/UserScript==

var API_URL = "https://api.tradehill.com/APIv1/USD/Ticker";

var DELAY = 10;
var timer = 0;
var currenc_btc_value = 0;

function add_ticker_div(){
    $('<div id="ticker2"><span id="ticker_results"></span><span id="timer" style="float:right">&nbsp;</span></div>').prependTo($('.header'));
}



function update_time(){
    timer_text = "  Refresh in " + timer;
    $('#timer').text(timer_text);
}


function tick(){
    timer--;
    if (timer >= 0){
        return update_time();
    }
    if (timer <= 0){
        timer = DELAY;
        
        $.ajax({url: API_URL, 
                success: update_ticker_with_data,
                crossDomain: true,
		dataType: 'json',
                });

    }
}


function update_ticker_with_data(data){
    ticker = data['ticker'];	
    buy = roundNumber(parseFloat(ticker['buy']), 4);
    sell = roundNumber(parseFloat(ticker['sell']), 4);
    last = roundNumber(parseFloat(ticker['last']), 4);
    high = roundNumber(parseFloat(ticker['high']), 4);
    low = roundNumber(parseFloat(ticker['low']), 4);
	    
    var ticker_string = "Buy: " + buy;
    ticker_string += " Sell: " + sell;
    ticker_string += " High: " + high;
    ticker_string += " Low: " + low;
    ticker_string += " Last: " + last + " (" + ticker['last_when'] + ")";
    
    $('#ticker_results').text(ticker_string);
    avg = roundNumber((last + sell) / 2, 4);
    update_btc_values( avg );
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
 
window.addEventListener("load", function(){add_ticker_div()}, false);
 
 
 window.addEventListener("load", function(){
        setInterval(
            function(){tick()},
            1000
        );
    
}, false);

function update_btc_values(value){
    var currency_table = $("table#data:contains('Currency')");
    var btc_row = currency_table.find("tr:contains('BTC')");
    var btc_amount_td = btc_row.find("td:contains('BTC')").next();
    var btc_amount = parseFloat(btc_amount_td.text());

    var value_td = btc_row.find('.btc_value');

    value_td.text(btc_amount * value);


}


//also, if this is the Dashboard, do the math for the USD value of each BTC in recent transactions.
window.addEventListener("load", function(){
    //create a column to store calculated value of BTC.
    var currency_table = $("table#data:contains('Currency')");
    currency_table.find('tr:first').append("<th>Value, USD</th>");
    currency_table.find('tr:gt(0)').append("<td class='btc_value'> </td>");
    
    var order_tds = $("td:contains('Obtain')");
    order_tds.each(function(index, element){
        var commission_text = $(element).next().next().text();
        var price_text = $(element).next().text();
        var commission_text_parts = commission_text.split(' ');
        var commission = parseFloat(commission_text_parts[0]);
        var text = element.textContent;
        var vals = text.split(" ");
        //unsafeWindow.console.log(vals);
        if(vals[2] == 'BTC'){
            var btc = parseFloat(vals[1]);
            var usd = parseFloat(vals[4]) + commission;
            var price = Math.round(10000*usd/btc) / 10000;
            var breakeven = Math.round(10000*(price+commission/btc)) / 10000;
            var breakeven_text = " (Re-sell: " + breakeven + ")";
        } else {
            var btc = parseFloat(vals[4]);
            var usd = parseFloat(vals[1]) - commission;
            var price = Math.round(10000*usd/btc) / 10000;
            var breakeven = Math.round(10000*(price-commission/usd)) / 10000;
            var breakeven_text = " (Re-buy: " + breakeven + ")";
        }
        
        var new_text = "<td>" + text + " ($" + (price) + "/btc" + breakeven_text + "</td>";
        $(element).replaceWith(new_text);
        
    })
    
}, false);
