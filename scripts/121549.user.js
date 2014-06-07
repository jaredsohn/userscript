// ==UserScript==
// @name           tiptopscriptByBill
// @namespace      bill
// @include        http://tiptop.if.ua/*
// @require  http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==
//var debug = new jQuery.debug();
$("table.tbcf").remove();
$("div.filter_submit").remove();
$("div.f").remove();
$("div.f_bot").remove();
$("div.c").remove();
$("div.head").remove();
$("div#order_view").remove();
$("div#partners_left").remove();
$("div#button_left").remove();
$("div.bar").remove();
$("div.footer").remove();
$("div.bot").remove();
$("div.top").remove();
$("div#top_search").remove();
$("div.breadcrumbs").remove();


$('<div class="but"><input type=button id="openAll" name="but1" size="200" value="Відкрити у вкладках"></div>').appendTo("div.pagination_top");
$("#openAll").bind('click', function () {

    $("tr.b_row").each(function () {
        var aHref = $(this).find("div.cpt h2 a").attr("href");
        var aHref = "http://tiptop.if.ua" + aHref;

        window.open(aHref, '_blank');

    });
}
    );

