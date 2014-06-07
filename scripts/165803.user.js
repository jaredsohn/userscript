// ==UserScript==
// @name       BFX-Stats
// @namespace  http://api.mccoyspace.com/
// @version    0.5
// @description  Stats Parser
// @match      https://www.bitfinex.com/*
// @match      https://bitfinex.com/*
// @copyright  2013, mccoyspace <info@mccoyspace.com>, AGPLv3
// @grant      none
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;


window.get_data = function get_data(){

        
        //get loan rates and loan data
        var usd_rate = 0;
        var usd_loan_period = 0;
        var usd_total_loans = 0;
        var btc_rate = 0;
        var btc_loan_period = 0;
        var btc_total_loans = 0;
        
        var usd_rateTemp = $("div#interestrates > table > tbody > tr:eq(0) > td:eq(1)").text().split('%');
        usd_rate = usd_rateTemp[0];
        
        var usd_loan_periodTemp = $("div#interestrates > table > tbody > tr:eq(0) > td:eq(2)").text().split(' ');
        usd_loan_period = usd_loan_periodTemp[0];
        
        var usd_total_loansTemp = $("div#interestrates > table > tbody > tr:eq(0) > td:eq(3)").text().split(' ');
        usd_total_loans = usd_total_loansTemp[0];
        
        var btc_rateTemp = $("div#interestrates > table > tbody > tr:eq(1) > td:eq(1)").text().split('%');
        btc_rate = btc_rateTemp[0];
        
        var btc_loan_periodTemp = $("div#interestrates > table > tbody > tr:eq(1) > td:eq(2)").text().split(' ');
        btc_loan_period = btc_loan_periodTemp[0];
        
        var btc_total_loansTemp = $("div#interestrates > table > tbody > tr:eq(1) > td:eq(3)").text().split(' ');
        btc_total_loans = btc_total_loansTemp[0];
        
        //get volume data
        var volume_24h = 0;
        var volume_7day = 0;
        
        volume_24h = $("strong:eq(0)").text();
        volume_7day = $("strong:eq(1)").text();
        
        //get market sentiment
        var sentiment_bull = 0;
        var sentiment_bear = 0;
        
        sentiment_bull = $("div[class=bull] > span").attr('style');
        sentiment_bear = $("div[class=bear] > span").attr('style');
        
        //get irrational index
        var irrational_index_bull = 0;
        var irrational_index_bear = 0;
        
        irrational_index_bull = $("strong:eq(2)").text();
        irrational_index_bear = $("strong:eq(3)").text();
        
        //get risk score
        var risk_score = 0;
        
        risk_score = $("strong:eq(4)").text();
        
        
        //get greed_score
        var greed_score = 0;
        
        greed_score = $("strong:eq(5)").text();
        
        //make timestamp
        var timestamp = new Date().getTime();
        
        //make a market data object
        var market_data_object = {
            "usd_rate": usd_rate,
            "usd_loan_period": usd_loan_period,
            "usd_total_loans": usd_total_loans,
            "btc_rate": btc_rate,
            "btc_loan_period": btc_loan_period,
            "btc_total_loans": btc_total_loans,
            "volume_24h": volume_24h,
            "volume_7day": volume_7day,
            "sentiment_bull": sentiment_bull,
            "sentiment_bear": sentiment_bear,
            "irrational_index_bull": irrational_index_bull,
            "irrational_index_bear": irrational_index_bear,
            "risk_score": risk_score,
            "greed_score": greed_score,
            "timestamp": timestamp
        };

    //alert(market_data_object[0]);

}



if (window.location.href.match(/^https:\/\/(?:www\.)?bitfinex.com\/pages\/stats/)) {
    $("div.brand h1").text("BFX - StatsGrabr");
     setTimeout ("window.get_data();", 2000);
     setInterval("location.reload(true);", (5*60*1000));

}
