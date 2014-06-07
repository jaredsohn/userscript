// ==UserScript==
// @name           Twitter Notice Sweeper
// @namespace      twitter.com/notice_hider
// @description    Script hides annoying notices of old version of twitter interface
// @include        http://twitter.com*
// @include        https://twitter.com*
// ==/UserScript==

function removeClass(elem, className)
{
    var re = new RegExp("(?:^| )" + className + "(?:$| )", "g");
    elem.className = elem.className.replace(re, " ");
}

function hide() {
    var bodies = document.getElementsByTagName("body");
    var banners = document.getElementsByClassName("fixed-banners");
    
    if (bodies.length)
        removeClass(bodies[0], "phoenix-skybar");
    for (var i = 0; i < banners.length; i++)
        banners[i].style.display = "none";
}

hide();