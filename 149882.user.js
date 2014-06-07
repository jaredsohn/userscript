// ==UserScript==
// @name        XHamster.com: Bigger recent images and less clutter.
// @author      DODeath@userscripts.org
// @namespace   http://*
// @include     http://xhamster.com/photos/view/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.js
// @grant       none
// ==/UserScript==

(function(window, document, jQuery, $, undefined) {

    $('.imgListbox').css('height', '0');
    $('.imgListRecent,.imgListRecent .imgList').css('width', '510px');
    $('.imgListRecent .imgList a img').css('width', '100px');
    $('.imgListRecent .imgList a img').css('height', '100px');
    $('.imgListRecent .imgList a, .imgListRecent .imgList a img').width('100px');
    $('.imgListRecent .imgList a, .imgListRecent .imgList a img').height('100px');

    // Remove wasted wasted space from the top.
    var loginHtml = $('.login').html();
    var formHtml = '<form name="searchForm" action="http://xhamster.com/search.php" method="GET" >' +
        $('form[name=searchForm]').html() +
        '</form></li><li>';
    $('.login').remove();
    $('form[name=searchForm]').remove();
    $('.logo').remove();
    $('#menu li:last').remove(); // Remove useless "Premium" box.
    $('#menu li:last').remove(); // Remove useless "Dating" box.
    $('#menu li:last').remove(); // Remove useless "Stories" box.
    $('#menu li:last').remove(); // Remove useless "Games" box.
    $('#menu').css('padding-bottom', '0');
})(window, document, jQuery, $);