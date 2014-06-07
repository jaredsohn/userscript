// ==UserScript==
// @name       Blognone Waterfall Comments
// @namespace  http://twitter.com/korkid
// @version    3
// @description  At Blognone reply comments are difficult to read this script will override their css
// @include      *blognone.com/*
// @copyright  2012+, rulaz07
// ==/UserScript==

function addcss(css){
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    if (styleElement.styleSheet) {   // IE
        styleElement.styleSheet.cssText = css;
    } else {                // the world
        styleElement.appendChild(document.createTextNode(css));
    }
    head.appendChild(styleElement);
}

addcss(
'#comments .indented .indented .indented .indented .indented{margin-left:15px;}.comment-zebra-white{border-left: 0.1em solid #e9e9e9;}'
);