// ==UserScript==
// @name        Monster JTV
// @version    0.65
// @description Get the full screen
// @updateURL https://userscripts.org/scripts/source/183153.meta.js
// @downloadURL https://userscripts.org/scripts/source/183153.user.js
// @include        http://*.justin.tv/*
// @include        http://justin.tv/*
// @exclude        http://justin.tv/
// @exclude        http://www.justin.tv/
// @exclude        http://www.justin.tv/directory/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

    $(".chat-column").remove();
    $(".global-header").remove();
    $(".global-footer").remove();
    $(".channel-description").remove();
	$(".channel-category").remove();
	$(".channel-details").remove();
	$(".channel-about").remove();
	$(".channel-vods").remove();
	$(".channel-player-info").remove();
    $(".channel-section").remove();
    $(".channel_status").remove();
    $(".bottom-leaderboard-adslot").remove();
	$("#PopUnderChan_holder").remove();
	$(".clearfix:after").removeAttr("content");
	$(".channel-player-holder").css({"padding-bottom":"0"}).css({"height":"100%"}).css({"width":"100%"}).css({"padding-top":"0"}).css({"position":"absolute"});
	$(".channel-player-inner").css({"height":"100%"}).css({"min-height":"0"}).css({"position":"absolute"});
    $(".player-column").css({"width":"100%"}).css({"margin-left":"0px"}).css({"min-width":"0"});
    $(".channel-wrapper").css({"margin":"0"}).css({"min-width":"0"}).css({"margin-top":"0px"}).css({"margin-bottom":"0px"}).css({"padding-left":"0px"});
    
	$(".channel-wrapper").each(function () {
      this.style.setProperty("height", "100%", "important");
      this.style.setProperty("width", "100%", "important");
});

	$(".player-column").each(function () {
      this.style.setProperty("height", "100%", "important");
      this.style.setProperty("width", "100%", "important");
});

	$(".channel-player-inner").each(function () {
      this.style.setProperty("height", "100%", "important");
      this.style.setProperty("width", "100%", "important");
});

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    .clearfix.hidden:after {
        display:               none;

    }
    .clearfix:after {
        content:               '';
    }
    
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}