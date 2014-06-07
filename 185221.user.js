// ==UserScript==
// @name       No More Cryptocoin
// @namespace  net.haxd
// @version    0.1
// @description  Removes Bitcoin / Litecoin / Crapcoin posts from Hacker News
// @match      https://news.ycombinator.com/*
// @include    http://news.ycombinator.com/*
// @copyright  2013 Robin Duckett
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at document-end
// ==/UserScript==

jQuery(function($) {
    var definitions = [
        'Bitcoin', 'Litecoin', 'Cryptocoin', 'Dread Pirate', 'BTC', 'LTC', 'Satoshi', 'Nakamoto', '*coin', 'Mt.Gox', 'coin crash', 'Blockchain', 'Bitstamp', 'Cryptocurrency', 'Cryptocurrencies'
    ];
    
    var removed = 0;
    
    definitions.forEach(function(bitshite) {
        var a = $('td.title:contains(\'' + bitshite + '\')');
        var b = $('td.title:contains(\'' + bitshite.toLowerCase() + '\')');
        var c = $('td.title:contains(\'' + bitshite.toUpperCase() + '\')');            
        
        removed += a.length + b.length + c.length;
            
        a.closest('tr').remove();
        b.closest('tr').remove();
        c.closest('tr').remove();
    });
    
    GM_log('Removed ' + removed + ' cryptocoin nonsense posts');
}(jQuery));

