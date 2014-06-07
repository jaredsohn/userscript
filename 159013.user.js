// ==UserScript==
// @name        amazon
// @namespace   amazon
// @include     htt*//*.amazon.com/*
// @version     1
// ==/UserScript==

var loc = location.href;
if (loc.match(/www.amazon.com\/$/))
{
window.location = 'http://www.amazon.com/?_encoding=UTF8&tag=wanttinfo-20';
}