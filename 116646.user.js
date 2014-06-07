// ==UserScript==
// @name       Processing.js title changer
// @namespace  http://userscripts.org/users/322169
// @version    0.2
// @description  Adds the text of the main heading of the page to the title of the document on processingjs.org.
// @include    http://processingjs.org/*
// @copyright  2011, James Wood
// ==/UserScript==

if (document.title == 'Processing.js')
    document.title += ' - ' + (document.getElementsByTagName('h2')[0] || document.getElementsByTagName('h3')[0]).innerText;