// ==UserScript==
// @name        Scrolling Siemens Forum Header
// @namespace   https://www.automation.siemens.com/WW/forum
// @description Allows hide Header when scrolling the forum
// @include     https://www.automation.siemens.com/WW/forum/*
// @include     https://www.automation.siemens.com/forum/*
// @version     1.0
// ==/UserScript==

function scrollHeader() {
    var header = document.getElementById('header');
    header.style.position = 'static';
   
    var body = document.getElementsByTagName('body')[0];
    body.style.padding = '0px 0 0 0';
}

scrollHeader();