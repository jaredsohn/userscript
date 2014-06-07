// ==UserScript==
// @version 1.0
// @name enucuzgb ve benzeri iframe yokedici :P
// @author Alabanda
// @namespace http://www.knightonlineforum.com/member.php?u=733
// @description EnUcuzGb.com ve bunun gibi sitelerin knightonlineforum.com'da açılan iframelerini yok eder :P
// @include        http://www.knightonlineforum.com/*
// @include        http://knightonlineforum.com/*
// ==/UserScript==

var iFramler, iFrame;
iFrameler = document.getElementsByTagName('iframe');
for (var i = 0; i < iFrameler.length; i++) 
{
    iFrame = iFrameler[i];
    iFrame.parentNode.removeChild(iFrame);
}