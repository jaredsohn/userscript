// ==UserScript==
// @name          Remove Top Advert Block
// @include       http://home*.myspace.com/*
// @include       http://home.myspace.com/*


// @description   Removes The Top Advert Block
// @exclude       http://comments.myspace.com/*

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
'#header {' +
'  height: 25px ! important;' +
'}');