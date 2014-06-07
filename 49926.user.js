// ==UserScript==
// @name           Bungie.net Time-Changing Background
// @namespace      Bungie.net Time-Changing Background
// @description    Changes the background depending on the time of day.
// @include        http://*bungie.net/*
// @exclude        http://*bungie.net/Projects/ODST/*
// ==/UserScript==

var d = new Date();
var time = d.getHours();

if (time < 10)

{

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body {background: #6B6B6B url(http://www.geocities.com/robby11877/daybg.jpg) repeat-x fixed top left;}');

}

else

{

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body {background: #000 url(/images/base_struct_images/themes/default/background2.jpg) repeat-x fixed top left;}');

}

if (time > 20) {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body {background: #101010 url(http://geocities.com/robby11877/nightbg.jpg) repeat-x fixed top left;}');

}

// me so sexi
// 2 sexi 4 dis script