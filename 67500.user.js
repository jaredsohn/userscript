// ==UserScript==
// @name           Hide obit comments
// @namespace      http://amprsnd.com/
// @description    Hides comments and lines in comments that consist of nothing but dots, periods, .s
// @include        http://*.metafilter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

var run_hoc = function () {
    var entire_comment_expr, single_line_expr;

    entire_comment_expr = /^[\.\s]*posted by/;
    single_line_expr = /^[\.\s]*\.[\.\s]*$/;

    $('.comments').add('.comments *').contents().filter(function () {
        return this.nodeType == 3 && 
            single_line_expr.test(this.nodeValue);
    }).remove();

    $('.comments').filter(function () {
        return entire_comment_expr.test($(this).text());
    }).remove();
};

run_hoc();
