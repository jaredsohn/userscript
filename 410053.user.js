// ==UserScript==
// @name        Cryptsy+
// @namespace   arvo
// @description Makes Cryptsy Better!
// @include     https://www.cryptsy.com/*
// @version     2.5.2b
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_info
// ==/UserScript==

$(window).load(function(){
    
    var v = "v" + GM_info.script.version;
    $("img[src='/img/biglogo.png?rev=2']").attr({"src":"http://i.imgur.com/4Ya5bTR.png","alt":v});
    $(".navbar-brand img").width("170px");
    $(".navbar-brand img").each(function() {
        var imageCaption = $(this).attr("alt");
        
        if (imageCaption != '') {
            var imgWidth = $(this).width();
            var imgHeight = $(this).height();
            var position = $(this).position();
            var positionTop = (position.top + imgHeight - 32);
            $("<span class='version'><small>"+imageCaption+"</small></span>")
            .css({"position":"absolute", "top":positionTop+"px", "left":imgWidth + 32 +"px", "color":"#eee"})
            .insertAfter(this);
        }
        
    });
    $("#sidebar .moduletable.moduletable-usd-markets").before('<div class="moduletable moduletable-usd-markets"><div class="moduletable-header"><span class="glyphicon glyphicon-btc-markets"></span> Exchanges (BTC/USD)</div><div class="usd-markets-wrap" id="usd-markets"><ul class="nav nav-list" style="-webkit-transition: 0ms cubic-bezier(0.1, 0.57, 0.1, 1); transition: 0ms cubic-bezier(0.1, 0.57, 0.1, 1); -webkit-transform: translate(0px, 0px) translateZ(0px);"><li><a href="https://coinbase.com/?r=52f749b24b33385a5200006f&amp;utm_campaign=user-referral&amp;src=referral-link" title="COINBASE BTC/USD">Coinbase <span class="pull-right glyphicon glyphicon-arrownone" id="coinbase-glyph"></span> <span class="status pull-right" id="coinbase">null</span></a></li><li><a href="https://btc-e.com/" title="BTC-E BTC/USD">BTC-e <span class="pull-right glyphicon glyphicon-arrownone" id="btce-glyph"></span> <span class="status pull-right" id="btce">null</span></a></li></ul><hr class="separator"></div></div></div>');
    $("#sidebar > div:nth-child(1)").append('<br><small>calculation update in <span id="countdown" class="status">(...)</span></small>');
    $("#btc-total > ul:nth-child(1)").append('<li>USD Estimate<span id="usd_estimate" class="status pull-right">null</span></li>');
    $("#TradeBuyViewForm > fieldset > ol:nth-child(1)").append('<li class="even"><label class="field-title">Net Total <small>(USD)</small></label><span style="padding-left:13px;" id="buyusd">null</span></li>');
    $("#TradeSellViewForm > fieldset > ol:nth-child(1)").append('<li class="even"><label class="field-title">Net Total <small>(USD)</small></label><span style="padding-left:13px;" id="askusd">null</span></li>');
    
    // timers
    window.setInterval(countDown, 1000);
    window.setInterval(accountEstimate, 1000);
    window.setInterval(exchange, 60000);
    
    var seconds = 60;
    function countDown() {
        seconds--;
        if (seconds > 0) {
            $("#countdown").text("( " + seconds + " s )");
        } else {
            if (seconds <= 0) {
                $("#countdown").text("(...)");
            }
        }
    }
    
    function exchange(){
        // initiate countDown
        $("#countdown").text("(...)");
        seconds = 60;
        
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://coinbase.com/api/v1/prices/sell',
            onload: function(response) {
                var data = JSON.parse(response.responseText);
                var coinbase = data.subtotal.amount;
                GM_setValue('coinbase',coinbase);
            }
        });
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://btc-e.com/api/2/btc_usd/ticker',
            onload: function(response) {
                var data = JSON.parse(response.responseText);
                var btce = data.ticker.last;
                GM_setValue('btce',btce);
            }
        });
    }
    
    function accountEstimate() {
        // exchange rates
        var coinbase = GM_getValue('coinbase');
        var btce = GM_getValue('btce');
        var ticker = coinbase;
        if (coinbase > btce) {
            ticker = coinbase;
            $("#coinbase-glyph").text('*');
            $("#btce-glyph").text('');
        } else {
            ticker = btce;
            $("#coinbase-glyph").text('');
            $("#btce-glyph").text('*');
        }
        
        var LTC = $("#market_price_3").text();
        var BTC = $("#btc_total").text();
        var USD = "$" + (BTC * ticker).toFixed(2);
        var ASK = $("#sellnettotalspan").text();
        var BUY = $("#buynettotalspan").text();
        
        // BTC or LTC?
        if (document.title.toLowerCase().indexOf('/ltc') > 0) {
            $("#askusd").text('$' + (ASK*ticker*LTC));
            $("#buyusd").text('$' + (BUY*ticker*LTC));
        } else {
            $("#askusd").text('$' + (ASK*ticker));
            $("#buyusd").text('$' + (BUY*ticker));
        }
        $("#usd_estimate").text(USD);
        
        // coinbase sell prices
        $("#coinbase").text('$' + coinbase);
        $("#btce").text('$' + btce);
    }
    
});