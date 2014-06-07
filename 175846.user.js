// ==UserScript==
// @name           إنشاء عرض في السوق
// @description	   يقوم بإنشاء عرض في السوق بسهولة
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&mode=own_offer*
// ==/UserScript==

$(".modemenu").after('<table class="tbl bbcodetable"><tbody>\
<tr><td style="background:#f0e2be;"><img src="/graphic/minus.png"></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="aaa" href="#">حديد مقابل طمي</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="bbb" href="#">حديد مقابل خشب</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="ccc" href="#">طمي مقابل حديد</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="ddd" href="#">طمي مقابل خشب</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="eee" href="#">خشب مقابل حديد</a></td></tr>\
<tr style="display: none;"><td style="background:#f0e2be;"><a id="fff" href="#">خشب مقابل طمي</a></td></tr>\
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