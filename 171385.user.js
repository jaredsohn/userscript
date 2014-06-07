// ==UserScript==
// @name CreativeLive Mibbit Chat Window Fixes
// @description Tweaks to CreativeLive Chat pop-up window that uses Mibbit
// @match http://www.creativelive.com/chat*
// @run-at document-idle
// ==/UserScript==

function addGlobalStyle(css) {
    var div, style;
    div = document.getElementsByTagName('div')[0];
    if (!div) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    div.appendChild(style);
}

addGlobalStyle('body.chatroom-popout{overflow: hidden;} div#header-logo{display:none !important;}');