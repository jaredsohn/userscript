// ==UserScript==
// @name       Preload All Images in CK101
// @namespace  http://blog.tsaiid.idv.tw/project/gmscripts/preload-all-images-in-ck101/
// @version    0.1.1
// @description  The images in ck101 are not loaded initially. Use this script to load all images initially.
// @match      http://ck101.com/*
// @copyright  2013+, I-Ta Tsai (http://blog.tsaiid.idv.tw/)
// ==/UserScript==

// Use pre-loaded jQuery by ck101.
var $ = unsafeWindow.jQuery;

$('img').each(function(){
    if ($(this).attr('file') && ($(this).attr('src') != $(this).attr('file'))) {
        $(this).attr('src', $(this).attr('file'));
    }
});