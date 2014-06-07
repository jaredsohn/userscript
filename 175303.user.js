// ==UserScript==
// @name        TMD ascunde comentariile fara sens
// @description ascunde comentariile fara sens de pe TMD
// @include     *torrentsmd.com/*
// @include     *torrentsmd.*/*
// @include     *torrentsmoldova.*/*
// @version     1.0
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==

$(document).ready(function () {
    var exclude = ['не читайте это пожалуйста'];
    exclude.forEach(function(i){
        $('#forumPosts tr:contains(' + i + ')').hide();
    });
});
$(document).ready(function () {
    var exclude = ['не читайте это пожалуйста'];
    exclude.forEach(function(i){
        $('td.text:contains(' + i + ')').hide();
    });
});