// ==UserScript==
// @name          MSDNcode
// @namespace     http://prodom.com.pl/projects/greasemonkey/
// @description   reformats source code on MSDN pages
// @include       http://msdn.microsoft.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        document.styleSheets[0].cssText += css;
    }
}

function preStyle() {
    addGlobalStyle('div.code pre { white-space: pre; font-size:8pt} \n');

}

preStyle();