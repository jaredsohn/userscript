// ==UserScript==
// @name           Userscripts.org enhancer
// @namespace      http://www.softcreatr.de
// @author         Sascha Greuel <sascha@softcreatr.de>
// @description    Some enhancements for userscripts.org
// @license        Creative Commons Attribution-ShareAlike 3.0
// @version        1.0.0
// @run-at         document-end
// @include        http*://*userscripts.org/*
// @include        http*://*greasefire.userscripts.org/*
// @grant          none
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

// Redirect to home, if you are already logged in
// and visit the login page again
var elm = document.getElementsByTagName('body');
if(window.location.href.match(/\/login$/)) {
    if(elm[0].className == 'sessions loggedin') {
        window.location.href = '/home';
    }
}

// Some CSS adjustments (enlarge contents, etc)
var cssCode = '';
cssCode += '.container { width: 98%; }';
cssCode += 'body#site-home #content { width: 70%; }';
cssCode += '#right { position: absolute; right: 10px; width: 20%; }';
cssCode += 'body#site-home #browser-news li { min-height: 32px; height: 100%; margin-bottom: 10px; padding-left: 36px; }';
cssCode += '#scripts-show #content { width: 75%; }';
cssCode += 'table.wide { width: 1000px; }';

addCss(cssCode);