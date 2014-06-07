// ==UserScript==
// @name         Quibids Logger
// @namespace    http://herbalcell.com
// @version      0.1
// @description  Logs entire history of an auction if page is loaded and left open (refreshing is fine) during entire auction
// @match        http://www.quibids.com/en/auction-*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


var bid_counts = {};
$(function(){
    if (localStorage.getItem(window.location.href) != null) {
        bid_counts = JSON.parse(localStorage.getItem(window.location.href));
    }

    $('.module.auction-right').append('\
        <div id="extended-bid-history">\
            <h3 class="orange bold">Extended Bidding History</h3>\
            <div id="extended-bid-history-left"><table></table></div>\
            <div id="extended-bid-history-right"><table></table></div>\
        </div>'
    );
    $('.module.auction-right').css('height','auto');
    $('#extended-bid-history').css({'clear':'both','border-top':'solid 1px #D9D9D9','font-size':'11px'});
    $('#extended-bid-history div').css({'width':'254px','padding':'10px'});
    $('#extended-bid-history table').css({'width':'100%'});
    $('#extended-bid-history-left').css({'float':'left','border-right':'1px solid #D9D9D9'});
    $('#extended-bid-history-right').css({'float':'right'});

    setInterval(updateBidCounts, 3000);
    setInterval(populateExtendedBidHistory, 10000);
    setInterval(function(){location.reload();}, 600000); // prevent page timeout
});


var current_price;
var previous_price;
function updateBidCounts(){
    $bid_history = $("#bid-history");
    current_price = moneyStringToFloat($bid_history.find('tr.bold > td.amount'));
    if (current_price != previous_price) {
        $bid_history.find('tr').each(function(){
            var current_row = $(this);
            var bidder = current_row.find('td.username').text();
            var bid_amount = moneyStringToFloat(current_row.find('td.amount'));
            if (previous_price < bid_amount) { // new bid to log
                if (bidder in bid_counts) {
                    bid_counts[bidder] = bid_counts[bidder] + 1;
                } else {
                    bid_counts[bidder] = 1;
                }
            }
        });
        previous_price = current_price;
    }
    localStorage.setItem(window.location.href, JSON.stringify(bid_counts));
}


function populateExtendedBidHistory(){
    $('#extended-bid-history tr').remove();
    var sorted_bid_counts = sort(bid_counts);
    var halfway_index = Math.round(sorted_bid_counts.length / 2);
    populateTableRows(sorted_bid_counts.slice(0, halfway_index), $('#extended-bid-history-left table'));
    populateTableRows(sorted_bid_counts.slice(halfway_index), $('#extended-bid-history-right table'));
    $('#extended-bid-history tr td').css('padding','0 10px');
}


function populateTableRows(sorted_bid_counts, $table){
    for (var i = 0; i < sorted_bid_counts.length; i++) {
        var bidder = sorted_bid_counts[i][0];
        var bid_count = sorted_bid_counts[i][1];
        var bid_money_spent = (bid_count * 0.60).toFixed(2);
        var total_money_spent = (bid_count * 0.60 + current_price).toFixed(2);
        $table.append('<tr><td>' + bidder + '</td><td>$' + bid_money_spent + '</td><td>$' + total_money_spent + '</td></tr>');
    }
}


function sort(dict){
    var tuples = [];
    for (var key in dict) tuples.push([key, dict[key]]);
    tuples.sort(function(a, b) {
        a = a[1];
        b = b[1];
        return a > b ? -1 : (a < b ? 1 : 0);
    });
    return tuples;
}


function moneyStringToFloat($elementContainingString) {
    return parseFloat($elementContainingString.text().replace('$',''), 10);
}