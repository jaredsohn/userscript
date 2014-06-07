// ==UserScript==
// @name           myminicity-Links markieren!
// @namespace      http://www.morgil.de
// @description    Alle myminicity-Links werden mit einem Ausrufezeichen markiert.
// @include        http://www.vdeutschland.de/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for(var i=0;i<links.length;i++) {
if(!links[i].getAttribute("name")) {
 //alert(links[i].getAttribute("href"));
 if(links[i].getAttribute("href").match(/(.*)myminicity(.*)/)) {
  links[i].innerHTML = "<img src=\"data:image/gif,GIF89a%10%00%11%00%B3%00%00%FF%02%02%FF%"+
"FF%FF%FF%2F%2F%F3qz%FF%EE%EE%FFDD%FF%CC%C9%FF%DD%DE%FF%BB%BC%FF%AA%AA%FF%88%"+
"88%F7U%5E%FF%99%99%FF%CC%DD%FF%FF%ED%00%00%00!%F9%04%00%00%00%00%00%2C%00%00"+
"%00%00%10%00%11%00%00%04a0%C8I%AB%25%26%25t%AC%24%89%00%8C%800t%141%90%828%1"+
"6h%E0(%ACT%90%05!%19%240%EC%3D%85%84F%FA%05%10%3D%81%EEV%0B%ACz%86%00%93d%20"+
"%F4F%08%E9%B5u%05D%9F%24F%A2%ABC%16%25%60%DF%07%5C%B0%B1b%84%05%CBU%CA%A6%18"+
"%DDE%C3%138%24%06%0B%0AU%7C%84%13%11%00%3B"+"\" width=\"12\" height=\"12\">"+links[i].innerHTML;
 }
}
}