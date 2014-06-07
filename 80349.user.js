// ==UserScript==
// @name Fix ZB Search Bug
// @namespace http://resources.zetaboards.com/index/
// @description Fixes ZetaBoards search bug dealing with selected forums and multiple pages
// @include http://if.invisionfree.com/*
// @include http://*.zetaboards.com/*
// @include http://zathyusnb.com/*
// @include http://bigboardsresources.com/*
// @include http://hogwartsnewzealand.com/*
// @include http://forums.planetnexus.net/*
// ==/UserScript==
var $ = unsafeWindow.jQuery;

if (location.href.indexOf('/search') !== -1) {
    $('ul.cat-pages li:not(.cat-pageshead) > a').each(function () {
        this.href = this.href.replace('&f=', '&forum[]=');
    });
}