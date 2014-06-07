// ==UserScript==
// @name			Recova Mobile
// @description		Change the style of Habbers.nl
// @version			1.0.0
// @run-at			document-end
// @include			http://www.habbers.nl/*
// @include			www.habbers.nl/*
// @include			habbers.nl/*
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

cssCode += '#headerv3-2 { display: none !important; }';
cssCode += '#fo_boardpanel { display: none !important; }';
cssCode += '#fo_stat { display: none !important; }';
cssCode += '.copyright { display: none !important; }';
cssCode += '.newslink { display: none !important; }';
cssCode += '#ipbwrapper { width: 100% !important; border: 0px !important; }';
cssCode += '#in-ipbwrapper { padding: 0px !important; }';
cssCode += '.borderwrap { border: 0px !important; }';
cssCode += '.row1 { display: none; width: 0px; }';
cssCode += 'img[src$="http://images.habbers.nl/subimages/frank_wave2.gif"] { background: transparent url("http://cdn1.iconfinder.com/data/icons/frankfurt/32/login.png") no-repeat scroll 0px 0px !important;margin-top: 0px !important;width: 0px !important;height: 32px !important;padding-left: 40px !important;}';
cssCode += 'table th { display: none !important;}';

addCss(cssCode);
