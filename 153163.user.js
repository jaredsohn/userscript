// ==UserScript==
// @name         Tieba Hotword Block
// @namespace    http://jixun.org/
// @version      0.1
// @description  好讨厌 >.>
// @include      *://tieba.com/*
// @include      *://www.tieba.com/*
// @include      *://tieba.baidu.com/*
// @copyright    2012+, jixun66
// ==/UserScript==

(function () {
    try { var $ = unsafeWindow.$; var jQuery = unsafeWindow.jQuery; /* Load jQuery. */ }
        catch (e) { return; /* Not on the correct page, exit.. */ }
    $('a.hot_word').each (function(){$(this).after($(this).text()).remove();});
}) ();