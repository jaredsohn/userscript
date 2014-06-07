// ==UserScript==
// @name        Show
// @namespace   http://yulli.org
// @description Show which raffles you've already seen
// @grant       none
// @include     *tf2r.com/raffles.html
// @include     *tf2r.com/chat.html
// @include     *tf2r.com/k*.html
// @version     1.1
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
        if (!document.styleSheets.length) {
            document.createStyleSheet();
        }
        document.styleSheets[0].cssText += css;
    }
}

addGlobalStyle('a:visited { color: #837768 } a:link {color: #00adeb');
