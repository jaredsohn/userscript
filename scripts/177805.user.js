// ==UserScript==
// @name        IngotEnhance
// @namespace   http://thenathang.com
// @description Misc enhancements for Ingot forums.
// @include     http://forums.ingotmc.org/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var $name = $('#pageDescription .username').text();

$(".bbCodeQuote .attribution").css({"border-bottom-width":"0px"});
$(".messageList .message").css({"border-radius":"0px","-webkit-border-radius":"0px","-moz-border-radius":"0px","-khtml-border-radius":"0px"});
$(".messageUserBlock .extraUserInfo").css({"border-radius":"0px","-webkit-border-radius":"0px","-moz-border-radius":"0px","-khtml-border-radius":"0px"});
$(".resourceListMain .tabs").css({"padding-left":"0px","padding-right":"0px"});
$(".visitorText").after('<div style="clear:both;"></div>');
$(document).ready(function () {
    if(window.location.href.indexOf("threads") > -1) {
       $(".userText:contains(" + $name + ")").append('<em class="userBanner bannerYellow wrapped" itemprop="title"><span class="before"></span><strong>Original Poster</strong><span class="after"></span></em>');
    }
});
