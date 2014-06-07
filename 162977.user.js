// ==UserScript==
// @name        Btc-e Trader
// @namespace   btc-e
// @description Disables the trollbox and adds orders to the left, diasbles visa paypal box and hides latest news and also highlights SELL buttons. You can tweak the script if you want to disable a particular script feture.  enjoy :)   LTC donations: LQDCFNZVNaw8nLa2sBhrBAxZvc9GDqYbLv
// @include     https://btc-e.com/exchange/ltc_btc
// @include     https://btc-e.com/exchange/btc_rur
// @include     https://btc-e.com/exchange/btc_usd
// @include     https://btc-e.com/exchange/btc_eur
// @include     https://btc-e.com/exchange/ltc_btc
// @include     https://btc-e.com/exchange/ltc_usd
// @include     https://btc-e.com/exchange/ltc_rur
// @include     https://btc-e.com/exchange/nmc_btc
// @include     https://btc-e.com/exchange/usd_rur
// @include     https://btc-e.com/exchange/eur_usd
// @include     https://btc-e.com/exchange/nvc_btc
// @include     https://btc-e.com/exchange
// @version     1
// ==/UserScript==

$(document).ready(function (){
    showOrdersOnSidePanel();  //Comment this if you don't want to see orders on side panel
    hideDepositMethods();   //Disable this if you want to see Visa Paypal links
    hideTrollBox();         //Disable this if you want the Chat box
    hideNews();             //If you want to see latest news comment this out
	redButtons();          //Disable red SELL buttons
});

function redButtons()
{
	$('a:contains("Sell")').css('background', '#faa');
    $('a:contains("Sell")').css('color', 'black');
    $('a:contains("Sell")').css('font-weight', 'bold');
	$('a:contains("Buy")').css('background', '#faa');
    $('a:contains("Buy")').css('color', 'black');
    $('a:contains("Buy")').css('font-weight', 'bold');	
}

function showOrdersOnSidePanel()
{
    var o_list = $('#orders-self-list');
    var txt = $(o_list).html();
    var trji = $(o_list).find('tr');
    var js_out = '<h1>Active orders</h1><table style="width: 100%" cellpadding="5">';
    for(var i=0; i<trji.length; i++)
    {
        js_out += '<tr>';
        var tdji = $(trji[i]).find('td');
        for(var j=0; j<tdji.length; j++)
        {
            if(j != 3 && j != 4)
                js_out += '<td>'+$(tdji[j]).html()+'</td>';
        }
        js_out += '<tr>';
    }
    js_out += '</table>';
    var stranski = $('div.block:contains("Our advantages:")');
    $(stranski).css('background', '#efe');
    $(stranski).html(js_out);
}

function hideDepositMethods()
{
    $('img.main-s.main-s-balance1').parents('.block').css('display', 'none');
}

function hideTrollBox()
{
    var chat_jq = $('#nChatCon');
    var block_jq = $(chat_jq).parent('.block').css('display', 'none');
}

function hideNews()
{
    $('h3:contains("Latest news:")').parents('.block').css('display', 'none');
}