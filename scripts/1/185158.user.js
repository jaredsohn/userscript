// ==UserScript==
// @name       i聚超值
// @namespace  http://legendmohe.net/
// @version    0.1
// @description  i聚超值
// @match      http://best.pconline.com.cn/*
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @copyright  2012+, You
// ==/UserScript==

function processClean() {
    $(".banner").remove();
    $(".nav").remove();
    $(".navWrap").remove();
    $("#toolTag > a:eq(0)").remove();
    $("#gameshop").remove();
    $(".txtBox").remove();
    $(".h2Tit").remove();
    $(".layC").remove();
    //$("#bottom").remove();
    //$(".tools").remove();
}

$(document).ready(function() {  
    processClean();
});