// ==UserScript==
// @name        Startpage.com Ads removal by kaweeb
// @namespace   http://kaweeb.net
// @description Removes the ads in the startpage.com results
// @include     http*://*startpage.com/*
// @version     1.0
// @history     1.0 initial version
// @grant       none
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
GM_addStyle('#sponsored_container { display:none!important; background-color: #fcc !important; border: 1px solid #c33 !important; }');
