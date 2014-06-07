// ==UserScript==
// @name      okcoin.helper
// @namespace  https://www.okcoin.com/
// @updateURL       http://userscripts.org/scripts/source/187488.meta.js
// @downloadURL     http://userscripts.org/scripts/source/187488.user.js
// @require     http://code.jquery.com/jquery-1.10.0.min.js
// @version    0.1
// @description  OKcoin 交易助手 行情刷新加速，自动填入密码 ， 撤单链接地址改造
// @include     http://www.okcoin.com
// @include     http*.okcoin.com*
// @match      https://www.okcoin.com/*uy.do*
// @match      https://www.okcoin.com/buy.do?symbol=0&success
// @match      https://www.okcoin.com/*tc.d*
// @match      https://www.okcoin.com/*sell.do*
// @match      https://www.okcoin.com/sell.do?symbol=0&success
// @match      http://www.okcoin.com/sell.do
// @copyright  2012+, You
// ==/UserScript==

(function(){ 
    setInterval(handleTicker, "1000");       
    setInterval(handleEntrust, "1000");
    jQuery('.freetitle').html('<span style="color:red;font-size:bold;font-size:20px;">'+
                              jQuery(jQuery('.Tenbody td')[3]).html() +'-'+jQuery('.lightorange1').html()+' &nbsp;|&nbsp; '+jQuery(jQuery('.Tenbody td')[7]).html())

    jQuery('#tradePwd').val('填入你的密码');   //填入你的密码
    
    var $price = jQuery('#tradeCnyPrice');
    var $amout = jQuery('#tradeAmount');   
    var $all = jQuery('#tradeTurnover'); //总金额
    //获得资金总数
    var money = jQuery(jQuery('.moneynum')[0]).html().split('&')[0]*1;
    //卖1价格
    var sell = jQuery(jQuery('.c2')[5]).html()*1;
    //买1价格
    var buy = jQuery(jQuery('.c2')[6]).html()*1;
    //如果是买，要比买1更高，如果是卖，要比卖1更低
    $price.val(tarMoney.toFixed(2));
    $all.val(money);
    $all.keyup();
})()

function numberWithCommas(x) {
    // 12345 -> 12,345
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function handleEntrust2(){        
    jQuery('#tradeAmount') .val( numberWithCommas (11123) );
    var symbol = document.getElementById("symbol").value;
    var tradetype = document.getElementById("tradetype").value;
    var url = "https://www.okcoin.com/handleEntrust.do?symbol="+symbol+"&tradetype="+tradetype+"&random="+Math.round(Math.random()*100);
    jQuery("#coinBoxbuybtc").load(url,function (data){ });
}    

