// ==UserScript==
// @name           Close Ads on facebook
// @description    Close Ads on facebook
// @author         kendo.chu
// @include        https://www.facebook.com
// @version        1.0
// ==/UserScript==


document.addEventListener("DOMNodeInserted", fun1, false);

function fun1() {
   $(".ego_section").css("display","none");
}