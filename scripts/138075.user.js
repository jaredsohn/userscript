// ==UserScript==
// @name        去除土豆片头广告
// @namespace   quitTudouAd
// @description 去除土豆片头广告
// @include     http://www.tudou.com/*
// @version     1
// ==/UserScript==

thisURL = document.URL;

if(thisURL.indexOf("?tid=-1")<=0)
{

document.location.href =thisURL+'?tid=-1';


}

