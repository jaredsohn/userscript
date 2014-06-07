// ==UserScript==
// @name           douban_book
// @namespace      http://userscripts.org/users/102589
// @include        http://book.douban.com/subject/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        https://translatewiki.net/w/load.php?lang=zh-cn&modules=mediawiki|jquery.makeCollapsible&only=scripts&*
// @require        https://translatewiki.net/w/load.php?lang=zh-cn&modules=mediawiki|jquery.makeCollapsible&only=messages&*
// @resource RLCSS https://translatewiki.net/w/load.php?lang=zh-cn&modules=mediawiki|jquery.makeCollapsible&only=styles&*
// ==/UserScript==

GM_addStyle(GM_getResourceText('RLCSS'));

$('<div />')
    .append(
        $('.aside > .book-cart-app-notice')
            .nextUntil('#borrowinfo + *')
            .andSelf()
    )
    .prependTo('.aside')
    .addClass('mw-collapsed')
    .makeCollapsible();

$('<div />')
    .append(
        $('#collector + h2')
            .nextUntil('.aside > .citysmr + br + br + *')
            .andSelf()
    )
    .insertAfter('#collector')
    .addClass('mw-collapsed')
    .makeCollapsible();
