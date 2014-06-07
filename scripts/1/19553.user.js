// ==UserScript==
// @name          Big links
// @namespace     http://www.geocities.com/c0nceptua
// @description   highlights and enlarges links so that they are easier to click on
// @include       *
// @exclude       
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
'a:hover {' +
'  background-color: yellow ! important;' +
'  font-size: 14pt ! important;' +
'}');



