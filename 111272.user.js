// ==UserScript==
// @id             www.hkjc.com-46692ccb-5986-4f6d-a09e-cf2b61f66472@scriptish
// @name           香港賽馬會
// @version        0.1
// @namespace      http://wiki.moztw.org/index.php/User:Shyangs
// @author         Shyangs
// @description    香港賽馬會圖片連結修正
// @include        http://www.hkjc.com/*
// @run-at         document-end
// ==/UserScript==

var img=document.images;
var n=img.length;//圖片計數
for(var i=0;i<n;i++)
{
  img[i].src=img[i].src.replace(/%5C/g,'/');
}