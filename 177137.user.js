// ==UserScript==
// @name       Remove Ads on seasonvar.ru
// @version    0.2.4
// @description Remove Ads on seasonvar.ru
// @match      http://seasonvar.ru/*
// @copyright  2012+, You
// ==/UserScript==

$("#br_block").remove();
$("body").attr('style', 'padding: 0 !important');
$($(".film-list-block")[0]).remove();
$("#rpc").remove();
$("#rmg").remove();
$("#lmg").remove();
$("#lpc").remove();
$("#TCCB_4575").remove();
$(".panel").css("clear", "both");
$($(".content-top2 table td")[0]).remove();
$("#brand").remove();
$($(".full-news table td")[1]).remove();
$("#prmbn").remove();
$("iframe").remove();