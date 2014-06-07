// ==UserScript==
// @name        PutLocker Direct
// @namespace   putLockerdirect
// @description Skip waiting screen at PutLocker.
// @author      PumaDias
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.1
// @updateURL   https://userscripts.org/scripts/source/180792.user.js
// @downloadURL https://userscripts.org/scripts/source/180792.user.js
// @homepage    https://userscripts.org/scripts/show/180792
// @include     http://www.putlocker.com/*
// ==/UserScript==

var element =  document.getElementById('submitButton');
if (typeof(element) != 'undefined' && element != null) {
    element.disabled = false;
    setInterval(function () {element.click();}, 400);
}