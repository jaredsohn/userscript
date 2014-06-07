// ==UserScript==
// @name           Make offer in market
// @description	   It make offer in market easily
// @version        1.0
// @author         Aywac
// @include        http://en*.tribalwars.net/game.php?*&mode=own_offer*
// ==/UserScript==

$(".modemenu").after('<table class="tbl bbcodetable"><tbody>\
<tr><td style="background:#f0e2be;"><img src="/graphic/minus.png"></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="aaa" href="#">iron with stone</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="bbb" href="#">iron with wood</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="ccc" href="#">stone with iron</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="ddd" href="#">stone with wood</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="eee" href="#">wood with iron</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="fff" href="#">wood with stone</a></td></tr>\
</tbody></table>');

$(".bbcodetable").click(function(){
    $(this).find("tr:eq(0)").nextAll("tr").fadeToggle("3000");
});

$("#aaa").click(function(){
    $(".vis:last").find("input:eq(0)").val("1000");
    $(".vis:last").find("input:eq(4)").val("1000");
    $("#res_sell_iron").click();
    $("#res_buy_stone").click();
});

$("#bbb").click(function(){
    $(".vis:last").find("input:eq(0)").val("1000");
    $(".vis:last").find("input:eq(4)").val("1000");
    $("#res_sell_iron").click();
    $("#res_buy_wood").click();
});

$("#ccc").click(function(){
    $(".vis:last").find("input:eq(0)").val("1000");
    $(".vis:last").find("input:eq(4)").val("1000");
    $("#res_sell_stone").click();
    $("#res_buy_iron").click();
});

$("#ddd").click(function(){
    $(".vis:last").find("input:eq(0)").val("1000");
    $(".vis:last").find("input:eq(4)").val("1000");
    $("#res_sell_stone").click();
    $("#res_buy_wood").click();
});

$("#eee").click(function(){
    $(".vis:last").find("input:eq(0)").val("1000");
    $(".vis:last").find("input:eq(4)").val("1000");
    $("#res_sell_wood").click();
    $("#res_buy_iron").click();
});

$("#fff").click(function(){
    $(".vis:last").find("input:eq(0)").val("1000");
    $(".vis:last").find("input:eq(4)").val("1000");
    $("#res_sell_wood").click();
    $("#res_buy_stone").click();
});