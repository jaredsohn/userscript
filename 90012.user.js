// ==UserScript==
// @name           178 manga flash ad killer
// @namespace      manhua.178.com/*
// @description    remove the disgusting flash ad on 178.com.
// @include        http://manhua.178.com/*
// @author         wecing
// @version        0.2
// ==/UserScript==
var adkiller = document.getElementById("market_frame");
if(adkiller)
    adkiller.style.height = "0";

var d = document.getElementsByTagName('img');
var i = 0;
var len = d.length;
for(i = 0; i < len; i++)
{
    if(d[i].src == "http://img.178.com/acg/201011/83201107858/83202949765.jpg")
        d[i].style.height = '0';
};
