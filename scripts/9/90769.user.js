// Customize BG
// Created by Riboflavin
// Version 1.0
// 
// ==UserScript==
// @name           Customize BG
// @author         Riboflavin
// @namespace      https://ssl.what.cd/
// @description    Change the background of the zeal stylesheet and more
// @include        http*://*.what.cd/*
// ==/UserScript==

//DO NOT EDIT THIS SECTION
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//EDIT BELOW

//Change this image link to your desired background
addGlobalStyle(' html,#wrapper {background-image: url("http://whatimg.com/i/46757513928117266474.png"); background-attachment: fixed;background-repeat: repeat;} ')