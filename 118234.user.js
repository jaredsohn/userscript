// ==UserScript==
// @name Google Reader SSL
// @version 1.0.0.0
// @include https://www.google.com/*
// @include http://www.google.com/*
// @include https://encrypted.google.com/*
// ==/UserScript==
readerlink=document.getElementById('gb_32');
readerlink.href='https://'+readerlink.href.substr(7)
