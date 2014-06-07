// ==UserScript==
// @name           Auto Load Images
// @namespace      http://czh.tw/
// @description    自動載入網頁中的圖片連結
// @include        http://*
// @version        0.0.1
// ==/UserScript==
var imgLink = document.querySelectorAll('a[href$=".jpg"],a[href$=".png"],a[href$=".gif"],a[href$=".jpeg"],a[href$=".png"]');
for(x in imgLink )
{
if( typeof(imgLink[x].nodeName) == 'string' && imgLink[x].nodeName.toUpperCase() == 'A')
{
var sHref = imgLink[x].getAttribute('href');
imgLink[x].innerHTML = '<img src="'+sHref+'" />';
}
}