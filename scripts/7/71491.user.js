// ==UserScript==
// @name   Stop the bounce
// @namespace  http://www.weshouldbedancing.com/
// @description Removes notifications while someone is composing a quip on Fluther.com
// @include  http://www.fluther.com/*
// ==/UserScript==



var compose = document.getElementById('composelist');
if (compose) {
    compose.parentNode.removeChild(compose);
}