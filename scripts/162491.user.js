// ==UserScript==
// @name        Useful Facebook
// @namespace   facebook.com
// @description Makes facebook at least a little useful by removing feed and other crap
// @include     https://www.facebook.com
// @include     https://www.facebook.com/*
// @version     0.1
// @grant       none
// ==/UserScript==

function addCss(cssString) { 
    var head = document.getElementsByTagName('head')[0]; 
    if (!head)
        return;
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss);
};

addCss (
'#contentArea { display: none; }' +
'#rightCol { display: none; }' +
'.groupJumpLayout #contentArea { display: block; }' +
'._4rw #contentArea { display: block; }'
);