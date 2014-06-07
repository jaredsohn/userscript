
// ==UserScript==
// @name      highlight-wuma
// @match      http://97.99bitgongchang.org/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$("a:contains('无码')").css("color","red")

wuma = $("a:contains('亚洲无码')")
oumei= $("a:contains('欧美')")
youma = $("a:contains('日本同步')")

wuma.css("color","red")
oumei.css("color","blue")
youma.css("color","grey")

youma.css("font-size","24pt")
oumei.css("font-size","24pt")
wuma.css("font-size","24pt")


oumei.css("display","none")