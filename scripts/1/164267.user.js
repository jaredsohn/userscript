// ==UserScript==
// @name           Battlelog Custom Style
// @description    Changes your Battlelog Style with ladies.
// @include        http://bhttp://battlelog.battlefield.com/bf3/*
// @copyright      Christian Wiig
// @version        2.0.0
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


cssCode += 'img.main-loggedin-leftcolumn-active-soldier-rank-char-image {content:url(http://timg.in/8nM31)}';
cssCode += 'img.profile-venicestats-overview-highlight-class-char {content:url(http://timg.in/8nM31)}';

addCss(cssCode);