// ==UserScript==
// @name           rbc selection
// @namespace      jsn
// @include        http://top.rbc.ru/*
// ==/UserScript==
if (unsafeWindow.jQuery) (function ($) {
    $().ready(function () { $('#content').unbind('mouseup') ; }) ;
})(unsafeWindow.jQuery) ;

