// ==UserScript==
// @name        zpic
// @namespace   zpic
// @description remove login window
// @include     http://www.zpicturegroup.com/*
// @version     1
// ==/UserScript==

elements = document.getElementsByName('frmLogin');
if (elements.length > 0) {
    elements[0].style.display = 'none';
}