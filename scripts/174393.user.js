// ==UserScript==
// @name        NyanCat Fix
// @namespace   http://userscripts.org/users/503363
// @include     http://*nyan.cat*
// @version     1.1
// ==/UserScript==

$(function(){
    $(".bottom-pane").css({
        "display": "none"
    });
    $("iframe").css({
        "display": "none"
    });
    $(".facebook-score").css({
        "display": "none"
    });
    $(".tweet-score").css({
        "display": "none"
    });
    $("#flav").css({
        "display": "none"
    });
    $(".langchooser").css({
        "display": "none"
    });
    $('a[href="http://www.facebook.com/NyanCatWorld"').css({
        "display": "none"
    });
    $('a[href="http://twitter.com/#!/nyannyancat"').css({
        "display": "none"
    });
});