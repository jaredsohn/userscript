// ==UserScript==
// @name           Youtube Custom Style (ocbaker)
// @description    Fixes Youtube Pages with UberHaxorNova on them.
// @include        http://*youtube.*/*
// @copyright      Oliver Baker
// @version        1.1
// ==/UserScript==

function addCss(cssCode) {
    if(document.getElementById('watch-userbanner').title == "UberHaxorNova")
    {
    var styleElement = document.createElement('style');
    
    styleElement.type = 'text/css';
    
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }
    
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
}

var cssCode = '';

cssCode += '#watch-unlike{display:none !important;}';
cssCode += '#base-mainheader-container {background:black !important; position:fixed !important;}';
cssCode += '#shared-addto-menu {height: 300px;}';
cssCode += '.playlists ul {height: 200px !important\;}';
addCss(cssCode);