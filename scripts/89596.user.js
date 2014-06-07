// ==UserScript==
// @name         Cellcom SMS form fix
// @author       Sagie Maoz <n0nick@php.net>
// @description  This userscript fixes the SMS sending form in cellcom.co.il for Google Chrome.
// @match http://www.cellcom.co.il/myzone/sendmessage/pages/*
// ==/UserScript==

document.querySelector('.message .userInput.displayNone').className = 'userInput'