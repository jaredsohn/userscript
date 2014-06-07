// ==UserScript==
// @name NicoAds-killer
// @namespace http://nicolive.m264.com/user.js/page/NicoAds-killer.php
// @author M264(ryutaro)
// @version 0.2.5
// @include http://www.nicovideo.jp/watch/*
// @include http://live.nicovideo.jp/watch/lv*
// ==/UserScript==
 
(function() {
if (location.pathname.match(/^\/watch\/lv/)) {
document.getElementById("nextprev").style.cssText = 'display:none;';
document.getElementById("ichiba").style.cssText = 'display:none;';
document.getElementById("toTop").style.cssText = 'display:none;';
}else{
document.getElementById("WATCHFOOTER").getElementsByTagName("div")[0].style.cssText = "display:none;";
document.getElementById("PAGEFOOTER").getElementsByTagName("table")[0].style.cssText = 'display:none;';
document.getElementById("PAGEFOOTER").getElementsByTagName("table")[1].style.cssText = 'display:none;';
document.getElementsByClassName("mb16p4")[0].style.cssText = "display:none;";
document.getElementsByClassName("mb16p4")[1].style.cssText = "display:none;";
document.getElementsByClassName("foot_pagetop")[0].style.cssText = "display:none;";
foot_pagetop
document.getElementsByClassName("ads_468")[0].style.cssText = 'display:none;';
}

})();