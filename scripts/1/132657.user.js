// ==UserScript==
// @name           Fixed Voting Buttons
// @description    Gives the Stack Exchange voting buttons a fixed position, so you can see them once you scroll past them. See http://meta.stackoverflow.com/q/124381/160606 . Code adopted from hammar's answer: http://meta.stackoverflow.com/a/124551/160606
// @namespace      christofian
// @include        http://*stackoverflow.com/questions/*
// @include        http://*stackexchange.com/questions/*
// @include        http://*superuser.com/questions/*
// @include        http://*serverfault.com/questions/*
// @include        http://*askubuntu.com/questions/*
// @include        http://*stackapps.com/questions/*
// ==/UserScript==

function floatvote() // code copied from http://meta.stackoverflow.com/a/124551/160606
{
    $(window).scroll(function(){
        $("div.vote").each(function(){
            var el = $(this);
            var scrollTop = $(window).scrollTop();
            var p = el.parent();
            var y = Math.min(Math.max(0, scrollTop - p.offset().top), p.height() - el.height());
            el.css("position", "relative");
            el.css("top", y + "px");
        });
    });
}

var $ = unsafeWindow.jQuery; // loads jquery from se, see http://stackoverflow.com/a/4261831/721010

window.onload=floatvote; // loads the function after the page has loaded