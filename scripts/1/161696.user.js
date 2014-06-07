// ==UserScript==
// @run-at document-start
// @id             Newegg URL Cleaner
// @name           Newegg URL Cleaner
// @namespace      
// @description    Clean newegg product URL
// @include        http://www.newegg.tld/Product/Product.aspx?Item=*
// @include        https://www.newegg.tld/Product/Product.aspx?Item=*
// @version        1.1
// ==/UserScript==
var newurl = document.URL.match(/http:\/\/www.newegg.com\/Product\/Product.aspx\?Item\=[^&]*/g);
if (newurl != document.URL) location.replace(newurl);