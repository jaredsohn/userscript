// ==UserScript==
// @name           KittyJava
// @namespace      oracle.com
// @include        http://docs.oracle.com/javase/7/docs/api/*
// @description    Add a lovely Hello Kitty picture to the new Java 7 API
// ==/UserScript==

var doc = window.document;
var kitty = doc.createElement('img');
kitty.setAttribute('src','http://img707.imageshack.us/img707/2495/kittywg.png');
kitty.setAttribute('style','position: fixed; right: 30px; top: 30px;');
var body = window.document.getElementsByTagName('body')[0];
body.appendChild(kitty);