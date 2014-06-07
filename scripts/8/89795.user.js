// ==UserScript==
// @name           Pay Now
// @description    Auto confirm order on oxicash
// @include        *
// ==/UserScript==

var button = document.getElementById("//input[@type='button' and contains(@value, 'Pay Now') and contains(@onClick, 'tb()')]",document,null,9,null).singleNodeValue;
button.click();