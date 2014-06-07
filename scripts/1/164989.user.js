// ==UserScript==
// @name        MtGox Helper
// @namespace   http://twitter.com/GDorn
// @include     https://mtgox.com/trade*
// @include     https://mtgox.com/index.html
// @version     2
// @grant       none
// ==/UserScript==
var $ = window.$;
var jQuery = window.jQuery;

function getTradeCost(){
    var cost_string = jQuery(".progressStart")[0].textContent;
    return parseFloat(cost_string) / 100;
}


var resellPriceSpan;
var rebuyPriceSpan;
function create_msg_divs(){
    $('#buyPrice').after("<br><span id='resellPrice'>&nbsp;</span>");
    $('#sellPrice').after("<br><span id='rebuyPrice'>&nbsp;</span>");
    resellPriceSpan = $('#resellPrice');
    rebuyPriceSpan = $('#rebuyPrice');
}

var handleTrade = function(what){
    doubleTradeCost = getTradeCost() * 2;
    target = what.target.id;
    
    if(target == 'buyAmount' || target == 'buyPrice'){
        buyAmount = parseFloat(jQuery('#buyAmount')[0].value);
        buyPrice = parseFloat(jQuery('#buyPrice')[0].value);
        
        resellPrice = buyPrice * (1+doubleTradeCost);
        msg = "Resell at: $" + resellPrice;
        
        resellPriceSpan.text(msg).show();        

    } else {
        sellAmount = parseFloat(jQuery('#sellAmount')[0].value);
        sellPrice = parseFloat(jQuery('#sellPrice')[0].value);
        rebuyPrice = sellPrice / (1+doubleTradeCost);
        msg = "Rebuy at: $" + rebuyPrice;
        rebuyPriceSpan.text(msg).show();
    }
}

jQuery(document).ready( function(){
    create_msg_divs();
    jQuery('#buyAmount').bind('blur', handleTrade);
    jQuery('#buyPrice').bind('blur', handleTrade);
    jQuery('#sellAmount').bind('blur', handleTrade);
    jQuery('#sellPrice').bind('blur', handleTrade);
});