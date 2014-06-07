// Twitter Translate 
// version 2 
// 2012-1-3 
// Copyright (c) 2012, Justin Duewel-Zahniser 
// Released under the GPL license 
// http://www.gnu.org/copyleft/gpl.html 
// 
// -------------------------------------------------------------------- 
// 
// ==UserScript== 
// @name Twitter Translate 
// @namespace http://www.justindz.org 
// @description Includes links for each Twitter web entry to translate using Google Translate. 
// @include https://twitter.com/* 
// ==/UserScript==

function twitterTranslate() { 
var message; 
var allElements = document.evaluate('//div[@class="tweet-text js-tweet-text"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var pairs = ["en|es", "es|en", "ja|en", "fr|es", "fr|en"];

for (var i = 0; i < allElements.snapshotLength; i++) 
{ 
message = allElements.snapshotItem(i); 
for (var j = 0; j < pairs.length; j++) 
{ 
var link = document.createElement("a"); 
link.setAttribute("href", "http://translate.google.com/translate_t?hl=en&i...=" + message.textContent + "&langpair=" + pairs[j]); 
link.setAttribute("target", "new"); 
link.textContent = pairs[j]; 
message.parentNode.appendChild(link); 
var spacer = document.createElement("span"); 
spacer.textContent = ", "; 
if (j < pairs.length - 1) 
{ 
message.parentNode.appendChild(spacer); 
} 

} 

} 
}

setTimeout(twitterTranslate, 5000);