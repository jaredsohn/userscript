// ==UserScript==
// @name            MetaFilter per-user display customizations
// @description     Allows styling of comments and posts by who wrote them
// @include         http://metafilter.com/*
// @include         http://*.metafilter.com/*
// @include         https://metafilter.com/*
// @include         https://*.metafilter.com/*
// @grant           none
// @version         2.0
// ==/UserScript==

// Note: "grant none" scripts run without any sandboxing, so the following uses the page's own jQuery directly
//       without needing @include or any kind of injector

// Modify this to taste:
var mapping = {
    'dunkadunc':        '"Segoe UI", Frutiger, "Frutiger Linotype"',
    'k5.user':          '"Comic Sans MS"',
    'mathowie':         '"Helvetica Neue", Helvetica, Arial',
    'jessamyn':         'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia',
    'cortex':           '"Lucida Bright", Georgia',
    'pb':               'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black"',
    'restless_nomad':   '"Gill Sans", "Gill Sans MT", Calibri',
    'taz':              '"Century Gothic", CenturyGothic, "AppleGothic"',
    'Rhomboid':         '"Comic Sans MS"',
};

$('.smallcopy > a[href*="metafilter.com/user/"]').each(function() {
    var ff = mapping[this.childNodes[0].textContent];
    if(ff)
        $(this.parentElement.parentElement).css('font-family', ff);
});
