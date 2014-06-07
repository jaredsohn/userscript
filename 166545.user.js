// ==UserScript==
// @name           Hosting Gratis
// @namespace      http://www.forocoches.com
// @description    Ninguna
//
// @include        *http://www.forocoches.com/**
// ==/UserScript==

var message = "El hosting para mi!!!";

var postCount = document.getElementById('posts').children.length;
var textarea = document.getElementById('vB_Editor_QR_textarea');
var form = document.getElementById('qrform');

if(postCount == 10) {
    textarea.value = message;
    form.submit();
}