// ==UserScript==
// @name           Facebook - force Tahoma font
// @namespace      http://userscripts.org/users/370007
// @description    Force the Tahoma font to be the default font - if you have an Arabic characters in your page - when you have Lucida Grande font on your machine
// @include        https://www.facebook.com/*
// ==/UserScript==

// the font family used by Facebook css without Lucida Grande
fontFamily = "tahoma, verdana, arial, sans-serif";

// change the font for the body
document.body.style.fontFamily = fontFamily;

// change the font for textarea tags
elements = document.getElementsByTagName('textarea');
for(i = 0 ; i < elements.length ; i++) {
    elements[i].style.fontFamily = fontFamily;
}

// change the font for the .inputtext class
elements = document.getElementsByClassName('inputtext');
for(i = 0 ; i < elements.length ; i++) {
    elements[i].style.fontFamily = fontFamily;
}
