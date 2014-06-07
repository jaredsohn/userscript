// ==UserScript==
// @name           Battlelog Custom Taf Clan Style
// @description    Changes your Battlelog Style with TAF Clan.
// @include        http://battlelog.battlefield.com/*
// @copyright      TAF Endero7
// @version        1.0.1
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

cssCode += '#base-bf3-html{background:white url(http://bf3.taf-clan.net/images/battlelog/TAF.jpg) 50% 0 no-repeat !important;}';
cssCode += '.main-loggedin-header-inner, .main-show-banner, .main-loggedin-server, .footer-hint-wrapper, .campaign-content-soldier {visibility:hidden; display:none; !important}';
addCss(cssCode);