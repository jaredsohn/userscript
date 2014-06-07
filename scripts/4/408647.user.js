// ==UserScript==
// @name       Payoneer Currency Conversion Rate
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description Show the rate used if charged not in USD
// @match      https://myaccount.payoneer.com/*
// @copyright  2014+, Andrew, andryk.rv@gmail.com
// ==/UserScript==



$(document).ajaxSuccess(function(event, request, settings) {
    if(settings.url.indexOf('TransactionDetailsTemplate.aspx') == 0) {
        var resp = $(request.responseText);
        var localCurrencyEl = resp.find('#lblForeignCurrencyAmount');
        if(localCurrencyEl.size() != 1)
            return;
        var localAmount = parseFloat(localCurrencyEl.text());
        var localCurrencyLabel = localCurrencyEl.text().split(' ')[1];
        var usdCurrencyEl = resp.find('#lblTotalCharged');
        var usdAmount = parseFloat(usdCurrencyEl.text().replace('$',''));
        var rate = localAmount / usdAmount;
        
        var currencyRateStr = '( ' + rate.toFixed(3) + ' ' + localCurrencyLabel + '/USD )';
        var newTotal = usdCurrencyEl.text() + ' ' + currencyRateStr;
        request.responseText = request.responseText.replace(usdCurrencyEl.text(), newTotal);
    }
    
  
});