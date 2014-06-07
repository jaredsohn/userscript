// ==UserScript==
// @id             Remove Ph66 Ads
// @name           Remove Ph66 Ads
// @description    Remove Ads from ph66
// @version        1.2.0
// @updateURL      http://userscripts.org/scripts/source/139216.user.js
// @downloadURL	   https://userscripts.org/scripts/source/139216.user.js
// @author         ShawnMew
// @homepage       http://blog.sina.com.cn/ShawnMew
// @include        http*ph66.com/*
// ==/UserScript==


//mainpage
document.getElementByName("adtl").Style.display = "none"
document.getElementByName("hiad_5v84").Style.display = "none"
document.getElementByName("ad_opera").Style.display = "none"
document.getElementByName("ad").Style.display = "none"

//bbs
document.getElementById("bbsad").Style.display = "none"
document.getElementById("bbsad000").Style.display = "none"
document.getElementById("bbsad4").Style.display = "none"