// ==UserScript==
// @name       ST express
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include      http://*/announce_send_goods.htm*
// @require    http://code.jquery.com/jquery-1.10.2.min.js
// @copyright  2012+, You
// ==/UserScript==
$(document).ready(function(){
    setTimeout(function(){
        $("ul.list-ul.list").children("li:eq(0)").removeClass( "current" );
        $("div.tab-c.ali56").attr("style","display: none;");
        $("ul.list-ul.list").children("li:eq(1)").addClass( "current" );
        $("div.tab-c:eq(1)").attr("style","display: block;");
        $("#self-deliver-companyname").val("1");
        $("#self-delivery-number").focus();
    },1000)
});