// ==UserScript==
// @name        天猫客户端摇红包
// @namespace   284515036
// @include     http://wapp.m.taobao.com/*
// @version     4
// ==/UserScript==
//活动网址：http://wapp.m.taobao.com/alone/act/925/red.html?ttid=206200@taobao_android_4&sid=8038102f08b31c94cbd847b5ecf38cfb&upsid=60b8121526911cff13e0a48781ed2826&imei=860010020515294&qq-pf-to=pcqq.group&imsi=460018497297077&clk1=60b8121526911cff13e0a48781ed2826
//
//

setInterval(function () {$(".pic").click();if($('div.btn>span.l').text()=="继续摇红包"){$(".l").click();}},2500+Math.floor(Math.random()*800));
