
// ==UserScript==
// @name           ali213 遊俠網
// @description    make ali213 lighter
// @author         Whany K. Thunder
// @include        http://game.ali213.net/*
// @mathc          forum.php
// @version        1.0
// ==/UserScript==

$("div#postlist>div:gt(0)").hide();
$("div.hdc.cl").hide();
$("#hd").hide();
$("div[align=center]").hide();
$("div.wp.a_f").hide();
$("#ft").hide();


$("a[href^=http://game.ali213.net/forum-viewthread-tid]").click(function(){
  var tid = $(this).attr("href").replace("http://game.ali213.net/forum-viewthread-tid-","");
  $(this).removeAttr("href");
  window.open("http://game.ali213.net/forum.php?mod=viewthread&tid=" + tid, '_blank');
  //window.location.href = "http://game.ali213.net/forum.php?mod=viewthread&tid=" + $(this).attr("href").replace("http://game.ali213.net/forum-viewthread-tid-","");
});