// ==UserScript==
// @name           Battlelog [1337] Script 1
// @include        http://battlelog.battlefield.com/*
// @copyright      Yasir_Abu_Saif
// @version        1.0.0
// ==/UserScript==

function addCss(cssCode) {
    var styleElement = document.createElement('style');
    
    styleElement.type = 'text/css';
    
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }
    
    document.getElementsByTagName('head')[0].appendChild(styleElement);
}

var cssCode = '';

cssCode += '#base-bf3-html{background:white url(http://i.imgur.com/FaB84.png) 100% 0 repeat !important;}';
cssCode += '.main-loggedin-header-inner, .main-show-banner, .main-loggedin-server, .footer-hint-wrapper, .campaign-content-soldier {visibility:hidden; display:none; !important}';
cssCode += 'a:hover {color: #00ff00 !important}';
cssCode += 'img.main-loggedin-leftcolumn-active-soldier-rank-char-image {content:url(http://i.imgur.com/Zjikz.gif)}';
cssCode += 'img.profile-venicestats-overview-highlight-class-char {content:url(http://i.imgur.com/Zjikz.gif)}';

addCss(cssCode);

