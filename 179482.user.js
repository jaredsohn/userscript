// ==UserScript==
// @name        Fanfiction.net, make text selectable again
// @include     http://m.fanfiction.net/*
// @include     http://m.fictionpress.com/*
// @include     http://www.fanfiction.net/*
// @include     http://www.fictionpress.com/*
// @include     https://m.fanfiction.net/*
// @include     https://m.fictionpress.com/*
// @include     https://www.fanfiction.net/*
// @include     https://www.fictionpress.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL   https://userscripts.org/scripts/source/179482.meta.js
// @downloadURL https://userscripts.org/scripts/source/179482.user.js
// @version     3.5
// @grant       GM_addStyle
// ==/UserScript==

$(".nocopy").removeClass ("nocopy");

setInterval (fixInlineStyles, 999);

function fixInlineStyles () {
    $("[style*='user-select']").each ( function () {
        var jThis       = $(this);
        var styleAttr   = jThis.attr ("style");
        styleAttr       = styleAttr.replace (/user-select:\s*none/g, "user-select: text");
        jThis.attr ("style", styleAttr);
    } );

    unsafeWindow.jQuery(document).unbind ("keydown");
}

GM_addStyle ( "                                 \
    * {                                         \
        -moz-user-select: text !important;      \
        user-select: text !important;           \
        -webkit-user-select: text !important;   \
    }                                           \
" );
