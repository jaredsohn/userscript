// ==UserScript==
// @name        ProfitPercent
// @namespace   SMK
// @include     http://www.gw2spidy.com/search/*
// @include     http://www.gw2spidy.com/watchlist*
// @include     http://www.gw2spidy.com/type/*
// @version     1
// ==/UserScript==
(function() {

// Decimal precision for percent
var decimalPlaces = 2;

var content = $('#content');
var table = content.find('table').first();
var tableColumns = table.find('thead').find('tr').first().find('th');

// Append new header to table for profit percent.
tableColumns.eq(tableColumns.length - 2).after('<th>Profit %</th>');

// Iterate through each search result
table.find('tbody').find('tr').each(function() {
    var margin = $(this).find('td.margin');
    var maxBuyOffer = $(this).find('td.max_offer_unit_price');
    
    // Copper value from 'margin' column
    var marginAmount = parseCoins(margin.find('.gw2money-fragment'));
    
    // Copper value from 'max buy offer' column
    var maxBuyOfferAmount = parseCoins(maxBuyOffer.find('.gw2money-fragment'));
    
    // Calculate profit percent
    var profitPercent = marginAmount / maxBuyOfferAmount;
        profitPercent = (profitPercent * 100).toFixed(decimalPlaces > 0 ? decimalPlaces : 2);
        profitPercent = !isNaN(profitPercent) && profitPercent > 0 ? profitPercent : 0;
        
        margin.after('<td>' + c(profitPercent) + '%</td>');
        

});

// Function to get copper amount from money fragments
function parseCoins(string) {

    var coins = 0;

    var gold = string.find('.gw2money-gold');
    var silver = string.find('.gw2money-silver');
    var copper = string.find('.gw2money-copper');
    
    gold = gold.length > 0 ? gold.parent().html().match(/^\d+/)[0] : 0;
    silver = silver.length > 0 ? silver.parent().html().match(/^\d+/)[0] : 0;
    copper = copper.length > 0 ? copper.parent().html().match(/^\d+/)[0] : 0;
    
    gold = parseInt(gold);
    silver = parseInt(silver);
    copper = parseInt(copper);
    
    coins += gold * 10000;
    coins += silver * 100;
    coins += copper;
    
    return coins;
    
}

// Comma format
function c(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


})();