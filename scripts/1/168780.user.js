// ==UserScript==
// @name       Bierdopje Disabler
// @namespace  http://www.bierdopje.com/
// @version    1.1
// @description  Disable the annoying features in Bierdopje by installing this script!
// @match      http://*.bierdopje.com/*
// @copyright  2013+, Tom
// ==/UserScript==

if (document.URL == "http://www.bierdopje.com" || document.URL == "http://www.bierdopje.com/") {
$('.info').remove();
}