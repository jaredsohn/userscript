// ==UserScript==
// @name        opensubtitles shift-click
// @namespace   userscript.org
// @description Open up new window on shift click
// @include     http://www.opensubtitles.org/*
// @version     1
// ==/UserScript==

$ = unsafeWindow.jQuery;

$("a").click(function(e){
    if (e.shiftKey) {
        window.open($(this).attr('href'), "newWindow");
        e.preventDefault();
        return false;
    }
});