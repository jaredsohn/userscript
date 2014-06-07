// ==UserScript==
// @name       sade dizi-mag
// @namespace  http://userscripts.org/users/486666
// @version    3
// @description  dizi-mag.com sitesindeki reklamları temizler arkaplanı siyah yapar, dizi görüntüleme ekranını genişletir
// @match      http://www.dizi-mag.com/*
// @copyright  lostcontrol
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

    $('#backkapat').remove();
    BackDegis2('/bgdi/w14');

    $("div.fp").remove();
    $("iframe").remove();
    $(".gizle").remove();
    $(".rekustx").remove();
    $(".sh_yeni").remove();
    $(".pskin_lin").remove();
    $(".xreklamac").remove();
    $("#movie").children("div")[2].remove();
    $(".tlbust_po.popup.tlb_div").remove();
    $($("#goster_bolumliste").children("div.awesome")[0]).removeClass("awesome");
    $("body").attr("style","background-image: url() !important; background-color: #000000 !important");
    $("a[target=_blank]").remove();
    $("#goster_yorum").hide();
    $("#topmen").hide();
    
    genislet(1);
    $("#mediaspace_wrapper").css("background-color", "#2e2e2e").css("padding", "5");
    $($("div[xclass='togg']").children()[0]).children()[1].remove();
});