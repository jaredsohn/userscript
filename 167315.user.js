// ==UserScript==
// @name           Ea Is Shit
// @description    Replace Ea.com with EaIsShit.com
// @author         MrTimcakes
// @include        *ea.com*
// @version        1.0.0
// ==/UserScript==

var url = document.URL;

//alert(url);
//alert(url.indexOf("ea") !== -1);
if (url.indexOf("ea.com") !== -1){
    location.href=location.href.replace("ea","EaIsShit");
}