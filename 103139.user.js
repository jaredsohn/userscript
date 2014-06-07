// ==UserScript==
// @name       Hide Plurk Spammer
// @namespace  http://blog.pptpb.org
// @version    0.1.3
// @description    隱藏噗浪裡不想要的廣告商、機器人的噗
// @include    http://www.plurk.com/*
// @include    http://www.plurk.com/p/*
// @include    http://*.plurk.com/*
// @include    http://*.plurk.com/p/*
// @copyright  2011+, pptpb
// @modified log   Created at 2011-05-19
// ==/UserScript==


var SPAMMER = [
    "amylinco2",     // 女僕小C
    "andy821002",    // 新一代.騙卡馬
    "AutoWorship",   // 噗仙™
    "baipu",         // 掰噗~
    "brucepush",     // 布魯斯推推
    "chienwenRobot", // 健文機器人
    "counterbot",    // 小秘書
    "harerobot",     // =瞎噗2.0=
    "i_power",       // 可 i
    "pan_karma",     // 騙卡馬
    "pan_karma_2",   // 胡言亂語的騙卡馬
    "plurkfu",       // 你覺得這噗 有趣 中肯 溫馨
    "pooogle",       // 卡馬警衛
    "remyplurk",     // ...按我轉噗分享
    "repost",        // 轉噗機
    "shiamipu",      // 瞎咪噗
    "SmiLe_Hz",      // I'M HZ!
    "spaplurkbot",   // 女僕SPA
    "we_plurk",      // 噗熱浪
    "wedoit",        // e力小秘書

//  以下是只說早晚安的機器人，討厭的話自己去掉註解
//  "a00000",        // PlurkBuzz
//  "chance_deliver",// 小籤籤
//  "papago_robot",  // 星妹給你噗噗
//  "shitsuji",      // Jin Cendrars
];

var pageSingle;

// load jQuery code by http://joanpiedra.com/jquery/greasemonkey/
var $;


// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');
    
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        pageSingle = (location.href.indexOf('/p/') < 0) ? false : true;
        hideSpam();
    }
}

function hideSpam() {
    if (pageSingle == true) {
        for (i = 0; i < SPAMMER.length; i++)
          $('ul.responses>li').has('a.user[href="/' + SPAMMER[i] + '"]').hide();
    }
    else {
        for (i = 0; i < SPAMMER.length; i++)
          $('div.list>div.plurk').has('a.name[href="/' + SPAMMER[i] + '"]').hide();
    }
    window.setTimeout(hideSpam, 500);
}
