// ==UserScript==
// @name           weinisi.5d6d.net
// @namespace      http://fankyxhl.github.com
// @author         FrankXU
// @description    Test
// @include        http://weinisi.5d6d.net/*
// @version        1.2
// @grant          none
// @require        http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==\
//$('#header :not(:contains(#umenu)').remove();
$(document).ready(function() {
    $('body, #header, #wrap,.postauthor,td.modaction').css("background","url('http://ww4.sinaimg.cn/large/a74ecc4cjw1dzqys6ffwvj.jpg') repeat center top");
    $("*").css("font-family","微软雅黑,arial,sans-serif");
    $("#umenu").appendTo("#header");
    $("#header div.wrap, #sidebar_img").remove();
    //$("#umenu").appendTo("#header div.wrap");
    $("#umenu *").appendTo("#nav");
    $("#wrap").removeClass("with_side");
    $("#sidebar").css("display","none");
    $("#menu,.main .content div:first,#wowopm_ntc").remove();
    $(".wrap.s_clear.threadfix div:first").remove();
    $(".wrap.s_clear.threadfix div:first").remove();
    $('a[href^="http://weinisi.5d6d.net/wowo"],a[href^="wowoinvite.php"]').remove();
    $(".adcontent,#header,#footer").remove();
    $("#nav,#nav *,#nav a,#umenu *").css("color","black");
});