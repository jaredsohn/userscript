// ==UserScript==
// @name           Test Script
// @description    Test Stuff
// @author         MrTimcakes
// @include        *ea.com*
// @version        1.0.0
// @updateurl       
// ==/UserScript==

var url = document.URL;

//alert(url);
//alert(url.indexOf("ea") !== -1);
if (url.indexOf("ea.com") !== -1){
    location.href=location.href.replace("ea","EaIsShit");
}