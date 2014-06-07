// ==UserScript==
// @name       Betfair
// @namespace  http://betfair.com
// @version    0.1
// @description  betfair
// @match      http://www.betfair.com/exchange/horse-racing/market*
// @match      http://sports.betfair.com/*
// @copyright  2014, Ricardo Franco
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

jQuery(document).ready(function() {
    GM_addStyle(".total-green-horse td {background-color: #6AFB92 !important;}");
    GM_addStyle(".green-horse td:first-child {background-color: #6AFB92 !important;}");
    GM_addStyle(".red-horse {background-color: #F75D59 !important;}");
    //GM_addStyle(".super-odds {float: right}");
    //GM_addStyle(".super-odds.green {color: red}");
    
    jQuery('body').on('click', '.green-horse-link', function(){
        jQuery(this).closest('tr').toggleClass('green-horse');
    });
    
    jQuery('body').on('click', '.red-horse-link', function(){
        jQuery(this).closest('tr').toggleClass('red-horse');
    });
    
	setInterval(function(){
        jQuery('input[type=text].text.stake.numeric').each(function() {
            if (jQuery(this).val() == '') {
                jQuery(this).val('4');
                jQuery(this).click();
            }
        });
        
        jQuery('td.lay.lay-cell button.cta-lay .price').each(function(){
            //if (parseInt(jQuery(this).text()) < 2 && parseInt(jQuery(this).closest('button').find('.size').text().substring(1)) >= 4) {
            //    if (!jQuery(this).closest('button').hasClass('active')) {
            //        jQuery(this).click();
            //    }
            //}
            
            if (parseInt(jQuery(this).text()) <= 2.5 && parseInt(jQuery(this).closest('button').find('.size').text().substring(1)) >= 4) {
                jQuery(this).closest('tr').addClass('total-green-horse');
            } else {
                jQuery(this).closest('tr').removeClass('total-green-horse');
            }
            
            //if (jQuery(this).closest('tr').find('td:first-child').find('.super-odds').length == 0) {
            //	jQuery(this).closest('tr').find('td:first-child').append("<span class='super-odds'></span>");
            //    jQuery(this).closest('tr').find('td:first-child').find('.super-odds').text(1000);
            //}
            
            //var odds = parseFloat(jQuery(this).closest('tr').find('.super-odds').text());
            //var new_odds = parseFloat(jQuery(this).text());
            
            //if (new_odds < odds) {
            //    jQuery(this).closest('tr').find('.super-odds').text(new_odds);
            //}
            
            //if (parseFloat(jQuery(this).closest('tr').find('.super-odds').text()) <= 2) {
            //	jQuery(this).closest('tr').find('.super-odds').addClass('green');
            //} else {
            //    jQuery(this).closest('tr').find('.super-odds').removeClass('green');
            //}
        });
        
        jQuery('tr.runner-row td:first-child').each(function() {
            if (jQuery(this).find('a.green-horse-link').length == 0) {
                jQuery(this).append("<a href='javascript:void(0)' class='green-horse-link'>Green</a>");
                jQuery(this).append("<a href='javascript:void(0)' class='red-horse-link' style='margin-left: 10px'>Red</a>");
            }
        });     
    }, 500);
});