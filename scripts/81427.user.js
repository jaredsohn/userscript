// ==UserScript==
// @name           YodleeResizer
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        https://64.41.182.127/apps/sandbox.finapp.do
// ==/UserScript==

$(function () {
    var header = $("#list1 .pinned .mod h2 strong").html();
    if (header == "Sandbox") {
        $(".widgetSwfContainer object embed").attr("width", "700");
        $(".widgetSwfContainer object embed").attr("height", "700");
    }
});