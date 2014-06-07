// ==UserScript==
// @name         Google Cache Over GFW
// @include      https://www.google.com/*
// @include      http://www.google.com/*
// @include      http://*.163.com/
// @include      http://www.google.cn/*
// ==/UserScript==

var link=location.href;
if(link.match("www.google.com")){
window.location = link.replace("https://www.google.com","https://74.125.128.94");
}
else if(link.match("www.google.com.tw")){
window.location = link.replace("https://www.google.com.tw","https://74.125.128.94");
}
