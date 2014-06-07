// ==UserScript==
// @name           Golden Mail
// @namespace      www.asdf.com
// @include        http://www.reddit.com/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#mail img[src="/static/mail.png"] {    background-image: url(http://thumbs.reddit.com/t5_2r869_8.png?v=v23t7a3jv24sk94b5huqpl0mnkk0j2cklm41);    background-repeat: no-repeat;    width: 0px;    height: 0px;    padding-left: 15px;    padding-top: 10px    }');