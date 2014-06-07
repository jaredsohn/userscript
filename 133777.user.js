// ==UserScript==
// @name        Tyda.se - Hide All Ads and White Areas
// @namespace   http://danielj.se
// @author      MaTachi
// @description Hides all ads and white spaces/areas on Tyda.se. Works better than AdBlock Plus.
// @include     http://tyda.se/*
// @include     https://tyda.se/*
// @include     http://www.tyda.se/*
// @include     https://www.tyda.se/*
// @version     1.0
// ==/UserScript==
(function() {
var css = " \
    td.tyda_ads_top { \
        display: none; \
    } \
    td.tyda_right { \
        display: none; \
    } \
    div.tyda_adtext_container { \
        display: none; \
    } \
    table.tyda_box { \
        width: 700px; \
    } \
"; 

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
}
})();
