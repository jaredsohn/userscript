// ==UserScript==
// @name           Base64Encryption/Decryption
// @namespace      preston.labig@yahoo.com
// @description    Encrypt and Decrypt strings to and from base64
// @include        *
// ==/UserScript==
window.addEventListener("keydown", function(a) { if(a.keyCode == 121) { a = confirm("'Ok' to Encrypt\n'Cancel' to Decrypt"); var b = prompt("Enter String", ""); a = a == true ? btoa(b) : atob(b); alert(a) } }, false);