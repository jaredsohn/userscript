// ==UserScript==
// @name           confirm order
// @description    Auto confirm order on itz
// @include        *
// ==/UserScript==

var button = document.evaluate("//input[@type='button' and contains(@value, 'Confirm Order') and contains(@onClick, 'redirectToConfirm')]",document,null,9,null).singleNodeValue;
button.click();