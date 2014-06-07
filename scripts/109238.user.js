//
// Gmail Preview Pane Extend
// Created by: Chad Huntley
//
//
// --------------------------------------------------------------------
//
//  Removes the people/advertisement sidebar when using the Preview Pane
//  labs feature, and fixes horizontal scrollbar issues for Firefox
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gmail Preview Pane Extend
// @namespace     http://elementdesignllc.com/
// @description   Removes the sidebar when using Preview Pane
// @include       http*://mail.google.*/*
// @grant         GM_addStyle
// @exclude
// @version       0.7.1
// @history       0.7.1 Update to work with latest Gmail version
// @history       0.7.0 Fix for Chrome 27, and better image handling
// @history       0.6.1 Max-width now in pixels
// @history       0.6.0 Set max-width on images
// @history       0.5.0 Remove horizontal scrollbars for Firefox
// @history       0.4.2 Remove sidebar on "undo send"
// @history       0.4.1 Removed extra style
// @history       0.4 Chrome autocomplete now working
// @history       0.3 Now supports both vertical and horizontal split
// @history       0.2 Optimized code, now using GM_addStyle
// @history       0.1b Fix attribute selector for Firefox
// @history       0.1 Initial release
// ==/UserScript==
//
// --------------------------------------------------------------------

if (typeof GM_addStyle == 'undefined')
    var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) return;
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }

//hide the side bar
GM_addStyle('.y3 { display:none!important; }');

//resize images in preview pane
GM_addStyle('.apN .nH .adP img { height:auto!important;max-width:100%!important;width:auto!important; }');

//remove horizontal scroll bars on Firefox
GM_addStyle('.apP .nH { width:98%!important; }');
GM_addStyle('.apN .nH { width:99.5%!important; }');