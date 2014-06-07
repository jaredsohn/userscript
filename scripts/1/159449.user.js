// ==UserScript==
// @name           DeviantArt direct download image
// @namespace      devart
// @include        http://*.deviantart.com/*
// @match          http://*.deviantart.com/*
// @grant          unsafeWindow
// ==/UserScript==

function ev(q){return document.evaluate(q,document.body,null,9,null).singleNodeValue;}

if (window.location.href.match('http:\/\/.*\.deviantart\.com\/.*art\/.*')) 
{
    var alink = ev('.//a[contains(@class,"download")]');
    if (alink) 
	{
        alink.outerHTML = alink.outerHTML.replace("return D", "return window.location.href=this; D");
    }   
}

// they made some stupid background-loading instead of normal one, switching back to normal
unsafeWindow.history.__proto__.pushState = function(a, b, url) {window.location.href = url;}
