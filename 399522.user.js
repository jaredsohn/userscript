// ==UserScript==
// @name       Trello Changes
// @namespace  http://website.com/
// @version    0.1
// @description  Just make some changes for personal reasons
// @match      https://trello.com/*
// ==/UserScript==


// Function to add style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Styles Added
addGlobalStyle(' .list {width: 220px;box-shadow: 3px 4px 8px 1px #222222;border: 2px solid #4A970E;border-radius: 10px;}');
addGlobalStyle(' body {background-image: radial-gradient(rgb(40, 116, 160), rgb(14, 40, 54));}');


