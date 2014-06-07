// ==UserScript==
// @name       百度排名序号
// @namespace  http://bobpeng.com/
// @version    0.0.2
// @description  百度排名序号
// @match      http://www.baidu.com/*
// @require    http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @copyright  2013+, BobPeng
// ==/UserScript==

$(function(){
     for(var i=1;i<1000;i++){
          $("#container #content_left #"+i).addClass("bobpeng-table");
          $("#container #content_left #"+i).before("<div class='bobpeng-num'>"+i+"、"+"</div>");
          $("#container #content_left #"+i).after("<div class='bobpeng-clear'></div>");
     };
    $("span.g:contains(buycrab.cn)").parent("div").before("<div class='bobpeng-right'>√</div>");
    $("span.g:contains(crabchina.com)").parent("div").before("<div class='bobpeng-right'>√</div>");
    $("span.g:contains(chinaliankao.com)").parent("div").before("<div class='bobpeng-right'>√</div>");
    $("span.g:contains(maxon-soft.com)").parent("div").before("<div class='bobpeng-right'>√</div>");
    $("span.g:contains(kisling.com.cn)").parent("div").before("<div class='bobpeng-right'>√</div>");
})