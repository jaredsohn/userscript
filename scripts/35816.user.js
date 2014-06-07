// ==UserScript==
// @name          Nuke myspace login
// @description   Stop people from loging in to myspace by removing the entire login/sign-up box. Why? You either want to tick someone off or you are a parent who thinks myspace is evil.
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @include       https://myspace.com/*
// @include       https://*.myspace.com/*
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

addGlobalStyle(
'#account {display:none!important' +
'}');