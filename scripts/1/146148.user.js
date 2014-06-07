// ==UserScript==
// @name        pixiv random search
// @namespace   pixivrandomsearch
// @description a Greasemonkey script to add random search button to pixiv pages with a pager
// @include     http://www.pixiv.net/*
// @version     3
// @grant       none
// ==/UserScript==


$(function() {
    $(".pager-container .next").after($("<a href='#' style='line-height: 22px;' class='_button' title='random'>random</a>").click(function(){
        var countText = $("#wrapper .count-badge").text();
        if (!countText.match(/([0-9]+)/)) {
            return;
        }
        var maxPage = Math.min(Math.floor((parseInt(RegExp.$1) + 19) / 20), 1000);
        var page = Math.floor(Math.random() * maxPage) + 1;

        var newUrl;
        var currentUrl = document.URL;
        var regExp = new RegExp("(p=[0-9]*)");
        if (currentUrl.match(/p=[0-9]*/)) {
            newUrl = currentUrl.replace(/p=[0-9a-zA-Z]*/, "p=" + page);
        } else {
            if (currentUrl.match(/\?/)) {
                newUrl = currentUrl.replace(/#$/, '') + "&p=" + page;
            } else {
                newUrl = currentUrl.replace(/#$/, '') + "?p=" + page;
            }
        }
        location.href = newUrl;
    }))});