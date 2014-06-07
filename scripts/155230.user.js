// ==UserScript==
// @name     _Auto popup Greasemonkey Script Install Dialog
// @include  http://YOUR_SERVER.COM/YOUR_PATH/*
// @include  http://stackoverflow.com/faq
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==

var scriptJS_URL    = "http://userscripts.org/scripts/source/26062.user.js";

$("body").append (
    '<iframe src="' + scriptJS_URL + '" class="gmImstallIframe"></iframe>'
);

GM_addStyle ( "                                 \
    iframe.gmImstallIframe {                    \
        width:                  1px;            \
        height:                 1px;            \
        border:                 none;           \
    }                                           \
" );