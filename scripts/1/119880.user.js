// ==UserScript==
// @name           Battlelog Custom Style by SAPRO2
// @description    vOT
// @include        http://battlelog.battlefield.com/*
// @copyright      SAPOR2
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

cssCode += '#base-bf3-html{background:black url(http://i.imgur.com/8nr8d.jpg) 50% 0 no-repeat !important;}';
cssCode += '.main-loggedin-header-inner, .main-show-banner, .main-loggedin-server, .footer-hint-wrapper, .campaign-content-soldier {visibility:hidden; display:none; !important}';
cssCode += 'a:hover {color: #eb8f00 !important}';
cssCode += 'img.main-loggedin-leftcolumn-active-soldier-rank-char-image {content:url(http://battlelog-cdn.battlefield.com/public/profile/kits/l/bf3-ru-engineer.png?v=26463120)}';
cssCode += 'img.profile-venicestats-overview-highlight-class-char {content:url(http://battlelog-cdn.battlefield.com/public/profile/kits/l/bf3-ru-engineer.png?v=26463120)}';

addCss(cssCode);