// Thanks to Chad Huntley ; https://userscripts.org/scripts/show/109238
// 
// --------------------------------------------------------------------
// 
//  Removes the advertisement placeholder in the  sidebar when using 
//  the Preview Pane labs feature, and fixes horizontal scrollbar
//  issues for Firefox
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Gmail Ads removal by kaweeb
// @namespace   http://kaweeb.net
// @description Removes the sidebar when using Preview Pane
// @include     http*://mail.google.*/*
// @exclude       
// @grant       none
// @version     1.0
// @history     1.0 initial version
// ==/UserScript==

if (typeof GM_addStyle == 'undefined')
    var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) return;
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }

// hides the ads in the side bar
GM_addStyle('.Bs .Bu:nth-child(3) .nH .nH .nH:nth-child(2) { display:none!important; }');
GM_addStyle('.Bs .Bu:nth-child(3) .nH .nH .nH:nth-child(3) { display:none!important; }');

// hides the bottom ads
GM_addStyle('.Bs .Bu:nth-child(1) .nH .nH:nth-child(2) .nH .nH:nth-child(5) { display:none!important; }');
