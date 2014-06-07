// ==UserScript==
// @name Simple-nicoWatcher
// @namespace http://nicolive.m264.com/user.js/page/SimpleNicoWatcher
// @author M264(ryutaro)
// @version 0.2.6
// @include http://www.nicovideo.jp/watch/*
// @include http://live.nicovideo.jp/watch/lv*
// ==/UserScript==
 
(function() {
if (location.pathname.match(/^\/watch\/lv\d+/)) {
document.getElementById("carousel").style.cssText = 'display:none;';
document.getElementById("ichiba").style.cssText = 'display:none;';
document.getElementById("blogparts").style.cssText = 'display:none;';
document.getElementById("footer").style.cssText = 'display:none;';
document.getElementById("player_btm").style.cssText = 'display:none;';
document.getElementById("nicolive_201008_n").style.cssText = 'display:none;';
document.getElementById("header").style.cssText = 'display:none;';
document.getElementById("descriptions").style.cssText = 'display:none;';
document.getElementById("titlebar").style.cssText = 'display:none;';
document.getElementById("show_player_top").style.cssText = 'display:none;';

}else{
document.getElementById("WATCHFOOTER").style.cssText = "display:none;";
document.getElementById("PAGEFOOTER").style.cssText = 'display:none;';
}
})();