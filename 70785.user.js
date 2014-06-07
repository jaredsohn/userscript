// ==UserScript==
// @name Safari Readable HTML View
// @namespace https://ssl.safaribooksonline.com/
// @description Makes the text for a safari book larger in HTML view. 
// @include https://ssl.safaribooksonline.com/*
// ==/UserScript==
view = document.getElementById('HtmlView');
view.style.fontSize = 'small';